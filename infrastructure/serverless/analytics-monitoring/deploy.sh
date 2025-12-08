#!/bin/bash

# AWS Lambda Deployment Script for Analytics Monitoring
# Deploys weekly organic traffic monitoring to AWS Lambda + EventBridge
# Usage: ./deploy-analytics-monitor.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
REGION="us-east-1"
FUNCTION_NAME="admi-analytics-weekly-report-${ENVIRONMENT}"
RULE_NAME="admi-weekly-organic-traffic-report-${ENVIRONMENT}"

echo "📊 Deploying Analytics Weekly Report Monitor"
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"
echo ""

# Check prerequisites
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Install it first: https://aws.amazon.com/cli/"
    exit 1
fi

if [ ! -f "ga-service-account.json" ]; then
    echo "❌ ga-service-account.json not found in project root"
    exit 1
fi

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "✅ AWS Account ID: $ACCOUNT_ID"

# Step 1: Create IAM Role
echo ""
echo "Step 1: Creating IAM role for Lambda..."

ROLE_NAME="admi-analytics-lambda-role-${ENVIRONMENT}"

# Check if role already exists
if aws iam get-role --role-name "$ROLE_NAME" 2>/dev/null; then
    echo "⚠️  Role already exists: $ROLE_NAME"
else
    echo "Creating new role: $ROLE_NAME"
    
    TRUST_POLICY='{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": {"Service": "lambda.amazonaws.com"},
            "Action": "sts:AssumeRole"
        }]
    }'
    
    aws iam create-role \
        --role-name "$ROLE_NAME" \
        --assume-role-policy-document "$TRUST_POLICY" \
        --description "Role for ADMI Analytics Weekly Report Lambda"
    
    # Attach basic Lambda execution role
    aws iam attach-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    # Create inline policy for SES
    SES_POLICY='{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Action": ["ses:SendEmail", "ses:SendRawEmail"],
            "Resource": "*"
        }]
    }'
    
    aws iam put-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-name "admi-analytics-ses-policy" \
        --policy-document "$SES_POLICY"
    
    echo "✅ IAM Role created"
    
    # Wait for role to be available
    echo "⏳ Waiting for IAM role to propagate..."
    sleep 10
fi

ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"
echo "✅ Role ARN: $ROLE_ARN"

# Step 2: Prepare Lambda package
echo ""
echo "Step 2: Preparing Lambda deployment package..."

cd infrastructure/serverless/analytics-monitoring

if [ ! -d "node_modules" ]; then
    npm install --production
fi

zip -r handler.zip handler.js node_modules/ -q
echo "✅ Lambda package created: handler.zip"

# Step 3: Create/Update Lambda Function
echo ""
echo "Step 3: Deploying Lambda function..."

# Encode service account JSON
GA_ACCOUNT_JSON=$(cat ../../ga-service-account.json | base64 | tr -d '\n')

# Check if function exists
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" 2>/dev/null; then
    echo "Updating existing Lambda function..."
    
    aws lambda update-function-code \
        --function-name "$FUNCTION_NAME" \
        --zip-file fileb://handler.zip \
        --region "$REGION"
    
    aws lambda update-function-configuration \
        --function-name "$FUNCTION_NAME" \
        --environment "Variables={
            ANALYTICS_REPORT_EMAILS=wilfred@admi.africa,
            REPORT_FROM_EMAIL=noreply@admi.africa,
            GA_SERVICE_ACCOUNT_JSON=${GA_ACCOUNT_JSON}
        }" \
        --region "$REGION"
else
    echo "Creating new Lambda function..."
    
    aws lambda create-function \
        --function-name "$FUNCTION_NAME" \
        --runtime nodejs18.x \
        --role "$ROLE_ARN" \
        --handler handler.handler \
        --zip-file fileb://handler.zip \
        --timeout 60 \
        --memory-size 256 \
        --environment "Variables={
            ANALYTICS_REPORT_EMAILS=wilfred@admi.africa,
            REPORT_FROM_EMAIL=noreply@admi.africa,
            GA_SERVICE_ACCOUNT_JSON=${GA_ACCOUNT_JSON}
        }" \
        --region "$REGION"
fi

echo "✅ Lambda function deployed: $FUNCTION_NAME"

# Step 4: Create EventBridge Rule
echo ""
echo "Step 4: Setting up EventBridge schedule..."

