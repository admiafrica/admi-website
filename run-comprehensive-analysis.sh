#!/bin/bash

# Comprehensive Campaign Analysis Runner
# Analyzes all paid and organic campaigns from Nov 29 - Jan 31, 2026
# Usage: ./run-comprehensive-analysis.sh

set -e

cd "$(dirname "$0")"

# Load environment
if [ -f .env ]; then
  export BREVO_API_KEY=$(grep "^BREVO_API_KEY=" .env | cut -d= -f2- | head -1 | tr -d ' ')
fi

if [ -z "$BREVO_API_KEY" ]; then
  echo "❌ BREVO_API_KEY not found in .env"
  exit 1
fi

echo "🚀 Running Comprehensive Campaign Analysis..."
echo "📊 Period: November 29, 2025 - January 31, 2026 (64 days)"
echo ""

# Run the analysis
node scripts/analytics/comprehensive-all-campaigns-jan2026.js

echo ""
echo "📄 Reports Generated:"
echo "  • JSON: reports/comprehensive-all-campaigns-jan2026.json"
echo "  • Summary: reports/COMPREHENSIVE-ALL-CAMPAIGNS-JAN2026.md"
echo ""
echo "✅ Analysis complete!"
