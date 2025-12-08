#!/bin/bash

# Generate GA service account key from Google Cloud
# Requires gcloud CLI and appropriate permissions

SERVICE_ACCOUNT="ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com"
KEY_FILE="ga-service-account.json"
PROJECT_ID="admi-youtube-integration"

echo "🔐 Generating GA service account key..."
echo "Service Account: $SERVICE_ACCOUNT"
echo "Project: $PROJECT_ID"
echo ""

# Check if gcloud is available
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
gcloud config set project $PROJECT_ID

# Generate key
echo "Creating new service account key..."
gcloud iam service-accounts keys create $KEY_FILE \
    --iam-account=$SERVICE_ACCOUNT \
    --key-file-type=json

if [ -f "$KEY_FILE" ]; then
    echo "✅ Key created: $KEY_FILE"
    echo ""
    echo "Next, verify GA4 property permissions:"
    echo "  1. Go to: https://analytics.google.com"
    echo "  2. Admin > Property Access Management"
    echo "  3. Grant '$SERVICE_ACCOUNT' Editor access to property 250948607"
    echo ""
    echo "Then fetch data:"
    echo "  node scripts/analytics/fetch-current-organic-traffic.js"
else
    echo "❌ Failed to create key"
    exit 1
fi
