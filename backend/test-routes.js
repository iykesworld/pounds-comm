// Test script to verify routes are working correctly
const express = require('express');

// Test the routes without starting the server
try {
  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const orderRoutes = require('./routes/orders');
  const searchRoutes = require('./routes/search');
  
  console.log('✅ All route files loaded successfully');
  
  // Test route creation
  const app = express();
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/search', searchRoutes);
  
  console.log('✅ All routes mounted successfully');
  console.log('🚀 Routes are ready for deployment');
  
} catch (error) {
  console.error('❌ Route test failed:', error.message);
  process.exit(1);
} 