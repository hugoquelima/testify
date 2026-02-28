#!/bin/bash
# Test ConvertKit API Connection

echo "ConvertKit API Test Script"
echo "=========================="
echo ""
echo "This script will test if your ConvertKit API key works."
echo ""

# Ask for API Key
read -p "Enter your ConvertKit API Key: " API_KEY

# Ask for Form ID  
read -p "Enter your ConvertKit Form ID: " FORM_ID

echo ""
echo "Testing connection..."
echo ""

# Test the API
curl -s "https://api.convertkit.com/v3/forms?api_key=$API_KEY" | head -20

echo ""
echo "If you see data above, your API key works!"
echo ""
echo "Now testing form subscription..."
echo ""

# Test subscribing (optional - will add a test email)
read -p "Enter a test email to subscribe (or press Enter to skip): " TEST_EMAIL

if [ ! -z "$TEST_EMAIL" ]; then
  curl -s -X POST "https://api.convertkit.com/v3/forms/$FORM_ID/subscribe" \
    -H "Content-Type: application/json" \
    -d "{
      \"api_key\": \"$API_KEY\",
      \"email\": \"$TEST_EMAIL\",
      \"first_name\": \"Test\"
    }"
  
  echo ""
  echo "Check ConvertKit - $TEST_EMAIL should now be subscribed!"
fi

echo ""
echo "Done! ✅"
