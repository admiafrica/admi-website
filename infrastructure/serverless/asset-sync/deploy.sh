#!/bin/bash

# Deploy Contentful Asset Sync Lambda
# Usage: ./deploy.sh [staging|production]

STAGE=${1:-staging}

echo "🚀 Deploying Asset Sync Lambda to $STAGE..."

cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy
echo "☁️ Deploying to AWS..."
AWS_PROFILE=admi-website npx serverless deploy --stage $STAGE

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the webhook URL from above (POST endpoint)"
echo "2. Go to Contentful → Settings → Webhooks"
echo "3. Create new webhook with:"
echo "   - URL: <webhook-url-from-above>"
echo "   - Triggers: Asset → Publish, Unpublish"
echo "   - Content types: All"
echo ""
echo "🔐 Optional: Set webhook secret in Contentful and add to Lambda env"
