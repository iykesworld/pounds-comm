"use client";
import { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { registerUser, registerAdminUser } from '../redux/slices/authSlice';

export default function UserForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (form.role === 'admin') {
        await dispatch(registerAdminUser({ name: form.name, email: form.email, password: form.password }));
      } else {
        await dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
      }
      setSuccess('User registered successfully');
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err: any) {
      setError('Failed to register user');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Register User</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring" />
        <select name="role" value={form.role} onChange={handleChange} className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400">{success}</div>}
      <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50">{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
} 