#!/bin/bash

# Local Schema Testing Script
# Usage: ./scripts/test-schema.sh [course-slug]

COURSE_SLUG=${1:-"sound-engineering-diploma"}
LOCAL_URL="http://localhost:3000/courses/$COURSE_SLUG"

echo "🔍 Testing Schema for: $LOCAL_URL"
echo "================================================"

# Check if local server is running
if ! curl -s --head "$LOCAL_URL" | head -n 1 | grep -q "200 OK"; then
    echo "❌ Local server not running or page not found"
    echo "💡 Start with: npm run dev"
    exit 1
fi

echo "✅ Local server is running"

# Extract HTML and look for JSON-LD
echo "📋 Extracting Schema Markup..."

# Create temp file for HTML
TEMP_FILE=$(mktemp)
curl -s "$LOCAL_URL" > "$TEMP_FILE"

# Extract JSON-LD scripts
echo "🎯 Found JSON-LD Scripts:"
grep -o '<script[^>]*type="application/ld+json"[^>]*>.*</script>' "$TEMP_FILE" | \
while IFS= read -r script; do
    # Extract the JSON content
    json_content=$(echo "$script" | sed 's/<script[^>]*>//g' | sed 's/<\/script>//g')
    
    # Try to parse and pretty print
    if echo "$json_content" | jq . > /dev/null 2>&1; then
        echo "✅ Valid JSON-LD found:"
        echo "$json_content" | jq .
        echo "---"
        
        # Check for Course type
        if echo "$json_content" | jq -e '.["@type"] == "Course"' > /dev/null 2>&1; then
            echo "📚 Course Schema Validation:"
            
            # Check for removed properties
            if echo "$json_content" | jq -e '.creditHours' > /dev/null 2>&1; then
                echo "❌ Found creditHours property (should be removed)"
            else
                echo "✅ creditHours property correctly removed"
            fi
            
            if echo "$json_content" | jq -e '.hasCourseInstance.instructor' > /dev/null 2>&1; then
                echo "❌ Found instructor property (should be removed)"
            else
                echo "✅ instructor property correctly removed"
            fi
            
            # Check required properties
            required_props=("@context" "@type" "name" "description" "provider")
            for prop in "${required_props[@]}"; do
                if echo "$json_content" | jq -e ".\"$prop\"" > /dev/null 2>&1; then
                    echo "✅ Required property '$prop' present"
                else
                    echo "❌ Missing required property '$prop'"
                fi
            done
        fi
    else
        echo "❌ Invalid JSON-LD:"
        echo "$json_content"
    fi
    echo "================================================"
done

# Cleanup
rm "$TEMP_FILE"

echo "🎯 Testing Complete!"
echo ""
echo "💡 Next Steps:"
echo "1. Copy any JSON-LD output above"
echo "2. Paste into https://validator.schema.org/"
echo "3. Or use Google Rich Results Test: https://search.google.com/test/rich-results"
