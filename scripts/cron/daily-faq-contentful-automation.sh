#!/bin/bash

# Enhanced FAQ Automation with Contentful Integration
# Runs analytics-driven FAQ generation and automatically adds to Contentful
# Author: AI Assistant
# Schedule: Daily at 2 AM UTC

set -e

# Set script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_DIR="$PROJECT_ROOT/logs/cron"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
LOG_FILE="$LOG_DIR/faq-contentful-automation-$TIMESTAMP.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to run command with logging
run_cmd() {
    local cmd="$1"
    local desc="$2"

    log "🚀 Starting: $desc"
    log "📝 Command: $cmd"

    if eval "cd '$PROJECT_ROOT' && $cmd" >> "$LOG_FILE" 2>&1; then
        log "✅ Success: $desc"
        return 0
    else
        log "❌ Failed: $desc"
        return 1
    fi
}

# Function to send Slack notification (optional)
send_slack_notification() {
    local status="$1"
    local message="$2"
    local webhook_url="$3"

    if [ -z "$webhook_url" ]; then
        log "⏭️ No Slack webhook configured, skipping notification"
        return 0
    fi

    log "📢 Sending Slack notification: $status"

    curl -X POST "$webhook_url" \
        -H 'Content-Type: application/json' \
        -d "{
            \"text\": \"📊 ADMI FAQ Automation\",
            \"attachments\": [{
                \"color\": \"$([ '$status' = 'SUCCESS' ] && echo 'good' || echo 'danger')\",
                \"title\": \"$status\",
                \"text\": \"$message\",
                \"footer\": \"Timestamp: $(date)\",
                \"footer_icon\": \"https://admi.africa/logo.png\"
            }]
        }" 2>/dev/null || log "⚠️  Failed to send Slack notification"
}

# Main execution function
main() {
    log "═══════════════════════════════════════════════════════"
    log "🎯 FAQ Automation with Contentful Integration Started"
    log "═══════════════════════════════════════════════════════"
    log "📁 Project Root: $PROJECT_ROOT"
    log "📋 Log File: $LOG_FILE"
    log "⏰ Started at: $(date '+%Y-%m-%d %H:%M:%S UTC')"

    # Change to project directory
    cd "$PROJECT_ROOT" || {
        log "❌ Failed to change to project directory: $PROJECT_ROOT"
        return 1
    }

    local failed_steps=0
    local total_steps=0
    local success_message=""

    # Step 1: Verify Environment
    total_steps=$((total_steps + 1))
    if [ -z "$CONTENTFUL_MANAGEMENT_TOKEN" ]; then
        log "❌ CONTENTFUL_MANAGEMENT_TOKEN not set"
        failed_steps=$((failed_steps + 1))
    else
        log "✅ Contentful credentials available"
    fi

    if [ -z "$OPENAI_API_KEY" ] && [ -z "$NEXT_OPENAI_API_KEY" ]; then
        log "❌ OpenAI API key not configured"
        failed_steps=$((failed_steps + 1))
    else
        log "✅ OpenAI API configured"
    fi

    # Step 2: Run Analytics-to-Contentful FAQ Automation
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:analytics-to-contentful run" "Analytics-driven FAQ generation and Contentful integration"; then
        log "📚 FAQs successfully generated and added to Contentful"
        success_message="✅ FAQs generated and added to Contentful"
    else
        log "⚠️  FAQ automation completed with warnings"
        success_message="⚠️ FAQ automation completed (check logs)"
        failed_steps=$((failed_steps + 1))
    fi

    # Step 3: Verify FAQs were created
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:analytics-to-contentful dry-run" "Verify FAQ generation process"; then
        log "✅ FAQ generation workflow verified"
    else
        log "⚠️  Could not verify FAQ generation"
        failed_steps=$((failed_steps + 1))
    fi

    # Step 4: Update main FAQ page with API data (optional)
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:api-optimize optimize-main" "Optimize main FAQ page with aggregated data"; then
        log "🎯 Main FAQ page optimized"
    else
        log "⚠️  Main FAQ page optimization skipped"
    fi

    # Final summary
    log ""
    log "═══════════════════════════════════════════════════════"
    log "📊 FAQ AUTOMATION SUMMARY"
    log "═══════════════════════════════════════════════════════"

    if [ $failed_steps -eq 0 ]; then
        log "✅ All steps completed successfully"
        log "📈 FAQs have been generated and added to Contentful"
        log "🔗 Check Contentful CMS to review entries"

        # Send success notification
        send_slack_notification "SUCCESS" "$success_message\n\nAll FAQ automation steps completed successfully" "$SLACK_WEBHOOK_URL"
        return 0
    else
        log "⚠️  Completed with $failed_steps/$total_steps steps failed"
        log "📋 Review log file for details: $LOG_FILE"

        # Send warning notification
        send_slack_notification "WARNING" "$success_message\n\n$failed_steps of $total_steps steps had issues" "$SLACK_WEBHOOK_URL"
        return 1
    fi
}

# Execute main function
main
exit_code=$?

log ""
log "📝 Log saved to: $LOG_FILE"
log "⏰ Completed at: $(date '+%Y-%m-%d %H:%M:%S UTC')"

exit $exit_code
