#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# ADMI Weekly FAQ & Blog Generation Cron Job
# ═══════════════════════════════════════════════════════════════════════════
# Purpose: Updates FAQs with relevant knowledge base information and
#          generates new blog articles from analytics queries
# Schedule: Every Monday at 2:00 AM
# Author: AI Assistant
# Last Updated: 2025-12-08
#
# Job Flow:
#   1. Update FAQ entries in Contentful from Google Analytics queries
#   2. Generate new blog articles from trending topics
#   3. Verify all integrations
#   4. Send notifications
# ═══════════════════════════════════════════════════════════════════════════

# Set strict error handling
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Set script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_DIR="$PROJECT_ROOT/logs/cron"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
LOG_FILE="$LOG_DIR/weekly-faq-blogs-$TIMESTAMP.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# ───────────────────────────────────────────────────────────────────────────
# Logging Functions
# ───────────────────────────────────────────────────────────────────────────

log() {
    local level="$1"
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case "$level" in
        INFO)
            echo -e "${BLUE}[${timestamp}] ℹ️  INFO:${NC} $message" | tee -a "$LOG_FILE"
            ;;
        SUCCESS)
            echo -e "${GREEN}[${timestamp}] ✅ SUCCESS:${NC} $message" | tee -a "$LOG_FILE"
            ;;
        WARN)
            echo -e "${YELLOW}[${timestamp}] ⚠️  WARNING:${NC} $message" | tee -a "$LOG_FILE"
            ;;
        ERROR)
            echo -e "${RED}[${timestamp}] ❌ ERROR:${NC} $message" | tee -a "$LOG_FILE"
            ;;
        *)
            echo "[${timestamp}] $message" | tee -a "$LOG_FILE"
            ;;
    esac
}

# ───────────────────────────────────────────────────────────────────────────
# Verification Functions
# ───────────────────────────────────────────────────────────────────────────

verify_environment() {
    log INFO "Verifying environment setup..."
    
    # Check if project directory exists
    if [ ! -d "$PROJECT_ROOT" ]; then
        log ERROR "Project directory not found: $PROJECT_ROOT"
        return 1
    fi
    
    # Check if .env file exists
    if [ ! -f "$PROJECT_ROOT/.env" ]; then
        log ERROR ".env file not found"
        return 1
    fi
    
    # Source .env to verify required variables
    set +a
    source "$PROJECT_ROOT/.env"
    set -a
    
    # Check required variables
    local required_vars=(
        "CONTENTFUL_MANAGEMENT_TOKEN"
        "ADMI_CONTENTFUL_SPACE_ID"
        "NEXT_OPENAI_API_KEY"
    )
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var:-}" ]; then
            log WARN "Environment variable not set: $var"
        fi
    done
    
    log SUCCESS "Environment verification complete"
    return 0
}

verify_dependencies() {
    log INFO "Verifying dependencies..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        log ERROR "Node.js is not installed"
        return 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        log ERROR "npm is not installed"
        return 1
    fi
    
    # Check if required npm scripts exist
    if ! grep -q '"faq:analytics-to-contentful"' "$PROJECT_ROOT/package.json"; then
        log ERROR "npm script 'faq:analytics-to-contentful' not found in package.json"
        return 1
    fi
    
    if ! grep -q '"blog:weekly"' "$PROJECT_ROOT/package.json"; then
        log WARN "npm script 'blog:weekly' not found - skipping blog generation"
    fi
    
    log SUCCESS "Dependencies verified"
    return 0
}

# ───────────────────────────────────────────────────────────────────────────
# Job Execution Functions
# ───────────────────────────────────────────────────────────────────────────

run_faq_automation() {
    log INFO "Starting FAQ automation..."
    
    cd "$PROJECT_ROOT" || {
        log ERROR "Failed to change to project directory"
        return 1
    }
    
    if npm run faq:analytics-to-contentful run >> "$LOG_FILE" 2>&1; then
        log SUCCESS "FAQ automation completed successfully"
        return 0
    else
        log ERROR "FAQ automation failed"
        return 1
    fi
}

run_blog_generation() {
    log INFO "Starting blog generation..."
    
    cd "$PROJECT_ROOT" || {
        log ERROR "Failed to change to project directory"
        return 1
    }
    
    # Check if blog:weekly script exists
    if grep -q '"blog:weekly"' "$PROJECT_ROOT/package.json"; then
        if npm run blog:weekly >> "$LOG_FILE" 2>&1; then
            log SUCCESS "Blog generation completed successfully"
            return 0
        else
            log ERROR "Blog generation failed"
            return 1
        fi
    else
        log WARN "Blog generation script not available - skipping"
        return 0
    fi
}

