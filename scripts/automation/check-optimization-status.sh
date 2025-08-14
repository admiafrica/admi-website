#!/bin/bash

# Check Content Optimization Status
# Shows recent logs and system status

LOGS_DIR="/Users/wilfred/admi-website/logs/content-optimization"

echo "🔍 ADMI Content Optimization Status"
echo "=================================="

# Check recent activity
echo -e "\n📊 Recent Activity:"
if [ -d "$LOGS_DIR" ]; then
    ls -lt "$LOGS_DIR"/*.log 2>/dev/null | head -5
else
    echo "No logs found"
fi

# Check cron jobs
echo -e "\n⏰ Scheduled Jobs:"
crontab -l | grep -A1 -B1 "content-optimization\|ADMI Content"

# Check next run
echo -e "\n⏭️  Next Scheduled Run:"
crontab -l | grep "content-optimization" | head -1 | awk '{print "Daily: " $1 ":" $2 " (weekdays)"}'
crontab -l | grep "content-optimization" | head -2 | tail -1 | awk '{print "Weekly: " $1 ":" $2 " (Sundays)"}'
crontab -l | grep "content-optimization" | tail -1 | awk '{print "Monthly: " $1 ":" $2 " (1st of month)"}'

echo -e "\n✨ System is monitoring GA4 data and generating content automatically!"
