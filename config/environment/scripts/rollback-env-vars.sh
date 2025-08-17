#!/bin/bash

# rollback-env-vars.sh - Rollback environment variables to a previous backup
# Usage: ./rollback-env-vars.sh [staging|production] [backup-file]

set -e

ENVIRONMENT=${1:-staging}
BACKUP_FILE=$2

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$CONFIG_DIR/backup"

# AWS Amplify App ID
APP_ID="dlm0hjalapt7d"

echo "🔄 Rolling back $ENVIRONMENT environment variables..."

# If no backup file specified, show available backups
if [[ -z "$BACKUP_FILE" ]]; then
    echo "Available backups:"
    ls -la "$BACKUP_DIR"/amplify-${ENVIRONMENT}-*.json | awk '{print $9, $5, $6, $7, $8}' | column -t
    echo
    read -p "Enter backup filename (or 'latest' for most recent): " BACKUP_SELECTION
    
    if [[ "$BACKUP_SELECTION" == "latest" ]]; then
        BACKUP_FILE="$BACKUP_DIR/amplify-${ENVIRONMENT}-latest.json"
    else
        BACKUP_FILE="$BACKUP_DIR/$BACKUP_SELECTION"
    fi
fi

# Check if backup file exists
if [[ ! -f "$BACKUP_FILE" ]]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Validate backup file
if ! jq empty "$BACKUP_FILE" 2>/dev/null; then
    echo "❌ Invalid backup file (corrupted JSON): $BACKUP_FILE"
    exit 1
fi

VAR_COUNT=$(jq 'keys | length' "$BACKUP_FILE")
echo "📊 Backup contains $VAR_COUNT variables"

# Create a backup of current state before rollback
echo "📦 Creating safety backup before rollback..."
"$SCRIPT_DIR/backup-env-vars.sh" "$ENVIRONMENT"

# Confirm rollback
echo "⚠️  This will replace ALL current environment variables with the backup"
read -p "Continue with rollback? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

# Perform rollback
echo "🔄 Rolling back environment variables..."
if AWS_PROFILE=admi-website aws amplify update-app \
    --app-id "$APP_ID" \
    --cli-input-json "{\"environmentVariables\": $(cat "$BACKUP_FILE")}" \
    --output json > /dev/null; then
    
    echo "✅ Rollback completed successfully!"
    echo "📊 Variables restored: $VAR_COUNT"
    
    # Update the current config file to match the rollback
    cp "$BACKUP_FILE" "$CONFIG_DIR/amplify-${ENVIRONMENT}.json"
    echo "📝 Updated config file to match rollback"
    
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
    fi
else
    echo "❌ Failed to rollback environment variables"
    exit 1
fi