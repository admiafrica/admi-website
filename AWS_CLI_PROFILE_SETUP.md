# 🔧 AWS CLI Profile Setup for ADMI Website

**Complete guide to configure and use AWS CLI profile for ADMI website deployment and management**

---

## 📋 **Profile Overview**

**Profile Name**: `admi-website`  
**AWS Region**: `us-east-1` (N. Virginia)  
**Output Format**: `json`  
**Purpose**: Dedicated AWS profile for ADMI website infrastructure, Lambda functions, and automation

---

## ⚙️ **Profile Configuration**

### **Current Profile Status**

✅ **Profile Created**: `admi-website`  
✅ **Region Set**: `us-east-1`  
✅ **Output Format**: `json`  
❗ **Credentials Needed**: Access Key ID and Secret Access Key required

### **Profile Structure**

```bash
# AWS Config File: ~/.aws/config
[profile admi-website]
region = us-east-1
output = json

# AWS Credentials File: ~/.aws/credentials
[admi-website]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

---

## 🔑 **Credentials Setup**

### **Option 1: Interactive Configuration**

```bash
# Configure credentials interactively
aws configure --profile admi-website

# You'll be prompted for:
# AWS Access Key ID: [Enter your access key]
# AWS Secret Access Key: [Enter your secret key]
# Default region name: us-east-1 (already set)
# Default output format: json (already set)
```

### **Option 2: Manual Configuration**

```bash
# Set credentials directly
aws configure set aws_access_key_id YOUR_ACCESS_KEY_ID --profile admi-website
aws configure set aws_secret_access_key YOUR_SECRET_ACCESS_KEY --profile admi-website
```

### **Option 3: Edit Credentials File**

```bash
# Edit credentials file directly
vim ~/.aws/credentials

# Add this section:
[admi-website]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

---

## 🎯 **Getting AWS Credentials**

### **Create IAM User for ADMI Website**

1. **Login to AWS Console**: https://console.aws.amazon.com/iam/
2. **Create User**: IAM → Users → Create User
3. **User Details**:
   - **Username**: `admi-website-deployer`
   - **Access Type**: Programmatic access only
4. **Attach Policies**:
   - `PowerUserAccess` (recommended for deployment)
   - Or custom policy with specific permissions (see below)
5. **Save Credentials**: Download and store the Access Key ID and Secret Access Key

### **Required AWS Permissions**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["lambda:*", "iam:*", "cloudformation:*", "s3:*", "logs:*", "events:*", "apigateway:*"],
      "Resource": "*"
    }
  ]
}
```

---

## ✅ **Testing Profile Configuration**

### **1. Verify Profile Setup**

```bash
# List all profiles
aws configure list-profiles

# Should show: admi-website

# Check profile configuration
aws configure list --profile admi-website
```

### **2. Test AWS Access**

```bash
# Test basic AWS access
aws sts get-caller-identity --profile admi-website

# Expected output:
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/admi-website-deployer"
}
```

### **3. Test Lambda Access**

```bash
# List Lambda functions (if any exist)
aws lambda list-functions --profile admi-website

# Test S3 access
aws s3 ls --profile admi-website

# Test CloudFormation access
aws cloudformation list-stacks --profile admi-website
```

---

## 🚀 **Using the Profile**

### **1. Serverless Deployment**

```bash
# Navigate to serverless directory
cd infrastructure/serverless/blog-generation

# Deploy using the profile
AWS_PROFILE=admi-website npx serverless deploy --stage prod

# Or set environment variable
export AWS_PROFILE=admi-website
npx serverless deploy --stage prod
```

### **2. Direct AWS CLI Commands**

```bash
# Always specify the profile for ADMI commands
aws lambda list-functions --profile admi-website
aws s3 ls --profile admi-website
aws logs describe-log-groups --profile admi-website

# Set as default for session
export AWS_PROFILE=admi-website
aws lambda list-functions  # Now uses admi-website profile
```

### **3. Environment Variable Method**

```bash
# Set profile for entire session
export AWS_PROFILE=admi-website

# All subsequent AWS commands will use this profile
aws sts get-caller-identity
npx serverless deploy --stage prod
```

---

## 🔧 **Profile Management**

### **Update Profile Settings**

```bash
# Change region
aws configure set region us-west-2 --profile admi-website

# Change output format
aws configure set output table --profile admi-website

# Add new configuration option
aws configure set cli_pager '' --profile admi-website  # Disable pager
```

### **View Profile Configuration**

```bash
# Show all configuration for profile
aws configure list --profile admi-website

# Show specific setting
aws configure get region --profile admi-website
aws configure get aws_access_key_id --profile admi-website
```

### **Remove Profile**

```bash
# Remove profile from config
aws configure set profile.admi-website.region '' --profile admi-website

