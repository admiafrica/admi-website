#!/bin/bash

# Setup Cron Jobs for ADMI FAQ Optimization
# This script helps you configure automated FAQ optimization

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo "🔧 ADMI FAQ Optimization Cron Setup"
echo "===================================="
echo ""

# Function to check if cron is available
check_cron() {
    if ! command -v crontab >/dev/null 2>&1; then
        echo "❌ crontab command not found. Please install cron first."
        exit 1
    fi
    echo "✅ cron service is available"
}

# Function to display current crontab
show_current_cron() {
    echo "📋 Current crontab entries:"
    echo "----------------------------"
    if crontab -l 2>/dev/null | grep -q "faq-optimization"; then
        crontab -l | grep "faq-optimization" || echo "No FAQ optimization cron jobs found"
    else
        echo "No FAQ optimization cron jobs found"
    fi
    echo ""
}

# Function to create cron entry
create_cron_entry() {
    local schedule="$1"
    local description="$2"
    
    local cron_entry="$schedule cd $PROJECT_ROOT && $SCRIPT_DIR/weekly-faq-optimizer.sh >> $PROJECT_ROOT/logs/cron/cron-output.log 2>&1"
    
    echo "📝 Proposed cron entry:"
    echo "Schedule: $description"
    echo "Command: $cron_entry"
    echo ""
    
    # Backup existing crontab
    crontab -l 2>/dev/null > /tmp/crontab_backup || touch /tmp/crontab_backup
    
    # Add new entry (remove any existing FAQ optimization entries first)
    (crontab -l 2>/dev/null | grep -v "faq-optimization" || true; echo "# ADMI FAQ Optimization"; echo "$cron_entry") | crontab -
    
    echo "✅ Cron job installed successfully!"
}

# Function to test the script
test_script() {
    echo "🧪 Testing the optimization script..."
    echo "-----------------------------------"
    
    if [ -x "$SCRIPT_DIR/weekly-faq-optimizer.sh" ]; then
        echo "✅ Script is executable"
    else
        echo "❌ Script is not executable. Making it executable..."
        chmod +x "$SCRIPT_DIR/weekly-faq-optimizer.sh"
    fi
    
    echo ""
    echo "🚀 Running a test execution (this may take a few minutes)..."
    echo "Check the output below for any issues:"
    echo ""
    
    # Run the script in test mode
    "$SCRIPT_DIR/weekly-faq-optimizer.sh"
    
    echo ""
    echo "✅ Test execution completed. Check the logs for details."
}

# Function to remove cron jobs
remove_cron() {
    echo "🗑️  Removing FAQ optimization cron jobs..."
    
    # Backup existing crontab
    crontab -l 2>/dev/null > /tmp/crontab_backup || touch /tmp/crontab_backup
    
    # Remove FAQ optimization entries
    crontab -l 2>/dev/null | grep -v "faq-optimization" | grep -v "ADMI FAQ Optimization" | crontab - || true
    
    echo "✅ FAQ optimization cron jobs removed"
}

# Main menu
main_menu() {
    echo "Please choose an option:"
    echo ""
    echo "1) ⏰ Install weekly cron job (Monday 6:00 AM)"
    echo "2) ⏰ Install daily cron job (Every day 2:00 AM)" 
    echo "3) ⏰ Install custom schedule"
    echo "4) 🧪 Test the optimization script"
    echo "5) 👀 View current cron jobs"
    echo "6) 🗑️  Remove all FAQ optimization cron jobs"
    echo "7) 📖 Show cron schedule examples"
    echo "8) ❌ Exit"
    echo ""
    read -p "Enter your choice (1-8): " choice
    
    case $choice in
        1)
            create_cron_entry "0 6 * * 1" "Every Monday at 6:00 AM"
            ;;
        2)
            create_cron_entry "0 2 * * *" "Every day at 2:00 AM"
            ;;
        3)
            echo ""
            echo "📖 Cron schedule format: minute hour day month weekday"
            echo "Examples:"
            echo "  0 6 * * 1    = Monday 6:00 AM"
            echo "  0 2 * * *    = Every day 2:00 AM"
            echo "  0 6 * * 0,6  = Sunday and Saturday 6:00 AM"
            echo "  0 */6 * * *  = Every 6 hours"
            echo ""
            read -p "Enter custom cron schedule: " custom_schedule
            read -p "Enter description: " custom_description
            create_cron_entry "$custom_schedule" "$custom_description"
            ;;
        4)
            test_script
            ;;
        5)
            show_current_cron
            ;;
        6)
            remove_cron
            ;;
        7)
            echo ""
            echo "📖 Cron Schedule Examples:"
            echo "=========================="
            echo "0 6 * * 1      # Monday 6:00 AM (Recommended)"
            echo "0 2 * * *      # Every day 2:00 AM"  
            echo "0 6 * * 0      # Sunday 6:00 AM"
            echo "0 */12 * * *   # Every 12 hours"
            echo "0 6 1 * *      # First day of month 6:00 AM"
            echo "0 6 * * 1-5    # Weekdays 6:00 AM"
            echo ""
            echo "Format: minute hour day month weekday"
            echo "- minute: 0-59"
            echo "- hour: 0-23"  
            echo "- day: 1-31"
            echo "- month: 1-12"
            echo "- weekday: 0-7 (0 and 7 are Sunday)"
            echo ""
            ;;
        8)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please try again."
            echo ""
            ;;
    esac
}

# Create necessary directories
mkdir -p "$PROJECT_ROOT/logs/cron"

# Check prerequisites
check_cron

# Show current status
show_current_cron

# Main execution loop
while true; do
    main_menu
    echo ""
    read -p "Press Enter to continue or Ctrl+C to exit..."
    echo ""
done