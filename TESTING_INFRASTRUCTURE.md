# Testing ADMI Infrastructure

Complete guide for testing the deployed serverless infrastructure including blog generation and video cache refresh services.

## 🧪 Quick Testing Options

### **Option 1: Automated Testing Script**

```bash
# Test development environment
./scripts/test-infrastructure.sh dev

# Test production environment  
./scripts/test-infrastructure.sh prod

# Verbose testing
./scripts/test-infrastructure.sh prod --verbose
```

The script automatically checks:
- ✅ AWS connection and permissions
- ✅ Lambda function deployment
- ✅ EventBridge schedule rules
- ✅ CloudWatch log groups
- ✅ HTTP endpoint accessibility
- ✅ Local script functionality

### **Option 2: Manual AWS CLI Testing**

```bash
# 1. Check if functions are deployed
aws lambda list-functions --query 'Functions[?contains(FunctionName, `admi`)].FunctionName'

# 2. Test specific function
aws lambda invoke \
  --function-name admiBlogGeneration-dev \
  --payload '{"type":"test"}' \
  --cli-binary-format raw-in-base64-out \
  response.json && cat response.json

# 3. Check EventBridge rules
aws events list-rules --name-prefix admi-

# 4. View recent logs
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/admi"
```

### **Option 3: Serverless Framework Testing**

```bash
cd infrastructure/serverless/blog-generation

# Test video cache refresh
npm run invoke:cache

# Test daily blog generation
npm run invoke:daily  

# Test weekly blog generation
npm run invoke:weekly

# View function logs
npm run logs:cache
npm run logs:daily
npm run logs:weekly
```

## 🔍 Detailed Testing Procedures

### **Testing Video Cache Refresh**

```bash
# Method 1: Direct Lambda invocation
aws lambda invoke \
  --function-name admi-blog-generation-prod-videoCacheRefresh \
  --payload '{}' \
  --cli-binary-format raw-in-base64-out \
  cache-response.json

# Method 2: Via HTTP endpoint (if accessible)
curl -X GET \
  -H "Authorization: Bearer your-cron-secret" \
  https://main.d2yh9rjzagq5ao.amplifyapp.com/api/cron/refresh-video-cache

# Method 3: Via npm script
npm run cache-refresh
```

### **Testing Blog Generation**

```bash
# Test daily generation
serverless invoke -f dailyBlogGeneration --stage prod

# Test weekly generation  
serverless invoke -f weeklyBlogGeneration --stage prod

# Test with custom parameters
serverless invoke -f testBlogGeneration --stage prod --data '{
  "count": 1,
  "category": "digitalMarketing"
}'

# Get statistics
serverless invoke -f blogStats --stage prod
```

### **Testing Local Scripts**

```bash
# Test blog generation locally
npm run blog:daily

# Test with specific category
npm run blog:generate -- category techEconomy 1

# Get local statistics
npm run blog:stats

# Test Contentful connection
npm run contentful:check
```

## 📊 Monitoring and Verification

### **CloudWatch Logs**

```bash
# View logs for specific function
aws logs tail /aws/lambda/admi-blog-generation-prod-videoCacheRefresh --follow

# View recent log events
aws logs describe-log-streams \
  --log-group-name "/aws/lambda/admi-blog-generation-prod-dailyBlogGeneration" \
  --order-by LastEventTime --descending
```

### **EventBridge Schedule Verification**

```bash
# Check if schedules are enabled
aws events list-rules --name-prefix admi- --query 'Rules[].{Name:Name,State:State,Schedule:ScheduleExpression}'

# Check rule targets
aws events list-targets-by-rule --rule admi-daily-blog-prod
```

### **Function Configuration Check**

```bash
# Check function environment variables
aws lambda get-function-configuration \
  --function-name admiBlogGeneration-prod \
  --query 'Environment.Variables'

# Check function timeout and memory
aws lambda get-function-configuration \
  --function-name admiBlogGeneration-prod \
  --query '{Timeout:Timeout,Memory:MemorySize,Runtime:Runtime}'
```

## 🔧 Troubleshooting Common Issues

### **1. Function Not Found**

