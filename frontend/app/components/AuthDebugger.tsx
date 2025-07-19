"use client";
import { useAppSelector } from '../redux/store';
import { selectUser, selectIsAdmin, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../redux/slices/authSlice';

export default function AuthDebugger() {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-800 max-w-sm z-50">
      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-sm">Auth Debugger</h3>
      <div className="space-y-1 text-xs">
        <p><span className="font-semibold">Loading:</span> {loading ? 'Yes' : 'No'}</p>
        <p><span className="font-semibold">Authenticated:</span> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><span className="font-semibold">Is Admin:</span> {isAdmin ? 'Yes' : 'No'}</p>
        {user && (
          <>
            <p><span className="font-semibold">User:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
          </>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400"><span className="font-semibold">Error:</span> {error}</p>
        )}
      </div>
      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
        <p><span className="font-semibold">Next Login:</span> {isAdmin ? '/admin' : '/'}</p>
      </div>
    </div>
  );
} 