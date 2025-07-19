"use client";
import { useAppSelector } from '../redux/store';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import Link from 'next/link';

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Your cart is empty.</p>
          <Link href="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">Shop Now</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <CartSummary />
        </>
      )}
    </div>
  );
} 