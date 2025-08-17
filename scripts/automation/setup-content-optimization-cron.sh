#!/bin/bash

# ADMI Content Optimization Cron Setup
# Automated content generation based on GA4 analytics data

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/Users/wilfred/admi-website"
SCRIPTS_DIR="$PROJECT_DIR/scripts/automation"
LOGS_DIR="$PROJECT_DIR/logs/content-optimization"

echo -e "${BLUE}🚀 Setting up ADMI Content Optimization Cron Jobs...${NC}\n"

# Create logs directory
echo -e "${YELLOW}📁 Creating logs directory...${NC}"
mkdir -p "$LOGS_DIR"
mkdir -p "$PROJECT_DIR/logs/cron"

# Create cron job scripts
echo -e "${YELLOW}📝 Creating cron job scripts...${NC}"

# Daily content optimization (weekdays only)
cat > "$SCRIPTS_DIR/daily-content-optimization.sh" << 'EOF'
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
EOF

# Weekly comprehensive optimization
cat > "$SCRIPTS_DIR/weekly-content-optimization.sh" << 'EOF'
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
EOF

# Monthly analytics review and optimization
cat > "$SCRIPTS_DIR/monthly-analytics-review.sh" << 'EOF'
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
EOF

# Make scripts executable
echo -e "${YELLOW}🔧 Making scripts executable...${NC}"
chmod +x "$SCRIPTS_DIR/daily-content-optimization.sh"
chmod +x "$SCRIPTS_DIR/weekly-content-optimization.sh"
chmod +x "$SCRIPTS_DIR/monthly-analytics-review.sh"

# Create cron jobs
echo -e "${YELLOW}⏰ Setting up cron jobs...${NC}"

# Backup existing crontab
crontab -l > /tmp/admi_crontab_backup 2>/dev/null || echo "# New crontab" > /tmp/admi_crontab_backup

# Add ADMI content optimization jobs
cat >> /tmp/admi_crontab_backup << EOF

# ADMI Content Optimization - Auto-generated $(date)
# Daily optimization (weekdays at 2:00 AM)
0 2 * * 1-5 $SCRIPTS_DIR/daily-content-optimization.sh

# Weekly comprehensive optimization (Sundays at 1:00 AM)  
0 1 * * 0 $SCRIPTS_DIR/weekly-content-optimization.sh

# Monthly analytics review (1st of month at 3:00 AM)
0 3 1 * * $SCRIPTS_DIR/monthly-analytics-review.sh

EOF

# Install new crontab
crontab /tmp/admi_crontab_backup

echo -e "${GREEN}✅ Cron jobs installed successfully!${NC}\n"

# Display cron schedule
echo -e "${BLUE}📅 Content Optimization Schedule:${NC}"
echo -e "${YELLOW}Daily (Mon-Fri 2:00 AM):${NC} Generate 2 FAQs based on recent searches"
echo -e "${YELLOW}Weekly (Sun 1:00 AM):${NC} Generate 5 FAQs + 2 articles, comprehensive analysis"  
echo -e "${YELLOW}Monthly (1st day 3:00 AM):${NC} Full analytics review + 10 FAQs + 3 articles"

echo -e "\n${BLUE}📁 Logs Location:${NC} $LOGS_DIR"
echo -e "${BLUE}🔧 Scripts Location:${NC} $SCRIPTS_DIR"

# Test setup
echo -e "\n${YELLOW}🧪 Testing setup...${NC}"
if [ -f "$SCRIPTS_DIR/intelligent-content-optimizer.js" ]; then
    echo -e "${GREEN}✅ Main optimizer script found${NC}"
else
    echo -e "${RED}❌ Main optimizer script missing${NC}"
    exit 1
fi

if crontab -l | grep -q "content-optimization"; then
    echo -e "${GREEN}✅ Cron jobs installed${NC}"
else
    echo -e "${RED}❌ Cron jobs installation failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 ADMI Content Optimization system is ready!${NC}"
echo -e "${BLUE}Next automated run:${NC} $(crontab -l | grep content-optimization | head -1 | awk '{print $1, $2, $3, $4, $5}')"

# Create monitoring script
cat > "$SCRIPTS_DIR/check-optimization-status.sh" << 'EOF'
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
EOF

chmod +x "$SCRIPTS_DIR/check-optimization-status.sh"

echo -e "\n${BLUE}💡 Useful Commands:${NC}"
echo -e "  Check status: ${YELLOW}$SCRIPTS_DIR/check-optimization-status.sh${NC}"
echo -e "  View cron jobs: ${YELLOW}crontab -l${NC}"
echo -e "  Test manually: ${YELLOW}cd $PROJECT_DIR && node scripts/automation/intelligent-content-optimizer.js${NC}"
echo -e "  View logs: ${YELLOW}ls -la $LOGS_DIR${NC}"