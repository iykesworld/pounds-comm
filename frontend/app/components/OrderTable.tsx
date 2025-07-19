"use client";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateOrderStatusThunk, fetchAllOrders, Order } from '../redux/slices/orderSlice';

const statusOptions = ['pending', 'shipped', 'delivered'] as const;

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { allOrders, loading, error } = useAppSelector((state) => state.orders);
  const [editStatus, setEditStatus] = useState<{ [id: string]: string }>({});
  const [saving, setSaving] = useState<string | null>(null);

  const handleStatusChange = (id: string, status: string) => {
    setEditStatus((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    await dispatch(updateOrderStatusThunk({ id, status: editStatus[id] }));
    setSaving(null);
    dispatch(fetchAllOrders());
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-800">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order: Order) => (
              <tr key={order._id} className="border-b border-gray-200 dark:border-gray-800">
                <td className="px-4 py-2 font-mono text-xs">{order._id}</td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{order.email || 'Guest'}</td>
                <td className="px-4 py-2">{order.phone || 'N/A'}</td>
                <td className="px-4 py-2 font-bold">NGN{order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <select
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                    value={editStatus[order._id] || order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSave(order._id)}
                    disabled={saving === order._id}
                    className="px-3 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {saving === order._id ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 