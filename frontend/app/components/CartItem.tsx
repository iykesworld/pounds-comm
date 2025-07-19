"use client";
import { useAppDispatch } from '../redux/store';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';

export type CartItemType = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border-2 border-blue-100 dark:border-gray-800" />
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{item.name}</div>
        <div className="text-blue-600 dark:text-blue-400 font-semibold">NGN{item.price.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => dispatch(updateQuantity({ id: item.productId, quantity: Number(e.target.value) }))}
          className="w-16 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring text-center"
        />
        <button
          onClick={() => dispatch(removeFromCart(item.productId))}
          className="ml-2 px-3 py-1 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
} 