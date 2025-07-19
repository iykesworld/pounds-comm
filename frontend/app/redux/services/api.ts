import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout - server may be down'));
    }
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) => {
  console.log('api - Login request to:', `${API_URL}/auth/login`);
  console.log('api - Login data:', { email: data.email, password: '***' });
  return api.post('/auth/login', data);
};

export const adminRegister = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/admin/register', data);

// ✅ Toggle Role (renamed as toggleUserRoleApi)
export const toggleUserRoleApi = (data: { userId: string; role: 'user' | 'admin' }) =>
  api.put('/auth/toggle-role', data);

// Products
export const createProduct = (data: FormData) =>
  api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });

export const updateProduct = (id: string, data: FormData) =>
  api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`);

export const getProduct = (slug: string) =>
  api.get(`/products/${slug}`);

export const getAllProducts = () => {
  console.log('API: Fetching all products from:', `${API_URL}/products`);
  return api.get('/products');
};

export const getByCategory = (category: string) =>
  api.get(`/products/categories/${category}`);

export const searchProducts = (query: string) =>
  api.get(`/search?q=${encodeURIComponent(query)}`);

// Orders
export const createOrder = (data: any) =>
  api.post('/orders', data);

export const getUserOrders = () =>
  api.get('/orders');

export const getAllOrders = () =>
  api.get('/orders/all');

export const updateOrderStatus = (id: string, status: string) =>
  api.put(`/orders/${id}`, { status });

export default api;
