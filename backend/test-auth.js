const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAuth() {
  console.log('🧪 Testing Auth API...\n');

  try {
    // Test 1: Register a regular user
    console.log('1. Testing user registration...');
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    };
    
    const registerResponse = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('✅ User registered successfully');
    console.log('User data:', registerResponse.data.user);
    console.log('Role:', registerResponse.data.user.role);
    console.log('');

    // Test 2: Register an admin user
    console.log('2. Testing admin registration...');
    const adminData = {
      name: 'Test Admin',
      email: 'testadmin@example.com',
      password: 'password123'
    };
    
    const adminRegisterResponse = await axios.post(`${API_URL}/auth/admin/register`, adminData);
    console.log('✅ Admin registered successfully');
    console.log('Admin data:', adminRegisterResponse.data.user);
    console.log('Role:', adminRegisterResponse.data.user.role);
    console.log('');

    // Test 3: Login as regular user
    console.log('3. Testing user login...');
    const userLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('✅ User login successful');
    console.log('User data:', userLoginResponse.data.user);
    console.log('Role:', userLoginResponse.data.user.role);
    console.log('Token:', userLoginResponse.data.token ? 'Present' : 'Missing');
    console.log('');

    // Test 4: Login as admin user
    console.log('4. Testing admin login...');
    const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'testadmin@example.com',
      password: 'password123'
    });
    console.log('✅ Admin login successful');
    console.log('Admin data:', adminLoginResponse.data.user);
    console.log('Role:', adminLoginResponse.data.user.role);
    console.log('Token:', adminLoginResponse.data.token ? 'Present' : 'Missing');
    console.log('');

    // Test 5: Test invalid credentials
    console.log('5. Testing invalid credentials...');
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      });
      console.log('❌ Should have failed with invalid credentials');
    } catch (error) {
      console.log('✅ Invalid credentials properly rejected');
      console.log('Error message:', error.response?.data?.message);
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\nExpected API Response Format:');
    console.log('{');
    console.log('  "token": "jwt-token",');
    console.log('  "user": {');
    console.log('    "id": "user-id",');
    console.log('    "name": "User Name",');
    console.log('    "email": "user@example.com",');
    console.log('    "role": "user" | "admin"');
    console.log('  }');
    console.log('}');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testAuth(); 