#!/bin/bash

# Git Workflow Helper - Push to staging first, then main
# Usage: ./scripts/deploy/push-to-staging.sh "commit message"
#        ./scripts/deploy/merge-staging-to-main.sh

set -e

COMMIT_MESSAGE="${1:-Update}"

echo "🚀 Pushing to staging for testing..."
echo ""

# Make sure we're on the right branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $CURRENT_BRANCH"

# Commit changes
echo "📝 Committing changes..."
git add -A
git commit -m "$COMMIT_MESSAGE" || echo "⚠️  No changes to commit"

# Push to staging
echo "📤 Pushing to staging branch..."
git push origin staging -u

echo ""
echo "✅ Successfully pushed to staging!"
echo ""
echo "Next steps:"
echo "  1. Test on staging environment"
echo "  2. Run: npm run build"
echo "  3. Verify everything works"
echo "  4. Then run: ./scripts/deploy/merge-staging-to-main.sh"
echo ""
echo "🔗 Staging URL: https://staging.admi.africa"
