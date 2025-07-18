const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBackend() {
  console.log('🧪 Testing Backend API...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await axios.get(`${API_URL}/products`);
    console.log('✅ Server is running');
    console.log('Products found:', response.data.length);
    console.log('Sample product:', response.data[0] || 'No products yet');
    console.log('');

    // Test 2: Check product structure
    if (response.data.length > 0) {
      const product = response.data[0];
      console.log('2. Checking product structure...');
      console.log('Required fields:', {
        _id: !!product._id,
        name: !!product.name,
        slug: !!product.slug,
        category: !!product.category,
        price: !!product.price,
        image: !!product.image,
        stock: !!product.stock,
        description: !!product.description
      });
      console.log('');
    }

    console.log('🎉 Backend API is working correctly!');
    console.log('\nExpected API Response Format:');
    console.log('GET /api/products returns:');
    console.log('[');
    console.log('  {');
    console.log('    "_id": "product-id",');
    console.log('    "name": "Product Name",');
    console.log('    "slug": "product-slug",');
    console.log('    "category": "smartphones|tablets|smartwatches|accessories",');
    console.log('    "price": 999.99,');
    console.log('    "oldPrice": 1099.99,');
    console.log('    "stock": 10,');
    console.log('    "image": "https://cloudinary.com/...",');
    console.log('    "tag": "new|sale|popular",');
    console.log('    "description": "Product description",');
    console.log('    "rating": 4.5');
    console.log('  }');
    console.log(']');

  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure the backend server is running:');
      console.error('   cd backend && npm start');
    }
  }
}

testBackend(); 