"use client";
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../components/AdminSidebar';
import { useAppSelector } from '../redux/store';
import { selectIsAdmin, selectIsAuthenticated, selectAuthInitialized } from '../redux/slices/authSlice';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectAuthInitialized);

  useEffect(() => {
    if (!isInitialized) return; // Wait for auth to be initialized

    console.log('AdminLayout - isAuthenticated:', isAuthenticated);
    console.log('AdminLayout - isAdmin:', isAdmin);
    
    if (!isAuthenticated) {
      console.log('AdminLayout - Redirecting to login (not authenticated)');
      router.push('/auth/login?redirect=/admin');
      return;
    }
    
    if (!isAdmin) {
      console.log('AdminLayout - Redirecting to homepage (not admin)');
      router.push('/');
      return;
    }
    
    console.log('AdminLayout - Access granted to admin dashboard');
  }, [isAuthenticated, isAdmin, router, isInitialized]);

  // Show loading while auth is being initialized or while checking permissions
  if (!isInitialized || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {!isInitialized ? 'Initializing...' : 'Checking permissions...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 bg-white dark:bg-gray-950 rounded-l-3xl shadow-xl">
        {children}
      </main>
    </div>
  );
} 