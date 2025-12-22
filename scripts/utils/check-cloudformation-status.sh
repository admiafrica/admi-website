#!/bin/bash
# Re-enable serverless deployment after CloudFormation cleanup

echo "Checking CloudFormation stack status..."

STACK_STATUS=$(aws cloudformation describe-stacks \
  --stack-name admi-blog-generation-staging \
  --query 'Stacks[0].StackStatus' \
  --output text 2>/dev/null)

if [ "$STACK_STATUS" = "UPDATE_COMPLETE" ]; then
  echo "✅ Stack is ready! Safe to re-enable serverless deployment"
  echo ""
  echo "Next steps:"
  echo "1. Uncomment the backend section in amplify.yml"
  echo "2. Push to trigger new deployment"
  echo "3. Serverless functions will deploy successfully"
elif [ "$STACK_STATUS" = "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" ]; then
  echo "⏳ Stack still cleaning up. Wait ~10 more minutes and retry."
elif [ -z "$STACK_STATUS" ]; then
  echo "❌ Stack not found or AWS CLI not configured"
else
  echo "⚠️  Stack status: $STACK_STATUS"
  echo "Wait for UPDATE_COMPLETE before re-enabling"
fi
