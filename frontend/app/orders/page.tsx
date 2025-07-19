"use client";
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderSummary from '../components/OrderSummary';
import Link from 'next/link';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userOrders, loading, error } = useAppSelector((state) => state.orders);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [recentOrderId, setRecentOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/orders');
      return;
    }

    // Check if there's a recent order from checkout
    const newOrderId = searchParams.get('newOrder');
    if (newOrderId) {
      setRecentOrderId(newOrderId);
    }

    // Fetch user orders
    dispatch(fetchUserOrders());
  }, [dispatch, isAuthenticated, router, searchParams]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
            Your Orders
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your orders and view order history
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">Loading your orders...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
            <button 
              onClick={() => dispatch(fetchUserOrders())}
              className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : userOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Orders Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <OrderSummary 
                key={order._id} 
                order={order} 
                isRecent={recentOrderId === order._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 