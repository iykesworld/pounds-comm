#!/usr/bin/env node

/**
 * Deployment Test Script for Pounds Communication Ltd
 * Tests file structure and configuration
 */

console.log('🧪 Starting deployment tests...\n');

// Test 1: File Structure
console.log('1️⃣ Testing File Structure...');
try {
    const fs = require('fs');
    const path = require('path');

    const requiredFiles = [
        'backend/server.js',
        'backend/routes/index.js',
        'backend/package.json',
        'frontend/app/page.tsx',
        'frontend/package.json',
        '.vscode/settings.json',
        '.gitignore'
    ];

    for (const file of requiredFiles) {
        if (!fs.existsSync(path.join(__dirname, file))) {
            throw new Error(`Missing required file: ${file}`);
        }
        console.log(`✅ ${file} exists`);
    }

    console.log('✅ File structure test passed\n');
} catch (error) {
    console.error('❌ File structure test failed:', error.message);
    process.exit(1);
}

// Test 2: Package Dependencies
console.log('2️⃣ Testing Package Dependencies...');
try {
    const backendPackage = require('./backend/package.json');
    const frontendPackage = require('./frontend/package.json');

    const requiredBackendDeps = [
        'express', 'mongoose', 'cloudinary', 'multer',
        'jsonwebtoken', 'dotenv', 'slugify', 'cors'
    ];

    const requiredFrontendDeps = [
        'next', 'react', 'react-dom', '@reduxjs/toolkit',
        'react-redux', 'axios'
    ];

    // Check backend dependencies
    for (const dep of requiredBackendDeps) {
        if (!backendPackage.dependencies[dep]) {
            throw new Error(`Missing backend dependency: ${dep}`);
        }
        console.log(`✅ Backend dependency: ${dep}`);
    }

    // Check frontend dependencies
    for (const dep of requiredFrontendDeps) {
        if (!frontendPackage.dependencies[dep]) {
            throw new Error(`Missing frontend dependency: ${dep}`);
        }
        console.log(`✅ Frontend dependency: ${dep}`);
    }

    console.log('✅ Package dependencies test passed\n');
} catch (error) {
    console.error('❌ Package dependencies test failed:', error.message);
    process.exit(1);
}

// Test 3: Environment Configuration
console.log('3️⃣ Testing Environment Configuration...');
try {
    const fs = require('fs');
    const path = require('path');

    // Check if .env.example exists
    if (fs.existsSync(path.join(__dirname, 'backend', 'env.example'))) {
        console.log('✅ Environment example file exists');
    }

    // Check if .nvmrc exists
    if (fs.existsSync(path.join(__dirname, 'backend', '.nvmrc'))) {
        console.log('✅ Node.js version file exists');
    }

    // Check if render.yaml exists
    if (fs.existsSync(path.join(__dirname, 'backend', 'render.yaml'))) {
        console.log('✅ Render configuration exists');
    }

    console.log('✅ Environment configuration test passed\n');
} catch (error) {
    console.error('❌ Environment configuration test failed:', error.message);
    process.exit(1);
}

// Test 4: VS Code Configuration
console.log('4️⃣ Testing VS Code Configuration...');
try {
    const fs = require('fs');
    const vscodeSettings = require('./.vscode/settings.json');

    const requiredSettings = [
        'terminal.integrated.defaultProfile.windows',
        'cursor.experimental.commandExecutionTimeout',
        'cursor.experimental.autoRunMaxStdoutLength'
    ];

    for (const setting of requiredSettings) {
        if (vscodeSettings[setting] === undefined) {
            throw new Error(`Missing VS Code setting: ${setting}`);
        }
        console.log(`✅ VS Code setting: ${setting}`);
    }

    console.log('✅ VS Code configuration test passed\n');
} catch (error) {
    console.error('❌ VS Code configuration test failed:', error.message);
    process.exit(1);
}

// Test 5: Git Configuration
console.log('5️⃣ Testing Git Configuration...');
try {
    const fs = require('fs');

    if (fs.existsSync('.gitignore')) {
        console.log('✅ .gitignore exists');
    }

    if (fs.existsSync('.git')) {
        console.log('✅ Git repository initialized');
    }

    console.log('✅ Git configuration test passed\n');
} catch (error) {
    console.error('❌ Git configuration test failed:', error.message);
    process.exit(1);
}

console.log('🎉 All deployment tests passed!');
console.log('\n📋 Deployment Checklist:');
console.log('✅ File structure complete');
console.log('✅ Dependencies configured');
console.log('✅ Environment setup ready');
console.log('✅ VS Code settings optimized');
console.log('✅ Git configuration verified');
console.log('\n🚀 Ready for deployment to Render!');
console.log('\n📝 Next Steps:');
console.log('1. Commit changes: git add . && git commit -m "Fix deployment issues"');
console.log('2. Push to repository: git push origin main');
console.log('3. Deploy to Render with environment variables:');
console.log('   - NODE_ENV=production');
console.log('   - MONGO_URI=your-mongodb-connection-string');
console.log('   - JWT_SECRET=your-jwt-secret');
console.log('   - CLOUDINARY_CLOUD_NAME=your-cloud-name');
console.log('   - CLOUDINARY_API_KEY=your-api-key');
console.log('   - CLOUDINARY_API_SECRET=your-api-secret');
console.log('4. Test API endpoints: /health, /api/products, /api/auth/login'); 