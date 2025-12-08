#!/bin/bash

# Weekly Comprehensive Content Optimization  
# Runs every Sunday at 1:00 AM
# Generates articles and comprehensive FAQ updates

# Set up proper PATH for cron environment
export PATH="/Users/wilfred/.nvm/versions/node/v22.17.1/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

PROJECT_DIR="/Users/wilfred/admi-website"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/weekly-optimization-$TIMESTAMP.log"

cd "$PROJECT_DIR"

echo "$(date): Starting weekly comprehensive optimization..." >> "$LOG_FILE"

# Run comprehensive optimization
# Phase 1: Update FAQs with analytics data using new system
npm run faq:analytics-to-contentful run \
  >> "$LOG_FILE" 2>&1

FAQ_EXIT=$?

# Phase 2: Generate blog articles
npm run blog:weekly \
  >> "$LOG_FILE" 2>&1

BLOG_EXIT=$?

# Combine exit codes - fail if either failed
EXIT_CODE=0
if [ $FAQ_EXIT -ne 0 ]; then
  EXIT_CODE=1
fi
if [ $BLOG_EXIT -ne 0 ]; then
  EXIT_CODE=1
fi

if [ $EXIT_CODE -eq 0 ]; then
    echo "$(date): Weekly optimization completed successfully" >> "$LOG_FILE"
    
    # Send summary email (optional - would need email setup)
    # echo "Weekly content optimization completed. Check dashboard for new content." | mail -s "ADMI Content Optimization Report" admin@admi.africa
else
    echo "$(date): Weekly optimization failed with exit code $EXIT_CODE" >> "$LOG_FILE"
fi

# Keep only last 12 weeks of logs  
find "$LOGS_DIR" -name "weekly-optimization-*.log" -type f -mtime +84 -delete

echo "Weekly content optimization completed. Check log: $LOG_FILE"
