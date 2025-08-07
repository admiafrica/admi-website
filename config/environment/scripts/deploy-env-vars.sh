#!/bin/bash

# deploy-env-vars.sh - Deploy environment variables to AWS Amplify
# Usage: ./deploy-env-vars.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$(dirname "$SCRIPT_DIR")"

# Configuration file
CONFIG_FILE="$CONFIG_DIR/amplify-${ENVIRONMENT}.json"

# AWS Amplify App ID
APP_ID="dlm0hjalapt7d"

echo "🚀 Deploying $ENVIRONMENT environment variables to AWS Amplify..."

# Run backup first
echo "📦 Creating backup..."
"$SCRIPT_DIR/backup-env-vars.sh" "$ENVIRONMENT"

# Run validation
echo "🔍 Validating configuration..."
"$SCRIPT_DIR/validate-env-vars.sh" "$ENVIRONMENT"

# Confirm deployment
VAR_COUNT=$(jq 'keys | length' "$CONFIG_FILE")
echo "📊 Ready to deploy $VAR_COUNT variables to $ENVIRONMENT"

read -p "Continue with deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Deploy to Amplify
echo "⬆️  Uploading environment variables..."
if AWS_PROFILE=admi-website aws amplify update-app \
    --app-id "$APP_ID" \
    --cli-input-json "{\"environmentVariables\": $(cat "$CONFIG_FILE")}" \
    --output json > /dev/null; then
    
    echo "✅ Environment variables deployed successfully!"
    echo "📊 Variables deployed: $VAR_COUNT"
    
    # Optionally trigger a deployment
    read -p "Trigger a new build? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🏗️  Starting new build..."
        JOB_ID=$(AWS_PROFILE=admi-website aws amplify start-job \
            --app-id "$APP_ID" \
            --branch-name "$ENVIRONMENT" \
            --job-type RELEASE | jq -r '.jobSummary.jobId')
        echo "✅ Build started - Job ID: $JOB_ID"
        echo "🔗 Monitor at: https://console.aws.amazon.com/amplify/home#/app/$APP_ID/job/$JOB_ID"
    fi
else
    echo "❌ Failed to deploy environment variables"
    exit 1
fi