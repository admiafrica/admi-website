#!/bin/bash

# Add Course Benefits to Certificate in Data Analysis Course
# Creates 4 benefit entries and links them to the course

export TOKEN="CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs"
SPACE_ID="qtu3mga6n6gc"
ENV="master"
COURSE_ID="78CwDqUzJv4QKo3wVAs9h8"

# Icon IDs from existing benefits
declare -a ICON_IDS=(
  "3tBKb7pN4M8hYqZ1vPxR2q"
  "32ec3Jmj5WNio82cbeJ2Pf"
  "4ATO3TNfGHddpnZ5MG85T0"
  "54MFcQfBvHYoW6j4vu49W6"
)

# Benefit data
declare -a BENEFIT_TITLES=(
  "Industry-Recognized Certificate"
  "85%+ Job Placement Rate"
  "Real-World Projects"
  "Expert Mentor Support"
)

declare -a BENEFIT_TEXTS=(
  "Earn a credential valued by leading employers in Kenya and East Africa. Get recognized for mastering data analysis and visualization tools used in real-world analytics teams."
  "Direct access to employers actively hiring data analysts. Our structured placement support and internship partnerships ensure career acceleration for our graduates."
  "Build a professional portfolio through hands-on projects using real datasets and industry tools like Power BI and Tableau. Showcase your work to potential employers."
  "Learn from industry practitioners with 5+ years of experience. Get personalized guidance on technical skills, portfolio development, and interview preparation."
)

echo "🚀 Creating Course Benefits"
echo "Space: $SPACE_ID | Environment: $ENV"
echo ""

BENEFIT_IDS=()

# Create each benefit
for i in {0..3}; do
  TITLE="${BENEFIT_TITLES[$i]}"
  TEXT="${BENEFIT_TEXTS[$i]}"
  ICON="${ICON_IDS[$i]}"
  
  echo "📝 Creating benefit $((i+1)): \"$TITLE\"..."
  
  # Create the entry
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/vnd.contentful.management.v1+json" \
    -H "X-Contentful-Content-Type: courseBenefit" \
    -d "{
      \"fields\": {
        \"title\": {
          \"en-US\": \"$TITLE\"
        },
        \"text\": {
          \"en-US\": {
            \"nodeType\": \"document\",
            \"data\": {},
            \"content\": [{
              \"nodeType\": \"paragraph\",
              \"data\": {},
              \"content\": [{
                \"nodeType\": \"text\",
                \"value\": \"$TEXT\",
                \"marks\": [],
                \"data\": {}
              }]
            }]
          }
        },
        \"icon\": {
          \"en-US\": {
            \"sys\": {
              \"type\": \"Link\",
              \"linkType\": \"Asset\",
              \"id\": \"$ICON\"
            }
          }
        }
      }
    }" \
    "https://api.contentful.com/spaces/$SPACE_ID/environments/$ENV/entries")
  
  ENTRY_ID=$(echo "$RESPONSE" | jq -r '.sys.id')
  VERSION=$(echo "$RESPONSE" | jq -r '.sys.version')
  
  if [ "$ENTRY_ID" = "null" ] || [ -z "$ENTRY_ID" ]; then
    echo "❌ Failed to create entry"
    echo "$RESPONSE" | jq '.'
    exit 1
  fi
  
  echo "✅ Created: $ENTRY_ID"
  BENEFIT_IDS+=("$ENTRY_ID")
  
  # Publish the entry
  echo "   Publishing..."
  PUB_RESPONSE=$(curl -s -X PUT \
    -H "Authorization: Bearer $TOKEN" \
    -H "X-Contentful-Version: $VERSION" \
    "https://api.contentful.com/spaces/$SPACE_ID/environments/$ENV/entries/$ENTRY_ID/published")
  
  PUB_VERSION=$(echo "$PUB_RESPONSE" | jq -r '.sys.version')
  if [ "$PUB_VERSION" = "null" ]; then
    echo "⚠️  Publishing failed (may already be published)"
  else
    echo "✅ Published"
  fi
done

echo ""
echo "🔗 Linking benefits to course..."

# Fetch the current course version
COURSE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.contentful.com/spaces/$SPACE_ID/environments/$ENV/entries/$COURSE_ID")

COURSE_VERSION=$(echo "$COURSE_RESPONSE" | jq -r '.sys.version')

# Build the benefits array
BENEFITS_JSON=$(printf '%s\n' "${BENEFIT_IDS[@]}" | jq -Rs 'split("\n")[:-1] | map({"sys": {"type": "Link", "linkType": "Entry", "id": .}})' | tr -d '\n')

# Get current fields
CURRENT_FIELDS=$(echo "$COURSE_RESPONSE" | jq '.fields')

# Add benefits to fields
UPDATED_FIELDS=$(echo "$CURRENT_FIELDS" | jq --argjson benefits "$BENEFITS_JSON" '.courseBenefits = {"en-US": $benefits}')

# Update course
UPDATE_RESPONSE=$(curl -s -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Version: $COURSE_VERSION" \
  -d "{\"fields\": $UPDATED_FIELDS}" \
  "https://api.contentful.com/spaces/$SPACE_ID/environments/$ENV/entries/$COURSE_ID")

NEW_VERSION=$(echo "$UPDATE_RESPONSE" | jq -r '.sys.version')
if [ "$NEW_VERSION" = "null" ]; then
  echo "❌ Failed to update course"
  echo "$UPDATE_RESPONSE" | jq '.'
  exit 1
fi

echo "✅ Course updated with benefits (version: $NEW_VERSION)"

# Publish the updated course
echo "   Publishing updated course..."
PUB_COURSE=$(curl -s -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Contentful-Version: $NEW_VERSION" \
  "https://api.contentful.com/spaces/$SPACE_ID/environments/$ENV/entries/$COURSE_ID/published")

FINAL_VERSION=$(echo "$PUB_COURSE" | jq -r '.sys.version')
if [ "$FINAL_VERSION" = "null" ]; then
  echo "⚠️  Course publishing failed"
else
  echo "✅ Published updated course"
fi

echo ""
echo "✨ All done! Course benefits have been added successfully."
echo ""
echo "📚 Created benefits:"
for i in {0..3}; do
  echo "  $((i+1)). ${BENEFIT_TITLES[$i]} (${BENEFIT_IDS[$i]})"
done
echo ""
echo "🔗 Course URL: https://admi.africa/courses/certificate-data-analysis-presentation"
