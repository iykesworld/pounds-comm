"use client";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchAllOrders } from '../redux/slices/orderSlice';
import { fetchProducts } from '../redux/slices/productsSlice';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { allOrders, loading: ordersLoading } = useAppSelector((state) => state.orders);
  const { products, loading: productsLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter((o) => o.status === 'pending').length;
  const totalProducts = products.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">{ordersLoading ? '...' : totalOrders}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Total Orders</span>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-yellow-500">{ordersLoading ? '...' : pendingOrders}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Pending Orders</span>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-green-600 dark:text-green-400">{productsLoading ? '...' : totalProducts}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Total Products</span>
      </div>
    </div>
  );
} 