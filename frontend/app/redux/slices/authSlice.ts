import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, register, adminRegister, toggleUserRoleApi } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
  initialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('authSlice - Making login request with:', { email: data.email });
      const res = await login(data);
      console.log('authSlice - Backend response:', res.data);
      console.log('authSlice - User role from backend:', res.data.user?.role);
      return res.data;
    } catch (err: any) {
      console.error('authSlice - Login error:', err);
      console.error('authSlice - Error response:', err.response?.data);
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await register(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const registerAdminUser = createAsyncThunk(
  'auth/adminRegister',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await adminRegister(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Admin registration failed');
    }
  }
);

export const toggleUserRole = createAsyncThunk(
  'auth/toggleUserRole',
  async (data: { userId: string; role: 'user' | 'admin' }, { rejectWithValue }) => {
    try {
      const res = await toggleUserRoleApi(data);
      return res.data; // expect updated user object
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Role update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
    initializeAuth(state) {
      if (typeof window !== 'undefined') {
        try {
          const user = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          
          if (user && token) {
            const parsedUser = JSON.parse(user);
            state.user = parsedUser;
            state.token = token;
            state.isAuthenticated = true;
            state.isAdmin = parsedUser.role === 'admin';
          }
        } catch (error) {
          console.error('Error initializing auth from localStorage:', error);
          // Clear invalid data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log('authSlice - Login fulfilled with payload:', action.payload);
        console.log('authSlice - Setting user role:', action.payload.user?.role);
        console.log('authSlice - Setting isAdmin:', action.payload.user?.role === 'admin');
        
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
        
        console.log('authSlice - Final state - isAuthenticated:', state.isAuthenticated);
        console.log('authSlice - Final state - isAdmin:', state.isAdmin);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
          console.log('authSlice - Saved to localStorage');
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdminUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerAdminUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserRole.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the current user if the toggled user is the logged-in user
        if (state.user && state.user.id === updatedUser.id) {
          state.user.role = updatedUser.role;
          state.isAdmin = updatedUser.role === 'admin';
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(state.user));
          }
        }
      })
      .addCase(toggleUserRole.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectIsAdmin = (state: { auth: AuthState }) => state.auth.isAdmin;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthInitialized = (state: { auth: AuthState }) => state.auth.initialized;

export default authSlice.reducer;