```bash
# List all functions to check naming
aws lambda list-functions --query 'Functions[].FunctionName' | grep -i admi

# Check if stack is deployed
aws cloudformation list-stacks --query 'StackSummaries[?contains(StackName, `admi`)].{Name:StackName,Status:StackStatus}'
```

### **2. Permission Errors**

```bash
# Check your AWS credentials
aws sts get-caller-identity

# Check function execution role
aws lambda get-function \
  --function-name admiBlogGeneration-prod \
  --query 'Configuration.Role'
```

### **3. Environment Variables Missing**

```bash
# Check if SSM parameters exist
aws ssm get-parameters \
  --names "/admi/openai/api-key" "/admi/contentful/space-id" \
  --with-decryption \
  --query 'Parameters[].Name'
```

### **4. Timeout Issues**

```bash
# Check function duration in logs
aws logs filter-log-events \
  --log-group-name "/aws/lambda/admi-blog-generation-prod-dailyBlogGeneration" \
  --filter-pattern "REPORT" \
  --max-items 5
```

## 🎯 Test Scenarios

### **End-to-End Testing**

1. **Deploy Infrastructure**
   ```bash
   # If using Amplify
   git push origin main
   
   # If using Serverless
   cd infrastructure/serverless/blog-generation
   ./deploy.sh prod
   ```

2. **Verify Deployment**
   ```bash
   ./scripts/test-infrastructure.sh prod
   ```

3. **Test Each Service**
   ```bash
   # Video cache
   serverless invoke -f videoCacheRefresh --stage prod
   
   # Blog generation
   serverless invoke -f dailyBlogGeneration --stage prod
   ```

4. **Check Results**
   ```bash
   # Check Contentful for new articles
   curl -H "Authorization: Bearer $CONTENTFUL_ACCESS_TOKEN" \
     "https://cdn.contentful.com/spaces/$SPACE_ID/entries?content_type=resource&order=-sys.createdAt&limit=5"
   
   # Check video cache file
   ls -la data/admi-videos-cache.json
   ```

### **Load Testing**

```bash
# Test multiple concurrent invocations
for i in {1..5}; do
  aws lambda invoke \
    --function-name admiBlogGeneration-prod \
    --payload '{"type":"test"}' \
    --cli-binary-format raw-in-base64-out \
    test-response-$i.json &
done
wait
```

### **Schedule Testing**

```bash
# Temporarily enable a test schedule (1 minute from now)
CURRENT_MINUTE=$(date -u -d '+1 minute' '+%M')
CURRENT_HOUR=$(date -u '+%H')

aws events put-rule \
  --name admi-test-schedule \
  --schedule-expression "cron($CURRENT_MINUTE $CURRENT_HOUR * * ? *)" \
  --state ENABLED

# Add target
aws events put-targets \
  --rule admi-test-schedule \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:ACCOUNT:function:admiBlogGeneration-prod"
```

## 📈 Performance Monitoring

### **Metrics to Monitor**

```bash
# Function invocation count
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=admiBlogGeneration-prod \
  --start-time 2025-01-27T00:00:00Z \
  --end-time 2025-01-27T23:59:59Z \
  --period 3600 \
  --statistics Sum

# Function duration
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=admiBlogGeneration-prod \
  --start-time 2025-01-27T00:00:00Z \
  --end-time 2025-01-27T23:59:59Z \
  --period 3600 \
  --statistics Average

# Error rate
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Errors \
  --dimensions Name=FunctionName,Value=admiBlogGeneration-prod \
  --start-time 2025-01-27T00:00:00Z \
  --end-time 2025-01-27T23:59:59Z \
  --period 3600 \
  --statistics Sum
```

## ✅ Success Criteria

Your infrastructure is working correctly if:

- ✅ **Functions Deploy**: All Lambda functions are created successfully
- ✅ **Schedules Active**: EventBridge rules are enabled and have targets
- ✅ **Manual Invocation**: Functions can be invoked manually without errors
- ✅ **Log Generation**: CloudWatch logs show function execution
- ✅ **Content Creation**: Blog articles appear in Contentful
- ✅ **Cache Updates**: Video cache file is refreshed with new data
- ✅ **Notifications**: Webhook notifications are sent (if configured)

Run the automated test script for a comprehensive infrastructure health check!