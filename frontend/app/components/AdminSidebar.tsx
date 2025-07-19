"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const links = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Orders', href: '/admin/orders' },
  { name: 'Products', href: '/admin/products' },
  { name: 'Users', href: '/admin/users' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <aside className="w-56 min-h-screen bg-blue-700 dark:bg-gray-900 text-white flex flex-col py-8 px-4 shadow-2xl rounded-r-3xl">
      <div className="mb-10 text-2xl font-extrabold tracking-tight text-center font-mono">Admin Panel</div>
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-4 py-2 rounded-lg font-semibold transition text-lg ${pathname === link.href ? 'bg-white text-blue-700 dark:bg-gray-100 dark:text-blue-700 shadow' : 'hover:bg-blue-600 dark:hover:bg-gray-800'}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-10 w-full py-2 rounded-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        aria-label="Logout"
      >
        Logout
      </button>
    </aside>
  );
} 