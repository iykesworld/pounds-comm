"use client";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleUserRoleApi } from '../../redux/services/api';
import UserForm from '../../components/UserForm';

type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock fetch users logic — replace with Redux or API call
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleRole = async (user: User) => {
    try {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      await toggleUserRoleApi({ userId: user._id, role: newRole });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        )
      );
    } catch (err) {
      alert('Error toggling role');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-6">User Management</h1>
      <UserForm />
      <div className="overflow-x-auto mt-8">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-blue-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Toggle Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-2 font-semibold">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleToggleRole(user)}
                      className={`px-3 py-1 rounded font-bold transition ${
                        user.role === 'admin'
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
