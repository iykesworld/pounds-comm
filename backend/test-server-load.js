#!/usr/bin/env node

console.log('🧪 Testing server load...');

try {
    // Test if all required modules can be loaded
    console.log('📦 Loading dependencies...');

    const express = require('express');
    console.log('✅ Express loaded');

    const helmet = require('helmet');
    console.log('✅ Helmet loaded');

    const cors = require('cors');
    console.log('✅ CORS loaded');

    const compression = require('compression');
    console.log('✅ Compression loaded');

    const morgan = require('morgan');
    console.log('✅ Morgan loaded');

    // Test route imports
    console.log('📡 Loading routes...');

    const authRoutes = require('./routes/auth');
    console.log('✅ Auth routes loaded');

    const productRoutes = require('./routes/products');
    console.log('✅ Product routes loaded');

    const orderRoutes = require('./routes/orders');
    console.log('✅ Order routes loaded');

    const searchRoutes = require('./routes/search');
    console.log('✅ Search routes loaded');

    // Test server creation
    console.log('🚀 Creating server...');
    const app = express();

    // Test middleware
    app.use(cors());
    app.use(compression());
    app.use(express.json());

    // Test route mounting
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/search', searchRoutes);

    console.log('✅ All routes mounted successfully');
    console.log('🎉 Server load test passed!');

} catch (error) {
    console.error('❌ Server load test failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
} 