#!/bin/bash

# ADMI Video Cache Auto-Refresh - AWS Lambda Deployment Script
set -e

echo "🚀 Deploying ADMI Video Cache Auto-Refresh Lambda Function..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI is not installed. Please install it first."
    echo "Install with: pip install aws-sam-cli"
    exit 1
fi

# Set variables
STACK_NAME="admi-video-cache-refresh"
REGION="us-east-1"  # Change to your preferred region
APP_URL="${1:-https://main.d2yh9rjzagq5ao.amplifyapp.com}"
CRON_SECRET="${2:-admi-cron-secret-2025}"

echo "📍 Region: $REGION"
echo "🌐 App URL: $APP_URL"
echo "🔑 Using provided cron secret"

# Build the SAM application
echo "🔨 Building SAM application..."
sam build

# Deploy the stack
echo "📦 Deploying to AWS..."
sam deploy \
  --stack-name $STACK_NAME \
  --region $REGION \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    AppUrl=$APP_URL \
    CronSecret=$CRON_SECRET \
  --confirm-changeset

echo "✅ Deployment completed!"
echo ""
echo "📋 Stack Information:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs' \
  --output table

echo ""
echo "🕐 The Lambda function is now scheduled to run daily at 1 AM UTC"
echo "📊 You can monitor the function in CloudWatch Logs"
echo ""
echo "To test manually:"
echo "aws lambda invoke --function-name admi-video-cache-refresh --region $REGION response.json"