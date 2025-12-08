#!/bin/bash

# Merge staging to main after testing
# Usage: ./scripts/deploy/merge-staging-to-main.sh

set -e

echo "🔀 Merging staging → main"
echo ""

# Verify we're on staging
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "staging" ]; then
    echo "⚠️  Warning: You're on $CURRENT_BRANCH, not staging"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled"
        exit 1
    fi
fi

# Fetch latest
echo "📥 Fetching latest changes..."
git fetch origin

# Checkout main
echo "🔀 Checking out main..."
git checkout main

# Merge staging
echo "🔀 Merging staging into main..."
git merge origin/staging --no-edit

# Push to main
echo "📤 Pushing to main..."
git push origin main

echo ""
echo "✅ Successfully merged staging → main!"
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Amplify will now build and deploy production"
echo "Status: https://console.aws.amazon.com/amplify/home"
