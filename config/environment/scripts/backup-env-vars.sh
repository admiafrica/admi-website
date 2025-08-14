#!/bin/bash

# backup-env-vars.sh - Backup current Amplify environment variables
# Usage: ./backup-env-vars.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$CONFIG_DIR/backup"

# AWS Amplify App ID
APP_ID="dlm0hjalapt7d"

# Create backup filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/amplify-${ENVIRONMENT}-${TIMESTAMP}.json"

echo "🔄 Backing up current $ENVIRONMENT environment variables..."

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Get current environment variables from Amplify
if ! AWS_PROFILE=admi-website aws amplify get-app --app-id "$APP_ID" | jq '.app.environmentVariables' > "$BACKUP_FILE"; then
    echo "❌ Failed to backup environment variables"
    exit 1
fi

# Get variable count for confirmation
VAR_COUNT=$(jq 'keys | length' "$BACKUP_FILE")

echo "✅ Backup completed: $BACKUP_FILE"
echo "📊 Variables backed up: $VAR_COUNT"

# Create a symlink to the latest backup
LATEST_BACKUP="$BACKUP_DIR/amplify-${ENVIRONMENT}-latest.json"
rm -f "$LATEST_BACKUP"
ln -s "$(basename "$BACKUP_FILE")" "$LATEST_BACKUP"

echo "🔗 Latest backup symlinked: $LATEST_BACKUP"

# Clean up old backups (keep last 10)
echo "🧹 Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t amplify-${ENVIRONMENT}-[0-9]*.json | tail -n +11 | xargs -r rm
echo "✅ Cleanup completed"