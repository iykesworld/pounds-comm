import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
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

export const getAllProducts = () =>
  api.get('/products');

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
