#!/bin/bash

# Daily Content Optimization
# Runs Monday-Friday at 2:00 AM
# Generates 1-2 FAQs based on recent search data

PROJECT_DIR="/Users/wilfred/admi-website"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/daily-optimization-$TIMESTAMP.log"

cd "$PROJECT_DIR"

echo "$(date): Starting daily content optimization..." >> "$LOG_FILE"

# Run optimization with limited scope for daily runs
node scripts/automation/intelligent-content-optimizer.js \
  --max-faqs 2 \
  --max-articles 0 \
  >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "$(date): Daily optimization completed successfully" >> "$LOG_FILE"
else
    echo "$(date): Daily optimization failed with exit code $EXIT_CODE" >> "$LOG_FILE"
fi

# Keep only last 30 days of logs
find "$LOGS_DIR" -name "daily-optimization-*.log" -type f -mtime +30 -delete

echo "Daily content optimization completed. Check log: $LOG_FILE"
