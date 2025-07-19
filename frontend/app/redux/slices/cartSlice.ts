import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

// ✅ Explicitly add productId for better clarity and compatibility with CartItem usage
export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: number;
  image: string;
  tag?: string;
  description: string;
  createdAt: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

const getInitialCart = (): CartState => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    if (cart) return JSON.parse(cart);
  }
  return { items: [], totalQuantity: 0, totalPrice: 0 };
};

const initialState: CartState = getInitialCart();

const saveCart = (state: CartState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state));
  }
};

const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.productId === product._id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        const newItem: CartItem = {
          ...product,
          productId: product._id, // ✅ explicitly map _id to productId
          quantity,
        };
        state.items.push(newItem);
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCart(state);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCart(state);
    },

    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((item) => item.productId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCart(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
