#!/bin/bash

# Deploy Brevo → Google Ads Sync Lambda Functions
# This script deploys automated sync and monitoring to AWS Lambda

set -e

echo "🚀 Deploying ADMI Google Ads Automation to AWS Lambda"
echo "========================================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI not found. Please install: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
fi

# Use AWS profile
export AWS_PROFILE=admi-website
export AWS_DEFAULT_REGION=us-east-1

echo "✅ Using AWS Profile: $AWS_PROFILE"
echo "✅ Region: $AWS_DEFAULT_REGION"

# Load required env vars from project root .env
ENV_FILE="../../../.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ .env file not found at $ENV_FILE"
    exit 1
fi

# Extract only the required variables (avoid commas and special chars)
export BREVO_API_KEY=$(grep "^BREVO_API_KEY=" "$ENV_FILE" | cut -d '=' -f2)
export GOOGLE_ADS_CLIENT_ID=$(grep "^GOOGLE_ADS_CLIENT_ID=" "$ENV_FILE" | cut -d '=' -f2)
export GOOGLE_ADS_CLIENT_SECRET=$(grep "^GOOGLE_ADS_CLIENT_SECRET=" "$ENV_FILE" | cut -d '=' -f2)
export GOOGLE_ADS_DEVELOPER_TOKEN=$(grep "^GOOGLE_ADS_DEVELOPER_TOKEN=" "$ENV_FILE" | cut -d '=' -f2)
export GOOGLE_ADS_CUSTOMER_ID=$(grep "^GOOGLE_ADS_CUSTOMER_ID=" "$ENV_FILE" | cut -d '=' -f2)
export GOOGLE_ADS_REFRESH_TOKEN=$(grep "^GOOGLE_ADS_REFRESH_TOKEN=" "$ENV_FILE" | cut -d '=' -f2)
export SLACK_WEBHOOK_URL=$(grep "^SLACK_WEBHOOK_URL=" "$ENV_FILE" | cut -d '=' -f2 || echo "")

# Check required env vars
REQUIRED_VARS=(
    "BREVO_API_KEY"
    "GOOGLE_ADS_CLIENT_ID"
    "GOOGLE_ADS_CLIENT_SECRET"
    "GOOGLE_ADS_DEVELOPER_TOKEN"
    "GOOGLE_ADS_CUSTOMER_ID"
    "GOOGLE_ADS_REFRESH_TOKEN"
)

for VAR in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo "❌ Missing required environment variable: $VAR"
        exit 1
    fi
done

echo "✅ All required environment variables found"

# Create deployment package
echo ""
echo "📦 Creating deployment package..."

# Install dependencies
echo "Installing Node.js dependencies..."
npm install --production

# Build SAM application
echo ""
echo "🔨 Building SAM application..."
sam build

echo ""
echo "📤 Deploying to AWS..."

# Build parameter overrides
PARAM_OVERRIDES="BrevoApiKey=$BREVO_API_KEY"
PARAM_OVERRIDES="$PARAM_OVERRIDES GoogleAdsClientId=$GOOGLE_ADS_CLIENT_ID"
PARAM_OVERRIDES="$PARAM_OVERRIDES GoogleAdsClientSecret=$GOOGLE_ADS_CLIENT_SECRET"
PARAM_OVERRIDES="$PARAM_OVERRIDES GoogleAdsDeveloperToken=$GOOGLE_ADS_DEVELOPER_TOKEN"
PARAM_OVERRIDES="$PARAM_OVERRIDES GoogleAdsCustomerId=$GOOGLE_ADS_CUSTOMER_ID"
PARAM_OVERRIDES="$PARAM_OVERRIDES GoogleAdsRefreshToken=$GOOGLE_ADS_REFRESH_TOKEN"

# Add Slack webhook only if set
if [ -n "$SLACK_WEBHOOK_URL" ]; then
  PARAM_OVERRIDES="$PARAM_OVERRIDES SlackWebhookUrl=$SLACK_WEBHOOK_URL"
fi

sam deploy \
  --stack-name admi-google-ads-automation \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides $PARAM_OVERRIDES \
  --resolve-s3 \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Lambda Functions Created:"
echo "   1. admi-brevo-google-ads-sync (Daily at 2 AM UTC)"
echo "   2. admi-brevo-google-ads-full-sync (Weekly on Sundays at 3 AM UTC)"
echo "   3. admi-google-ads-performance-monitor (Daily at 6 AM UTC / 9 AM Nairobi)"
echo ""
echo "🎯 Next Steps:"
echo "   1. Test the sync function: npm run ads:sync"
echo "   2. Test the monitor: npm run ads:monitor"
echo "   3. Check CloudWatch Logs for execution results"
echo "   4. Check your email (wilfred@admi.africa) for daily reports"
echo ""

