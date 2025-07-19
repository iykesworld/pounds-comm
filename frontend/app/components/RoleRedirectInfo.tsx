"use client";
import { useAppSelector } from '../redux/store';
import { selectUser, selectIsAdmin, selectIsAuthenticated } from '../redux/slices/authSlice';

export default function RoleRedirectInfo() {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-800 max-w-sm z-40">
      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Current User Info</h3>
      <div className="space-y-1 text-sm">
        <p><span className="font-semibold">Name:</span> {user?.name}</p>
        <p><span className="font-semibold">Email:</span> {user?.email}</p>
        <p><span className="font-semibold">Role:</span> 
          <span className={`ml-1 px-2 py-0.5 rounded text-xs font-semibold ${
            isAdmin 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' 
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
          }`}>
            {user?.role}
          </span>
        </p>
        <p><span className="font-semibold">Access Level:</span> 
          <span className={`ml-1 px-2 py-0.5 rounded text-xs font-semibold ${
            isAdmin 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
          }`}>
            {isAdmin ? 'Admin Dashboard' : 'User Access'}
          </span>
        </p>
      </div>
      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
        <p><span className="font-semibold">Next Login:</span> {isAdmin ? 'Admin Dashboard (/admin)' : 'Homepage (/)'}</p>
      </div>
    </div>
  );
} 