# ───────────────────────────────────────────────────────────────────────────
# Notification Functions
# ───────────────────────────────────────────────────────────────────────────

send_notification() {
    local status="$1"
    local summary="$2"
    
    log INFO "Preparing notification: $status"
    
    # Get stats from log file
    local faq_count=$(grep -c "FAQ: " "$LOG_FILE" || echo "0")
    local blog_count=$(grep -c "Blog: " "$LOG_FILE" || echo "0")
    local errors=$(grep -c "ERROR" "$LOG_FILE" || echo "0")
    
    # You can add Slack, email, or other notification methods here
    # Example Slack webhook (uncomment and configure):
    # if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
    #     curl -X POST "$SLACK_WEBHOOK_URL" \
    #       -H "Content-Type: application/json" \
    #       -d "{
    #         \"text\": \"Weekly FAQ & Blog Automation: $status\",
    #         \"blocks\": [
    #           {\"type\": \"section\", \"text\": {\"type\": \"mrkdwn\", \"text\": \"*Status:* $status\n*FAQs Updated:* $faq_count\n*Blogs Generated:* $blog_count\n*Errors:* $errors\"}}
    #         ]
    #       }"
    # fi
    
    log INFO "Notification prepared (FAQs: $faq_count, Blogs: $blog_count, Errors: $errors)"
}

# ───────────────────────────────────────────────────────────────────────────
# Main Execution
# ───────────────────────────────────────────────────────────────────────────

main() {
    local start_time=$(date +%s)
    
    log INFO "╔════════════════════════════════════════════════════════════╗"
    log INFO "║     ADMI Weekly FAQ & Blog Automation Started             ║"
    log INFO "╚════════════════════════════════════════════════════════════╝"
    log INFO "Timestamp: $TIMESTAMP"
    log INFO "Log File: $LOG_FILE"
    log INFO "Project Root: $PROJECT_ROOT"
    
    # Track failures
    local failed_jobs=0
    local total_jobs=2
    
    # Step 1: Verify environment
    if ! verify_environment; then
        log ERROR "Environment verification failed"
        failed_jobs=$((failed_jobs + 1))
    fi
    
    # Step 2: Verify dependencies
    if ! verify_dependencies; then
        log ERROR "Dependency verification failed"
        failed_jobs=$((failed_jobs + 1))
    fi
    
    # Step 3: Run FAQ automation
    log INFO "─────────────────────────────────────────────────────────────"
    log INFO "Phase 1/2: FAQ Automation"
    log INFO "─────────────────────────────────────────────────────────────"
    if ! run_faq_automation; then
        failed_jobs=$((failed_jobs + 1))
    fi
    
    # Step 4: Run blog generation
    log INFO "─────────────────────────────────────────────────────────────"
    log INFO "Phase 2/2: Blog Generation"
    log INFO "─────────────────────────────────────────────────────────────"
    if ! run_blog_generation; then
        failed_jobs=$((failed_jobs + 1))
    fi
    
    # Step 5: Send notifications
    log INFO "─────────────────────────────────────────────────────────────"
    if [ $failed_jobs -eq 0 ]; then
        send_notification "SUCCESS" "All jobs completed successfully"
    else
        send_notification "PARTIAL_SUCCESS" "$failed_jobs/$total_jobs jobs failed"
    fi
    
    # Calculate execution time
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local minutes=$((duration / 60))
    local seconds=$((duration % 60))
    
    # Final summary
    log INFO "╔════════════════════════════════════════════════════════════╗"
    if [ $failed_jobs -eq 0 ]; then
        log SUCCESS "✅ All tasks completed successfully"
    else
        log WARN "⚠️  $failed_jobs/$total_jobs jobs encountered issues"
    fi
    log INFO "Duration: ${minutes}m ${seconds}s"
    log INFO "╚════════════════════════════════════════════════════════════╝"
    
    # Exit with appropriate code
    [ $failed_jobs -eq 0 ] && exit 0 || exit 1
}

# ───────────────────────────────────────────────────────────────────────────
# Execute
# ───────────────────────────────────────────────────────────────────────────

main "$@"
