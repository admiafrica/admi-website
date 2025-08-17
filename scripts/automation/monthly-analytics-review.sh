#!/bin/bash

# Monthly Analytics Review and Content Strategy Update
# Runs first day of each month at 3:00 AM
# Comprehensive analysis and strategic content planning

PROJECT_DIR="/Users/wilfred/admi-website"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization" 
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/monthly-review-$TIMESTAMP.log"

cd "$PROJECT_DIR"

echo "$(date): Starting monthly analytics review..." >> "$LOG_FILE"

# Generate comprehensive monthly report
node scripts/automation/monthly-analytics-report.js >> "$LOG_FILE" 2>&1

# Run comprehensive content generation
node scripts/automation/intelligent-content-optimizer.js \
  --max-faqs 10 \
  --max-articles 3 \
  >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "$(date): Monthly review completed successfully" >> "$LOG_FILE"
else
    echo "$(date): Monthly review failed with exit code $EXIT_CODE" >> "$LOG_FILE"
fi

# Archive old reports (keep 12 months)
find "$LOGS_DIR" -name "monthly-review-*.log" -type f -mtime +365 -delete

echo "Monthly analytics review completed. Check log: $LOG_FILE"
