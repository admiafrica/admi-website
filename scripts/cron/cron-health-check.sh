#!/bin/bash

# Cron Health Check for FAQ Optimization
# Monitors the health and performance of automated FAQ optimization

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_DIR="$PROJECT_ROOT/logs/cron"

# Function to check cron job status
check_cron_status() {
    echo "🔍 Checking cron job status..."
    echo "=============================="
    
    if crontab -l 2>/dev/null | grep -q "faq-optimization"; then
        echo "✅ FAQ optimization cron job is installed"
        echo ""
        echo "📋 Current cron entries:"
        crontab -l | grep -A1 -B1 "faq-optimization" || true
    else
        echo "❌ No FAQ optimization cron job found"
        echo "💡 Run: npm run setup-cron to install"
    fi
    echo ""
}

# Function to check recent executions
check_recent_executions() {
    echo "📊 Recent execution logs..."
    echo "=========================="
    
    if [ -d "$LOG_DIR" ]; then
        local recent_logs=$(find "$LOG_DIR" -name "faq-optimization-*.log" -mtime -7 | sort -r | head -5)
        
        if [ -n "$recent_logs" ]; then
            echo "📄 Last 5 executions (past 7 days):"
            echo ""
            
            for log_file in $recent_logs; do
                local basename=$(basename "$log_file")
                local timestamp=$(echo "$basename" | sed 's/faq-optimization-\(.*\)\.log/\1/' | tr '_' ' ')
                local status="Unknown"
                
                if grep -q "Weekly optimization completed successfully" "$log_file"; then
                    status="✅ SUCCESS"
                elif grep -q "Weekly optimization completed with warnings" "$log_file"; then
                    status="⚠️ WARNING"
                elif grep -q "Weekly optimization failed" "$log_file"; then
                    status="❌ FAILED"
                fi
                
                echo "  $timestamp - $status"
                
                # Show last summary line
                local summary=$(tail -n 20 "$log_file" | grep -E "(Success Rate|Weekly optimization)" | tail -1)
                if [ -n "$summary" ]; then
                    echo "    $(echo "$summary" | sed 's/.*] //')"
                fi
                echo ""
            done
        else
            echo "📝 No recent execution logs found"
            echo "💡 This might be the first run or logs are older than 7 days"
        fi
    else
        echo "📁 Log directory does not exist: $LOG_DIR"
        echo "💡 Cron job may not have run yet"
    fi
    echo ""
}

# Function to check system health
check_system_health() {
    echo "🏥 System health check..."
    echo "========================"
    
    # Check Node.js
    if command -v node >/dev/null 2>&1; then
        echo "✅ Node.js: $(node --version)"
    else
        echo "❌ Node.js not found"
    fi
    
    # Check npm
    if command -v npm >/dev/null 2>&1; then
        echo "✅ npm: $(npm --version)"
    else
        echo "❌ npm not found"
    fi
    
    # Check project dependencies
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        echo "✅ package.json exists"
        
        cd "$PROJECT_ROOT"
        if npm list --depth=0 >/dev/null 2>&1; then
            echo "✅ Dependencies installed"
        else
            echo "⚠️ Some dependencies may be missing"
            echo "💡 Run: npm install"
        fi
    else
        echo "❌ package.json not found"
    fi
    
    # Check environment variables
    if [ -f "$PROJECT_ROOT/.env" ]; then
        echo "✅ .env file exists"
        
        # Check critical environment variables
        source "$PROJECT_ROOT/.env" 2>/dev/null || true
        
        if [ -n "$NEXT_OPENAI_API_KEY" ]; then
            echo "✅ OpenAI API key configured"
        else
            echo "⚠️ OpenAI API key not found"
        fi
        
        if [ -n "$GA4_PROPERTY_ID" ] && [ "$GA4_PROPERTY_ID" != "your-ga4-property-id" ]; then
            echo "✅ Google Analytics property ID configured"
        else
            echo "⚠️ Google Analytics property ID not configured"
        fi
    else
        echo "❌ .env file not found"
    fi
    
    echo ""
}