# Or edit files directly
vim ~/.aws/config     # Remove [profile admi-website] section
vim ~/.aws/credentials # Remove [admi-website] section
```

---

## 📁 **File Locations**

### **Configuration Files**

```bash
# AWS Config File
~/.aws/config

# AWS Credentials File
~/.aws/credentials

# View current configuration
cat ~/.aws/config
cat ~/.aws/credentials
```

### **Profile-Specific Settings**

```ini
# ~/.aws/config
[profile admi-website]
region = us-east-1
output = json
cli_pager =

# ~/.aws/credentials
[admi-website]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

---

## 🛡️ **Security Best Practices**

### **Credential Security**

- ✅ **Never commit credentials** to version control
- ✅ **Use IAM roles** when possible (for EC2, Lambda, etc.)
- ✅ **Rotate credentials** regularly (every 90 days)
- ✅ **Use least privilege** permissions
- ✅ **Enable MFA** on AWS account

### **Profile Isolation**

- ✅ **Separate profiles** for different projects/environments
- ✅ **Use specific profiles** for each AWS command
- ✅ **Never use default profile** for production deployments
- ✅ **Document profile purposes** and permissions

### **Environment Variables**

```bash
# Secure way to use profiles in scripts
#!/bin/bash
export AWS_PROFILE=admi-website
export AWS_DEFAULT_REGION=us-east-1

# Your deployment commands here
npx serverless deploy --stage prod
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Profile Not Found**

```bash
# Error: The config profile (admi-website) could not be found
# Solution: Check profile name and configuration

aws configure list-profiles
aws configure list --profile admi-website
```

#### **2. Invalid Credentials**

```bash
# Error: The AWS Access Key Id you provided does not exist in our records
# Solution: Verify credentials are correct

aws configure list --profile admi-website
aws sts get-caller-identity --profile admi-website
```

#### **3. Permission Denied**

```bash
# Error: User is not authorized to perform: lambda:CreateFunction
# Solution: Check IAM permissions

aws iam get-user --profile admi-website
aws iam list-attached-user-policies --user-name admi-website-deployer --profile admi-website
```

#### **4. Region Issues**

```bash
# Error: Could not connect to the endpoint URL
# Solution: Check region configuration

aws configure get region --profile admi-website
aws configure set region us-east-1 --profile admi-website
```

### **Debug Commands**

```bash
# Debug AWS CLI configuration
aws configure list --profile admi-website
aws sts get-caller-identity --profile admi-website
aws configure get region --profile admi-website

# Test specific services
aws lambda list-functions --profile admi-website --region us-east-1
aws s3 ls --profile admi-website
aws iam get-user --profile admi-website
```

---

## 📋 **Quick Reference Commands**

### **Essential Commands**

```bash
# Configure new profile
aws configure --profile admi-website

# Test profile
aws sts get-caller-identity --profile admi-website

# Use profile for deployment
AWS_PROFILE=admi-website npx serverless deploy --stage prod

# Set profile for session
export AWS_PROFILE=admi-website

# List all profiles
aws configure list-profiles

# View profile configuration
aws configure list --profile admi-website
```

### **Serverless Deployment Commands**

```bash
# Deploy with profile
AWS_PROFILE=admi-website npx serverless deploy --stage prod

# Deploy specific function
AWS_PROFILE=admi-website npx serverless deploy function --function dailyBlogGeneration --stage prod

# View logs
AWS_PROFILE=admi-website npx serverless logs --function dailyBlogGeneration --stage prod

# Remove deployment
AWS_PROFILE=admi-website npx serverless remove --stage prod
```

---

## ✅ **Configuration Checklist**

### **Setup Checklist**

- [ ] AWS CLI installed and updated
- [ ] `admi-website` profile created
- [ ] AWS credentials configured
- [ ] Profile tested with `get-caller-identity`
- [ ] Permissions verified for Lambda deployment
- [ ] Region set to `us-east-1`
- [ ] Output format set to `json`

### **Security Checklist**

- [ ] Credentials stored securely
- [ ] IAM user has minimal required permissions
- [ ] MFA enabled on AWS account
- [ ] Credentials not committed to version control
- [ ] Profile documented and shared with team

### **Testing Checklist**

- [ ] Basic AWS access working
- [ ] Lambda functions can be listed/deployed
- [ ] S3 access working
- [ ] CloudFormation access working
- [ ] Serverless deployment successful

---

## 📞 **Support & Next Steps**

### **After Configuration**

1. **Test Deployment**: Try deploying a Lambda function
2. **Set Up Monitoring**: Configure CloudWatch alerts
3. **Document Credentials**: Store securely and share with team
4. **Schedule Review**: Plan credential rotation and permission review

### **Getting Help**

- **AWS CLI Docs**: https://docs.aws.amazon.com/cli/
- **Serverless Docs**: https://www.serverless.com/framework/docs/
- **IAM Best Practices**: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html

---

_Last Updated: July 30, 2025_  
_Profile: admi-website_  
_Region: us-east-1_
