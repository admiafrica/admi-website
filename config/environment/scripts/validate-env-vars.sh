#!/bin/bash

# validate-env-vars.sh - Validate environment variable configuration
# Usage: ./validate-env-vars.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$(dirname "$SCRIPT_DIR")"

# Configuration files
NEW_CONFIG="$CONFIG_DIR/amplify-${ENVIRONMENT}.json"
LATEST_BACKUP="$CONFIG_DIR/backup/amplify-${ENVIRONMENT}-latest.json"

# AWS Amplify App ID
APP_ID="dlm0hjalapt7d"

echo "🔍 Validating $ENVIRONMENT environment variable configuration..."

# Check if new config file exists
if [[ ! -f "$NEW_CONFIG" ]]; then
    echo "❌ Configuration file not found: $NEW_CONFIG"
    exit 1
fi

# Validate JSON syntax
if ! jq empty "$NEW_CONFIG" 2>/dev/null; then
    echo "❌ Invalid JSON syntax in $NEW_CONFIG"
    exit 1
fi

# Get current variables from Amplify for comparison
echo "📥 Fetching current variables from Amplify..."
CURRENT_VARS=$(mktemp)
AWS_PROFILE=admi-website aws amplify get-app --app-id "$APP_ID" | jq '.app.environmentVariables' > "$CURRENT_VARS"

# Count variables
CURRENT_COUNT=$(jq 'keys | length' "$CURRENT_VARS")
NEW_COUNT=$(jq 'keys | length' "$NEW_CONFIG")

echo "📊 Current variables: $CURRENT_COUNT"
echo "📊 New variables: $NEW_COUNT"

# Check for variable loss
if [[ $NEW_COUNT -lt $CURRENT_COUNT ]]; then
    echo "⚠️  WARNING: New configuration has fewer variables ($NEW_COUNT vs $CURRENT_COUNT)"
    echo "Missing variables:"
    jq -r --slurpfile new "$NEW_CONFIG" 'keys - ($new[0] | keys) | .[]' "$CURRENT_VARS"
    
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Validation failed - aborting"
        exit 1
    fi
fi

# Check for required variables
REQUIRED_VARS=(
    "ADMI_CONTENTFUL_SPACE_ID"
    "ADMI_CONTENTFUL_ACCESS_TOKEN" 
    "CONTENTFUL_MANAGEMENT_TOKEN"
    "NEXT_OPENAI_API_KEY"
    "CONTENTFUL_PREVIEW_API_TOKEN"
)

echo "🔍 Checking required variables..."
for var in "${REQUIRED_VARS[@]}"; do
    if ! jq -e "has(\"$var\")" "$NEW_CONFIG" >/dev/null; then
        echo "❌ Missing required variable: $var"
        exit 1
    fi
done

# Show differences if there's a backup to compare against
if [[ -f "$LATEST_BACKUP" ]]; then
    echo "📋 Changes since last backup:"
    
    # Added variables
    ADDED=$(jq -r --slurpfile backup "$LATEST_BACKUP" 'keys - ($backup[0] | keys) | .[]' "$NEW_CONFIG")
    if [[ -n "$ADDED" ]]; then
        echo "➕ Added variables:"
        echo "$ADDED" | sed 's/^/  - /'
    fi
    
    # Removed variables  
    REMOVED=$(jq -r --slurpfile new "$NEW_CONFIG" 'keys - ($new[0] | keys) | .[]' "$LATEST_BACKUP")
    if [[ -n "$REMOVED" ]]; then
        echo "➖ Removed variables:"
        echo "$REMOVED" | sed 's/^/  - /'
    fi
    
    # Modified variables
    echo "🔄 Modified variables:"
    jq -r --slurpfile backup "$LATEST_BACKUP" '
        to_entries | 
        map(select(.key as $k | $backup[0] | has($k) and (.[$k] != $ARGS.positional[0][$k]))) |
        map(.key) | 
        .[]' "$NEW_CONFIG" | sed 's/^/  - /' || echo "  (none)"
fi

echo "✅ Validation passed!"

# Cleanup
rm -f "$CURRENT_VARS"