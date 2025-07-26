#!/bin/bash

# Weekly FAQ Optimization Cron Job
# Runs automated FAQ optimization using real analytics data
# Author: AI Assistant
# Schedule: Every Monday at 6:00 AM

# Set script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_DIR="$PROJECT_ROOT/logs/cron"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
LOG_FILE="$LOG_DIR/faq-optimization-$TIMESTAMP.log"

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

# Function to send notification (customize as needed)
send_notification() {
    local status="$1"
    local message="$2"
    
    # Log notification
    log "📢 Notification: $status - $message"
    
    # TODO: Add actual notification method (email, Slack, etc.)
    # Example webhook notification (uncomment and configure):
    # curl -X POST "$WEBHOOK_URL" \
    #   -H "Content-Type: application/json" \
    #   -d "{\"text\":\"FAQ Optimization $status: $message\"}"
}

# Main execution function
main() {
    log "🎯 Weekly FAQ Optimization Started"
    log "📁 Project Root: $PROJECT_ROOT"
    log "📋 Log File: $LOG_FILE"
    
    # Change to project directory
    cd "$PROJECT_ROOT" || {
        log "❌ Failed to change to project directory: $PROJECT_ROOT"
        exit 1
    }
    
    local failed_steps=0
    local total_steps=0
    
    # Step 1: Test Analytics Connection
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:api-optimize test-api" "Test analytics API connection"; then
        log "📊 Analytics connection verified"
    else
        log "⚠️  Analytics connection failed - using demo data"
        failed_steps=$((failed_steps + 1))
    fi
    
    # Step 2: Generate Analytics Report
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:api-optimize report" "Generate analytics optimization report"; then
        log "📈 Analytics report generated successfully"
    else
        log "❌ Failed to generate analytics report"
        failed_steps=$((failed_steps + 1))
    fi
    
    # Step 3: Optimize Main FAQ Page
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:api-optimize optimize-main" "Optimize main FAQ page with search data"; then
        log "🎯 Main FAQ page optimized successfully"
    else
        log "❌ Failed to optimize main FAQ page"
        failed_steps=$((failed_steps + 1))
    fi
    
    # Step 4: Update Course-Specific FAQs (Top 5 Courses)
    local courses=("music-production-diploma" "graphic-design-diploma" "film-and-television-production-diploma" "digital-marketing-certificate" "animation-and-motion-graphics-diploma")
    
    for course in "${courses[@]}"; do
        total_steps=$((total_steps + 1))
        if run_cmd "npm run faq:generate-simple $course -- --update" "Update FAQs for $course"; then
            log "📚 Course FAQs updated: $course"
        else
            log "⚠️  Failed to update course FAQs: $course"
            failed_steps=$((failed_steps + 1))
        fi
    done
    
    # Step 5: Run Performance Monitoring
    total_steps=$((total_steps + 1))
    if run_cmd "npm run faq:monitor monitor" "Generate performance monitoring report"; then
        log "📊 Performance monitoring completed"
    else
        log "⚠️  Performance monitoring failed"
        failed_steps=$((failed_steps + 1))
    fi
    
    # Step 6: Run Type Check and Linting
    total_steps=$((total_steps + 1))
    if run_cmd "npm run type-check" "Run TypeScript type checking"; then
        log "🔍 Type checking passed"
    else
        log "⚠️  Type checking issues found"
        failed_steps=$((failed_steps + 1))
    fi
    
    total_steps=$((total_steps + 1))
    if run_cmd "npm run lint" "Run ESLint code checking"; then
        log "🔍 Linting passed"
    else
        log "⚠️  Linting issues found"
        failed_steps=$((failed_steps + 1))
    fi
    
    # Generate Summary
    local success_steps=$((total_steps - failed_steps))
    local success_rate=$((success_steps * 100 / total_steps))
    
    log "📋 Weekly FAQ Optimization Summary:"
    log "   Total Steps: $total_steps"
    log "   Successful: $success_steps"
    log "   Failed: $failed_steps" 
    log "   Success Rate: $success_rate%"
    log "   Duration: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Determine overall status
    if [ $failed_steps -eq 0 ]; then
        log "🎉 Weekly optimization completed successfully!"
        send_notification "SUCCESS" "All $total_steps optimization steps completed successfully"
        return 0
    elif [ $success_rate -ge 70 ]; then
        log "⚠️  Weekly optimization completed with warnings"
        send_notification "WARNING" "$success_steps/$total_steps steps completed successfully ($success_rate%)"
        return 0
    else
        log "❌ Weekly optimization failed"
        send_notification "FAILURE" "Only $success_steps/$total_steps steps completed ($success_rate%)"
        return 1
    fi
}

# Cleanup old log files (keep last 30 days)
cleanup_logs() {
    log "🧹 Cleaning up old log files..."
    find "$LOG_DIR" -name "faq-optimization-*.log" -mtime +30 -delete 2>/dev/null || true
    log "✅ Log cleanup completed"
}

# Error handling
set -eE
trap 'log "❌ Script failed at line $LINENO. Exit code: $?"' ERR

# Execute main function
main "$@"
exit_code=$?

# Cleanup
cleanup_logs

# Final log entry
log "🏁 Weekly FAQ optimization script finished with exit code: $exit_code"

exit $exit_code