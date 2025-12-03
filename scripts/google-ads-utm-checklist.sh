#!/bin/bash

# Google Ads UTM Implementation Checklist
# Run this after updating your Google Ads tracking templates

echo "=================================================="
echo "🎯 GOOGLE ADS UTM IMPLEMENTATION CHECKLIST"
echo "=================================================="
echo ""

echo "📋 STEP 1: Update Campaign Tracking Templates"
echo "------------------------------------------------"
echo ""
echo "Performance Max Campaign: 'Website traffic-Performance Max-Jan'"
echo "Tracking template to add:"
echo ""
echo "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic&utm_term={keyword}&utm_content={creative}&gclid={gclid}"
echo ""
echo "✅ Done? (y/n): "
read pmax_done
echo ""

echo "Search Campaign: 'ADMI Search Jan 2026'"
echo "Tracking template to add:"
echo ""
echo "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=search-jan2026-admi&utm_term={keyword}&utm_content={creative}&gclid={gclid}"
echo ""
echo "✅ Done? (y/n): "
read search_done
echo ""

echo "=================================================="
echo "📋 STEP 2: Test Click Tracking"
echo "=================================================="
echo ""
echo "1. Click on a Performance Max ad"
echo "2. Check the URL contains: utm_campaign=pmax-jan2026-traffic"
echo "3. Click on a Search ad"
echo "4. Check the URL contains: utm_campaign=search-jan2026-admi"
echo ""
echo "✅ URLs contain correct UTM parameters? (y/n): "
read utm_test
echo ""

echo "=================================================="
echo "📋 STEP 3: Verify Brevo Integration"
echo "=================================================="
echo ""
echo "Running journey analysis to verify campaign detection..."
echo ""

cd /Users/wilfred/admi-website
npm run ads:journey

echo ""
echo "✅ Do you see both campaigns detected correctly? (y/n): "
read brevo_test
echo ""

echo "=================================================="
echo "📋 STEP 4: Customer List Segmentation"
echo "=================================================="
echo ""
echo "Current: 1 list with 25,000 contacts"
echo "Recommended: 4 segmented lists"
echo ""
echo "Lists to create in Google Ads:"
echo "  1. Enrolled Students (~500) - EXCLUDE from ads"
echo "  2. Hot Leads Score 15+ (~22) - Similar audience + retarget"
echo "  3. Warm/Cold Leads 5-14 (~5) - Retarget with different messaging"
echo "  4. Unqualified <5 (~3,617) - EXCLUDE from ads"
echo ""
echo "✅ Want to generate segmented CSV files? (y/n): "
read segment_test

if [ "$segment_test" = "y" ]; then
  echo ""
  echo "Generating segmented customer lists..."
  node -e "
  const fs = require('fs');
  const report = JSON.parse(fs.readFileSync('reports/google-ads/brevo-google-ads-journey-2025-12-01.json'));
  
  const allLeads = report.allGoogleAdsLeads.leads;
  
  const hotLeads = allLeads.filter(l => l.leadScore >= 15);
  const warmLeads = allLeads.filter(l => l.leadScore >= 10 && l.leadScore < 15);
  const coldLeads = allLeads.filter(l => l.leadScore >= 5 && l.leadScore < 10);
  const unqualified = allLeads.filter(l => l.leadScore < 5);
  
  console.log('Hot Leads (15+):', hotLeads.length);
  console.log('Warm Leads (10-14):', warmLeads.length);
  console.log('Cold Leads (5-9):', coldLeads.length);
  console.log('Unqualified (<5):', unqualified.length);
  "
fi

echo ""
echo "=================================================="
echo "📋 STEP 5: Immediate Actions"
echo "=================================================="
echo ""
echo "🔥 HOT LEAD - CALL TODAY:"
echo "  Name: Cynthia Lukui"
echo "  Phone: +254 116 358 552"
echo "  Course: Video Production Certificate"
echo "  Score: 16/20"
echo "  Timeline: January 2026 (IMMEDIATE)"
echo ""
echo "✅ Called Cynthia? (y/n): "
read cynthia_call
echo ""

echo "=================================================="
echo "📊 IMPLEMENTATION SUMMARY"
echo "=================================================="
echo ""

all_done="true"

if [ "$pmax_done" != "y" ]; then
  echo "❌ Performance Max tracking template - NOT DONE"
  all_done="false"
else
  echo "✅ Performance Max tracking template - DONE"
fi

if [ "$search_done" != "y" ]; then
  echo "❌ Search campaign tracking template - NOT DONE"
  all_done="false"
else
  echo "✅ Search campaign tracking template - DONE"
fi

if [ "$utm_test" != "y" ]; then
  echo "❌ UTM parameter testing - NOT DONE"
  all_done="false"
else
  echo "✅ UTM parameter testing - DONE"
fi

if [ "$brevo_test" != "y" ]; then
  echo "❌ Brevo campaign detection - NOT DONE"
  all_done="false"
else
  echo "✅ Brevo campaign detection - DONE"
fi

if [ "$cynthia_call" != "y" ]; then
  echo "🔥 Cynthia call - PENDING (DO THIS TODAY!)"
else
  echo "✅ Cynthia call - DONE"
fi

echo ""
echo "=================================================="

if [ "$all_done" = "true" ]; then
  echo "🎉 ALL CRITICAL STEPS COMPLETE!"
  echo ""
  echo "Next steps:"
  echo "  1. Monitor leads daily: npm run ads:journey"
  echo "  2. Scale Performance Max budget ($20/day → $40/day)"
  echo "  3. Review GOOGLE-ADS-UTM-TAGGING-GUIDE.md for optimization"
else
  echo "⚠️  INCOMPLETE SETUP - Review checklist above"
  echo ""
  echo "Critical tasks remaining:"
  if [ "$pmax_done" != "y" ]; then
    echo "  - Add Performance Max tracking template"
  fi
  if [ "$search_done" != "y" ]; then
    echo "  - Add Search campaign tracking template"
  fi
  if [ "$cynthia_call" != "y" ]; then
    echo "  - CALL CYNTHIA TODAY! (+254 116 358 552)"
  fi
fi

echo "=================================================="
echo ""
