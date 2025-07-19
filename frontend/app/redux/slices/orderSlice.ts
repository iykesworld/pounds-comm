import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../services/api';

export type Order = {
  _id: string;
  userId?: string;
  products: { productId: string; quantity: number }[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered';
  address: string;
  email: string;
  phone: string;
  createdAt: string;
};

type OrdersState = {
  userOrders: Order[];
  allOrders: Order[];
  loading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  userOrders: [],
  allOrders: [],
  loading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk('orders/create', async (data: any, { rejectWithValue }) => {
  try {
    const res = await createOrder(data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create order');
  }
});

export const fetchUserOrders = createAsyncThunk('orders/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await getUserOrders();
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user orders');
  }
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllOrders();
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch all orders');
  }
});

export const updateOrderStatusThunk = createAsyncThunk('orders/updateStatus', async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
  try {
    const res = await updateOrderStatus(id, status);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update order status');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.userOrders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.allOrders = state.allOrders.map((order) => order._id === action.payload._id ? action.payload : order);
        state.userOrders = state.userOrders.map((order) => order._id === action.payload._id ? action.payload : order);
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer; 