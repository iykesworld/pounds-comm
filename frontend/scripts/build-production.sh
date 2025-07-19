#!/bin/bash

# Production Build Script for Pounds Communication Ltd Frontend

echo "🚀 Starting production build..."

# Set environment variables
export NODE_ENV=production
export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-"https://your-backend-domain.com/api"}

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check build output
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: .next/"
    echo "🚀 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Optional: Export static files (if needed)
# echo "📤 Exporting static files..."
# npm run export

echo "🎉 Production build ready!" 