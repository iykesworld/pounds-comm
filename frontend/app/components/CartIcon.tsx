"use client";
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../redux/store';

export default function CartIcon() {
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  return (
    <Link href="/cart" className="relative p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-900 transition">
      <ShoppingCartIcon className="h-6 w-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{cartCount}</span>
      )}
    </Link>
  );
} 