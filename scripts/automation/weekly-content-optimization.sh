#!/bin/bash

# Weekly Comprehensive Content Optimization  
# Runs every Sunday at 1:00 AM
# Generates articles and comprehensive FAQ updates

PROJECT_DIR="/Users/wilfred/admi-website"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/weekly-optimization-$TIMESTAMP.log"

cd "$PROJECT_DIR"

echo "$(date): Starting weekly comprehensive optimization..." >> "$LOG_FILE"

# Run comprehensive optimization
node scripts/automation/intelligent-content-optimizer.js \
  --max-faqs 5 \
  --max-articles 2 \
  >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

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
