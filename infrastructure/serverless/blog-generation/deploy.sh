#!/bin/bash

# ADMI Blog Generation Serverless Deployment Script
# Usage: ./deploy.sh [stage] [options]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Default values
STAGE="${1:-dev}"
VERBOSE=""
DRY_RUN=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -v|--verbose)
      VERBOSE="--verbose"
      shift
      ;;
    -d|--dry-run)
      DRY_RUN="--dry-run"
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [stage] [options]"
      echo ""
      echo "Stages:"
      echo "  dev       Development environment (default)"
      echo "  staging   Staging environment"
      echo "  prod      Production environment"
      echo ""
      echo "Options:"
      echo "  -v, --verbose    Enable verbose output"
      echo "  -d, --dry-run    Show what would be deployed without actually deploying"
      echo "  -h, --help       Show this help message"
      echo ""
      echo "Examples:"
      echo "  ./deploy.sh dev"
      echo "  ./deploy.sh prod --verbose"
      echo "  ./deploy.sh staging --dry-run"
      exit 0
      ;;
    *)
      if [[ -z "$STAGE" || "$STAGE" == "dev" ]]; then
        STAGE="$1"
      fi
      shift
      ;;
  esac
done

# Validate stage
if [[ ! "$STAGE" =~ ^(dev|staging|prod)$ ]]; then
  echo -e "${RED}❌ Invalid stage: $STAGE${NC}"
  echo -e "${YELLOW}Valid stages: dev, staging, prod${NC}"
  exit 1
fi

echo -e "${BLUE}🚀 ADMI Blog Generation Serverless Deployment${NC}"
echo -e "${BLUE}===============================================${NC}"
echo ""

# Check if serverless is installed
if ! command -v serverless &> /dev/null; then
  echo -e "${RED}❌ Serverless Framework is not installed${NC}"
  echo -e "${YELLOW}Install it with: npm install -g serverless${NC}"
  exit 1
fi

# Check if .env file exists for the stage
ENV_FILE=".env"
if [[ "$STAGE" != "dev" ]]; then
  ENV_FILE=".env.$STAGE"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo -e "${YELLOW}⚠️  Environment file $ENV_FILE not found${NC}"
  echo -e "${YELLOW}Creating from template...${NC}"
  cp .env.example "$ENV_FILE"
  echo -e "${RED}❌ Please configure $ENV_FILE with your environment variables${NC}"
  exit 1
fi

# Check if node_modules exists
if [[ ! -d "node_modules" ]]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install
fi

# Validate required environment variables
echo -e "${BLUE}🔍 Validating environment configuration...${NC}"
source "$ENV_FILE"

REQUIRED_VARS=(
  "ADMI_CONTENTFUL_SPACE_ID"
  "ADMI_CONTENTFUL_ACCESS_TOKEN"
  "ADMI_CONTENTFUL_MANAGEMENT_TOKEN"
  "OPENAI_API_KEY"
)

MISSING_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!var}" ]]; then
    MISSING_VARS+=("$var")
  fi
done

if [[ ${#MISSING_VARS[@]} -gt 0 ]]; then
  echo -e "${RED}❌ Missing required environment variables:${NC}"
  for var in "${MISSING_VARS[@]}"; do
    echo -e "${RED}   - $var${NC}"
  done
  echo -e "${YELLOW}Please configure these in $ENV_FILE${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Environment configuration valid${NC}"

# Show deployment info
echo ""
echo -e "${BLUE}📋 Deployment Information:${NC}"
echo -e "   Stage: ${GREEN}$STAGE${NC}"
echo -e "   Region: ${GREEN}us-east-1${NC}"
echo -e "   Service: ${GREEN}admi-blog-generation${NC}"
if [[ -n "$DRY_RUN" ]]; then
  echo -e "   Mode: ${YELLOW}DRY RUN${NC}"
fi
echo ""

# Confirm deployment (skip for dry run)
if [[ -z "$DRY_RUN" ]]; then
  if [[ "$STAGE" == "prod" ]]; then
    echo -e "${YELLOW}⚠️  You are about to deploy to PRODUCTION${NC}"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${YELLOW}Deployment cancelled${NC}"
      exit 0
    fi
  fi
fi

# Deploy
echo -e "${BLUE}🚀 Starting deployment...${NC}"
echo ""

if [[ -n "$DRY_RUN" ]]; then
  echo -e "${YELLOW}DRY RUN: Would execute:${NC}"
  echo "serverless deploy --stage $STAGE $VERBOSE"
else
  serverless deploy --stage "$STAGE" $VERBOSE
fi

if [[ $? -eq 0 && -z "$DRY_RUN" ]]; then
  echo ""
  echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
  echo ""
  echo -e "${BLUE}🔗 Useful commands:${NC}"
  echo "   View logs (daily):   serverless logs -f dailyBlogGeneration --stage $STAGE"
  echo "   View logs (weekly):  serverless logs -f weeklyBlogGeneration --stage $STAGE"
  echo "   Test function:       serverless invoke -f testBlogGeneration --stage $STAGE"
  echo "   Get stats:           serverless invoke -f blogStats --stage $STAGE"
  echo "   Remove deployment:   serverless remove --stage $STAGE"
  echo ""
  echo -e "${BLUE}📊 Schedule Information:${NC}"
  echo "   Daily generation:    Every day at 9:00 AM UTC"
  echo "   Weekly generation:   Every Sunday at 10:00 AM UTC"
  echo ""
  
  if [[ "$STAGE" == "prod" ]]; then
    echo -e "${GREEN}🎉 Production deployment complete!${NC}"
    echo -e "${YELLOW}Blog generation will run automatically according to schedule.${NC}"
  fi
else
  if [[ -z "$DRY_RUN" ]]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
  fi
fi