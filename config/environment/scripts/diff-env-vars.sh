#!/bin/bash

# diff-env-vars.sh - Show differences between configurations
# Usage: ./diff-env-vars.sh [staging|production] [file1] [file2]

set -e

ENVIRONMENT=${1:-staging}
FILE1=${2:-"current"}
FILE2=${3:-"config"}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$(dirname "$SCRIPT_DIR")"

# AWS Amplify App ID
APP_ID="dlm0hjalapt7d"

# Resolve file paths
if [[ "$FILE1" == "current" ]]; then
    TEMP_CURRENT=$(mktemp)
    AWS_PROFILE=admi-website aws amplify get-app --app-id "$APP_ID" | jq '.app.environmentVariables' > "$TEMP_CURRENT"
    FILE1="$TEMP_CURRENT"
    FILE1_LABEL="Current (Amplify)"
elif [[ "$FILE1" == "config" ]]; then
    FILE1="$CONFIG_DIR/amplify-${ENVIRONMENT}.json"
    FILE1_LABEL="Config File"
else
    FILE1_LABEL="$FILE1"
fi

if [[ "$FILE2" == "current" ]]; then
    TEMP_CURRENT=$(mktemp)
    AWS_PROFILE=admi-website aws amplify get-app --app-id "$APP_ID" | jq '.app.environmentVariables' > "$TEMP_CURRENT"
    FILE2="$TEMP_CURRENT"
    FILE2_LABEL="Current (Amplify)"
elif [[ "$FILE2" == "config" ]]; then
    FILE2="$CONFIG_DIR/amplify-${ENVIRONMENT}.json"
    FILE2_LABEL="Config File"
else
    FILE2_LABEL="$FILE2"
fi

echo "🔍 Comparing environment variables:"
echo "   📄 File 1: $FILE1_LABEL"
echo "   📄 File 2: $FILE2_LABEL"
echo

# Check if files exist
for file in "$FILE1" "$FILE2"; do
    if [[ ! -f "$file" ]]; then
        echo "❌ File not found: $file"
        exit 1
    fi
done

# Variables only in FILE1
ONLY_IN_FILE1=$(jq -r --slurpfile file2 "$FILE2" 'keys - ($file2[0] | keys) | .[]' "$FILE1")
if [[ -n "$ONLY_IN_FILE1" ]]; then
    echo "➖ Variables only in $FILE1_LABEL:"
    echo "$ONLY_IN_FILE1" | sed 's/^/  - /'
    echo
fi

# Variables only in FILE2
ONLY_IN_FILE2=$(jq -r --slurpfile file1 "$FILE1" 'keys - ($file1[0] | keys) | .[]' "$FILE2")
if [[ -n "$ONLY_IN_FILE2" ]]; then
    echo "➕ Variables only in $FILE2_LABEL:"
    echo "$ONLY_IN_FILE2" | sed 's/^/  - /'
    echo
fi

# Variables with different values
echo "🔄 Variables with different values:"
DIFFERENT_VALUES=$(jq -r --slurpfile file2 "$FILE2" '
    to_entries | 
    map(select(.key as $k | $file2[0] | has($k) and (.[$k] != .value))) |
    map(.key) | 
    .[]' "$FILE1")

if [[ -n "$DIFFERENT_VALUES" ]]; then
    while IFS= read -r var; do
        if [[ -n "$var" ]]; then
            echo "  🔄 $var"
            echo "    $FILE1_LABEL: $(jq -r ".\"$var\"" "$FILE1")"
            echo "    $FILE2_LABEL: $(jq -r ".\"$var\"" "$FILE2")"
            echo
        fi
    done <<< "$DIFFERENT_VALUES"
else
    echo "  (none)"
fi

# Summary
FILE1_COUNT=$(jq 'keys | length' "$FILE1")
FILE2_COUNT=$(jq 'keys | length' "$FILE2")

echo "📊 Summary:"
echo "   $FILE1_LABEL: $FILE1_COUNT variables"
echo "   $FILE2_LABEL: $FILE2_COUNT variables"

# Cleanup temporary files
[[ -n "$TEMP_CURRENT" ]] && rm -f "$TEMP_CURRENT"