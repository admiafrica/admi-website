#!/bin/bash

# Daily Content Optimization
# Runs Monday-Friday at 2:00 AM
# Generates 1-2 FAQs based on recent search data

# Set up proper PATH for cron environment
export PATH="/Users/wilfred/.nvm/versions/node/v22.17.1/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

PROJECT_DIR="/Users/wilfred/admi-website"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/daily-optimization-$TIMESTAMP.log"

cd "$PROJECT_DIR"

echo "$(date): Starting daily content optimization..." >> "$LOG_FILE"

# Run optimization with limited scope for daily runs
# Uses new analytics-to-contentful-faq.js for enhanced FAQ generation
npm run faq:analytics-to-contentful run \
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
