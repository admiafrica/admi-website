#!/bin/bash

# SEO Rocket Blog Generation - Cron Job Setup Script
# This script sets up automatic blog generation

echo "🚀 Setting up SEO Rocket Blog Generation Cron Jobs..."

# Get the current directory
CURRENT_DIR=$(pwd)
echo "Working directory: $CURRENT_DIR"

# Create logs directory if it doesn't exist
mkdir -p logs

# Create the cron job entries
CRON_DAILY="0 9 * * * cd $CURRENT_DIR && node blog-scheduler.js daily >> logs/blog-generation.log 2>&1"
CRON_WEEKLY="0 10 * * 0 cd $CURRENT_DIR && node blog-scheduler.js weekly >> logs/blog-generation.log 2>&1"

echo ""
echo "📅 Cron Jobs to be Added:"
echo "Daily (9 AM): $CRON_DAILY"
echo "Weekly (Sunday 10 AM): $CRON_WEEKLY"
echo ""

# Check if crontab exists
if crontab -l &> /dev/null; then
    echo "📋 Current crontab exists. Creating backup..."
    crontab -l > crontab_backup_$(date +%Y%m%d_%H%M%S).txt
    echo "✅ Backup created"
else
    echo "📋 No existing crontab found"
fi

# Create temporary cron file
TEMP_CRON=$(mktemp)

# Add existing cron jobs (if any) to temp file
crontab -l 2>/dev/null > "$TEMP_CRON"

# Check if our jobs already exist
if grep -q "blog-scheduler.js daily" "$TEMP_CRON"; then
    echo "⚠️  Daily blog generation job already exists in crontab"
else
    echo "$CRON_DAILY" >> "$TEMP_CRON"
    echo "✅ Added daily blog generation job"
fi

if grep -q "blog-scheduler.js weekly" "$TEMP_CRON"; then
    echo "⚠️  Weekly blog generation job already exists in crontab"
else
    echo "$CRON_WEEKLY" >> "$TEMP_CRON"
    echo "✅ Added weekly blog generation job"
fi

# Install the new crontab
crontab "$TEMP_CRON"

# Clean up
rm "$TEMP_CRON"

echo ""
echo "🎉 Cron jobs installed successfully!"
echo ""
echo "📊 Schedule:"
echo "  • Daily: 2 educational articles at 9:00 AM"
echo "  • Weekly: 7 educational articles on Sunday at 10:00 AM"
echo ""
echo "📝 Logs will be saved to: logs/blog-generation.log"
echo ""
echo "🔧 To view current cron jobs: crontab -l"
echo "🗑️  To remove cron jobs: crontab -e (then delete the lines)"
echo ""
echo "⚠️  Important Notes:"
echo "  • Make sure your .env file has all required API keys"
echo "  • Ensure Node.js is in your system PATH"
echo "  • The server must be running for cron jobs to execute"
echo "  • Check logs regularly for any errors"
echo ""

# Test that the script can run
echo "🧪 Testing blog generation script..."
if node blog-scheduler.js stats &> /dev/null; then
    echo "✅ Blog generation script test passed"
else
    echo "❌ Blog generation script test failed - check your setup"
fi

echo ""
echo "🎯 Next Steps:"
echo "  1. Articles will be automatically generated as drafts"
echo "  2. Review drafts in Contentful daily"
echo "  3. Add cover images to approved articles"
echo "  4. Publish when ready"
echo ""
echo "📞 For troubleshooting, check: logs/blog-generation.log"