# Function to show disk usage
check_disk_usage() {
    echo "💾 Disk usage check..."
    echo "====================="
    
    # Check log directory size
    if [ -d "$LOG_DIR" ]; then
        local log_size=$(du -sh "$LOG_DIR" 2>/dev/null | cut -f1)
        echo "📁 Log directory size: $log_size"
        
        local log_count=$(find "$LOG_DIR" -name "*.log" | wc -l)
        echo "📄 Total log files: $log_count"
        
        local old_logs=$(find "$LOG_DIR" -name "*.log" -mtime +30 | wc -l)
        if [ "$old_logs" -gt 0 ]; then
            echo "🗑️ Old logs (>30 days): $old_logs"
            echo "💡 Consider running cleanup: find $LOG_DIR -name '*.log' -mtime +30 -delete"
        fi
    fi
    
    # Check available disk space
    local available_space=$(df -h "$PROJECT_ROOT" | awk 'NR==2 {print $4}')
    echo "💽 Available disk space: $available_space"
    
    echo ""
}

# Function to test FAQ optimization APIs
test_apis() {
    echo "🧪 Testing FAQ optimization APIs..."
    echo "=================================="
    
    cd "$PROJECT_ROOT"
    
    # Test if dev server is running
    if curl -s "http://localhost:3001/api/analytics/faq-metrics" >/dev/null 2>&1; then
        echo "✅ Development server is running"
        
        # Test each API endpoint
        local apis=(
            "faq-metrics:FAQ Metrics API"
            "search-queries:Search Queries API" 
            "optimization-report:Optimization Report API"
        )
        
        for api_info in "${apis[@]}"; do
            local endpoint=$(echo "$api_info" | cut -d':' -f1)
            local name=$(echo "$api_info" | cut -d':' -f2)
            
            if curl -s "http://localhost:3001/api/analytics/$endpoint" | grep -q '"success":true'; then
                echo "✅ $name working"
            else
                echo "❌ $name failed"
            fi
        done
    else
        echo "⚠️ Development server not running on port 3001"
        echo "💡 Start with: npm run dev"
    fi
    
    echo ""
}

# Function to show recommendations
show_recommendations() {
    echo "💡 Recommendations..."
    echo "===================="
    
    # Check if any recent failures
    if [ -d "$LOG_DIR" ]; then
        local recent_failures=$(find "$LOG_DIR" -name "faq-optimization-*.log" -mtime -7 -exec grep -l "Weekly optimization failed" {} \; | wc -l)
        
        if [ "$recent_failures" -gt 0 ]; then
            echo "⚠️ $recent_failures failed executions in the past week"
            echo "   → Check logs in: $LOG_DIR"
            echo "   → Consider adjusting cron schedule"
            echo ""
        fi
    fi
    
    # Check cron timing
    if crontab -l 2>/dev/null | grep -q "faq-optimization"; then
        local cron_line=$(crontab -l | grep "faq-optimization")
        local hour=$(echo "$cron_line" | awk '{print $2}')
        
        if [ "$hour" -ge 7 ] && [ "$hour" -le 22 ]; then
            echo "⚠️ Cron job runs during business hours ($hour:00)"
            echo "   → Consider running at night (2-6 AM) for better performance"
            echo ""
        fi
    fi
    
    # General recommendations
    echo "📋 General maintenance:"
    echo "   → Monitor logs weekly: ls -la $LOG_DIR"
    echo "   → Clean old logs monthly: find $LOG_DIR -name '*.log' -mtime +30 -delete"
    echo "   → Check system health monthly: ./scripts/cron/cron-health-check.sh"
    echo "   → Update dependencies monthly: npm update"
    echo ""
}

# Main execution
main() {
    echo "🔧 ADMI FAQ Optimization Health Check"
    echo "======================================"
    echo "Timestamp: $(date)"
    echo "Project: $PROJECT_ROOT"
    echo ""
    
    check_cron_status
    check_recent_executions
    check_system_health
    check_disk_usage
    test_apis
    show_recommendations
    
    echo "✅ Health check completed!"
    echo ""
    echo "🔗 Useful commands:"
    echo "   View logs: ls -la $LOG_DIR"
    echo "   Setup cron: ./scripts/cron/setup-cron.sh"
    echo "   Test manually: ./scripts/cron/weekly-faq-optimizer.sh"
    echo "   Remove cron: crontab -e"
}

# Run health check
main "$@"