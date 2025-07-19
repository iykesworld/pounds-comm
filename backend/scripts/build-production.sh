#!/bin/bash

# Production Build Script for Pounds Communication Ltd Backend

echo "🚀 Starting backend production build..."

# Set environment variables
export NODE_ENV=production

# Check if required environment variables are set
if [ -z "$MONGO_URI" ]; then
    echo "❌ Error: MONGO_URI environment variable is required"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ Error: JWT_SECRET environment variable is required"
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf node_modules
rm -rf package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run security audit
echo "🔒 Running security audit..."
npm audit --audit-level=moderate

# Test database connection
echo "🗄️ Testing database connection..."
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log('✅ Database connection successful');
  process.exit(0);
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});
"

# Check if the test was successful
if [ $? -eq 0 ]; then
    echo "✅ Backend build completed successfully!"
    echo "🚀 Ready for deployment!"
else
    echo "❌ Backend build failed!"
    exit 1
fi

echo "🎉 Backend production build ready!" 