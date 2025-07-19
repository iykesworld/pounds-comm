"use client";
import Link from 'next/link';
import { useAppSelector } from '../redux/store';

export default function CartSummary() {
  const { totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-md mx-auto mt-8">
      <div className="flex justify-between text-lg font-bold">
        <span>Total Items:</span>
        <span>{totalQuantity}</span>
      </div>
      <div className="flex justify-between text-lg font-bold">
        <span>Total Price:</span>
        <span>NGN{totalPrice.toFixed(2)}</span>
      </div>
      <Link href="/checkout" className="w-full mt-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition text-center">Proceed to Checkout</Link>
    </div>
  );
} 