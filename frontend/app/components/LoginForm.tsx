"use client";
import { useState } from 'react';
import { useAppDispatch, useAppSelector, store } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('LoginForm - Starting login process...');
    console.log('LoginForm - Form data:', { email: form.email, password: '***' });

    try {
      const result = await dispatch(loginUser(form));
      console.log('LoginForm - Login result:', result);
      console.log('LoginForm - Request status:', result.meta.requestStatus);
      
      // Check if login was successful and get user role
      if (result.meta.requestStatus === 'fulfilled') {
        const user = result.payload?.user;
        const redirectTo = searchParams.get('redirect');
        
        console.log('LoginForm - User data:', user);
        console.log('LoginForm - User role:', user?.role);
        console.log('LoginForm - Redirect to:', redirectTo);
        console.log('LoginForm - Is admin check:', user?.role === 'admin');
        
        // Show redirect message
        if (redirectTo) {
          setRedirectMessage('Redirecting you back to the previous page...');
          console.log('LoginForm - Will redirect to original page:', redirectTo);
        } else if (user?.role === 'admin') {
          setRedirectMessage('Welcome, Admin! Redirecting to dashboard...');
          console.log('LoginForm - Will redirect admin to dashboard');
        } else {
          setRedirectMessage('Login successful! Redirecting to homepage...');
          console.log('LoginForm - Will redirect user to homepage');
        }
        
        // Use a more reliable approach - check Redux state after a short delay
        setTimeout(() => {
          console.log('LoginForm - Executing redirect...');
          
          // Get the latest state from Redux
          const currentState = store.getState();
          const currentIsAdmin = currentState.auth.isAdmin;
          const currentIsAuthenticated = currentState.auth.isAuthenticated;
          
          console.log('LoginForm - Current Redux state - isAuthenticated:', currentIsAuthenticated);
          console.log('LoginForm - Current Redux state - isAdmin:', currentIsAdmin);
          
          if (redirectTo) {
            // If redirected from another page, go back to original destination
            console.log('LoginForm - Redirecting to:', redirectTo);
            router.push(redirectTo);
          } else if (currentIsAdmin) {
            // Admin users go to admin dashboard
            console.log('LoginForm - Redirecting admin to /admin');
            router.push('/admin');
          } else {
            // Regular users go to homepage
            console.log('LoginForm - Redirecting user to /');
            router.push('/');
          }
        }, 1000);
      } else {
        console.log('LoginForm - Login failed:', result.payload);
      }
    } catch (err) {
      console.error('LoginForm - Login error:', err);
      // Error is handled by Redux slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your Pounds Communication account</p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-semibold">Note:</span> Admins will be redirected to the admin dashboard, while regular users will go to the homepage.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  validationErrors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:text-white'
                }`}
                placeholder="Enter your email"
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  validationErrors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:text-white'
                }`}
                placeholder="Enter your password"
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.password}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {redirectMessage && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                  <p className="text-sm text-green-600 dark:text-green-400">{redirectMessage}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !!redirectMessage}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : redirectMessage ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Redirecting...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                href="/auth/register" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
} 