#!/bin/bash

echo "🧹 Cleaning deployment environment..."

# Remove node_modules and package-lock.json
rm -rf node_modules
rm -f package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "🧪 Testing server startup..."
node -e "
try {
  require('./server.js');
  console.log('✅ Server loads successfully');
} catch (error) {
  console.error('❌ Server load failed:', error.message);
  process.exit(1);
}
"

echo "🚀 Ready for deployment!" 