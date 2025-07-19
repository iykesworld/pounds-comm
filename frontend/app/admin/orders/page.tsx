"use client";
import OrderTable from '../../components/OrderTable';

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-6">Order Management</h1>
      <OrderTable />
    </div>
  );
} 