# Check if rule exists
if aws events describe-rule --name "$RULE_NAME" --region "$REGION" 2>/dev/null; then
    echo "✅ EventBridge rule already exists: $RULE_NAME"
else
    echo "Creating EventBridge rule..."
    
    aws events put-rule \
        --name "$RULE_NAME" \
        --schedule-expression "cron(0 9 ? * MON *)" \
        --state ENABLED \
        --description "Weekly organic traffic report - Mondays at 9 AM UTC" \
        --region "$REGION"
    
    echo "✅ EventBridge rule created"
fi

# Step 5: Add Lambda as EventBridge Target
echo ""
echo "Step 5: Configuring Lambda as EventBridge target..."

LAMBDA_ARN="arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}"

# Remove existing targets (ignore if none)
aws events list-targets-by-rule --rule "$RULE_NAME" --region "$REGION" \
    --query 'Targets[*].Id' --output text | \
    xargs -I {} aws events remove-targets --rule "$RULE_NAME" --ids {} --region "$REGION" 2>/dev/null || true

# Add Lambda as target
aws events put-targets \
    --rule "$RULE_NAME" \
    --targets "Id=1,Arn=$LAMBDA_ARN,DeadLetterConfig={Arn=arn:aws:sqs:${REGION}:${ACCOUNT_ID}:admi-dlq}" \
    --region "$REGION" 2>/dev/null || \
aws events put-targets \
    --rule "$RULE_NAME" \
    --targets "Id=1,Arn=$LAMBDA_ARN" \
    --region "$REGION"

echo "✅ Lambda added as EventBridge target"

# Step 6: Grant EventBridge Permission
echo ""
echo "Step 6: Granting EventBridge permissions..."

# Try to add permission (ignore if already exists)
aws lambda add-permission \
    --function-name "$FUNCTION_NAME" \
    --statement-id "AllowEventBridgeInvoke-${ENVIRONMENT}" \
    --action lambda:InvokeFunction \
    --principal events.amazonaws.com \
    --source-arn "arn:aws:events:${REGION}:${ACCOUNT_ID}:rule/${RULE_NAME}" \
    --region "$REGION" 2>/dev/null || \
echo "⚠️  Permission already exists (or error occurred)"

echo "✅ EventBridge permissions configured"

# Step 7: Verify SES Configuration
echo ""
echo "Step 7: Checking SES email configuration..."

SES_STATUS=$(aws ses get-account-sending-enabled --region "$REGION" --output text)
echo "SES Status: $SES_STATUS"

# Check verified identities
VERIFIED_EMAILS=$(aws ses list-verified-email-addresses --region "$REGION" --output text)
echo "Verified emails: $VERIFIED_EMAILS"

if [[ ! "$VERIFIED_EMAILS" =~ "admi.africa" ]]; then
    echo ""
    echo "⚠️  No admi.africa email verified in SES"
    echo "Run to verify email:"
    echo "   aws ses verify-email-identity --email-address noreply@admi.africa --region $REGION"
fi

# Cleanup
cd ../../..

# Final Summary
echo ""
echo "======================================================================="
echo "✅ DEPLOYMENT COMPLETE"
echo "======================================================================="
echo ""
echo "📊 Weekly Organic Traffic Monitor deployed to AWS"
echo ""
echo "Configuration:"
echo "  Environment:    $ENVIRONMENT"
echo "  Region:         $REGION"
echo "  Lambda:         $FUNCTION_NAME"
echo "  EventBridge:    $RULE_NAME"
echo "  Schedule:       Every Monday at 9 AM UTC"
echo "  IAM Role:       $ROLE_NAME"
echo ""
echo "Next steps:"
echo "  1. Verify sender email in SES (if needed)"
echo "  2. Test Lambda invocation:"
echo "     aws lambda invoke --function-name $FUNCTION_NAME /tmp/out.json --region $REGION"
echo "  3. Monitor logs:"
echo "     aws logs tail /aws/lambda/$FUNCTION_NAME --region $REGION --follow"
echo ""
echo "View Lambda Details:"
echo "  https://console.aws.amazon.com/lambda/home?region=${REGION}#/functions/${FUNCTION_NAME}"
echo ""
echo "View EventBridge Rule:"
echo "  https://console.aws.amazon.com/events/home?region=${REGION}#/rules/${RULE_NAME}"
echo ""
echo "======================================================================="
