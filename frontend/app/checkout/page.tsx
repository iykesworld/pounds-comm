"use client";
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { createOrderThunk } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const [form, setForm] = useState({ address: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!form.address || !form.email || !form.phone) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }
    try {
      const result = await dispatch(createOrderThunk({
        products: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        totalPrice,
        address: form.address,
        email: form.email,
        phone: form.phone,
      }));
      dispatch(clearCart());
      // Redirect to orders page with the new order ID to highlight it
      const newOrderId = result.payload?._id;
      router.push(newOrderId ? `/orders?newOrder=${newOrderId}` : '/orders');
    } catch (err: any) {
      setError('Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50">{loading ? 'Placing Order...' : 'Place Order'}</button>
      </form>
      <div className="mt-8 bg-blue-50 dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <ul className="mb-4">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
} 