import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, getByCategory, searchProducts } from '../services/api';

export type Product = {
  _id: string;
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
};

type ProductsState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllProducts();
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProduct = createAsyncThunk('products/fetchOne', async (slug: string, { rejectWithValue }) => {
  try {
    const res = await getProduct(slug);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
  }
});

export const createProductThunk = createAsyncThunk('products/create', async (data: FormData, { rejectWithValue }) => {
  try {
    const res = await createProduct(data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create product');
  }
});

export const updateProductThunk = createAsyncThunk('products/update', async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
  try {
    const res = await updateProduct(id, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProductThunk = createAsyncThunk('products/delete', async (id: string, { rejectWithValue }) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete product');
  }
});

export const fetchByCategory = createAsyncThunk('products/fetchByCategory', async (category: string, { rejectWithValue }) => {
  try {
    const res = await getByCategory(category);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch products by category');
  }
});

export const searchProductsThunk = createAsyncThunk('products/search', async (query: string, { rejectWithValue }) => {
  try {
    const res = await searchProducts(query);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to search products');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products = state.products.map((p) => (p._id === action.payload._id ? action.payload : p));
      })
      .addCase(updateProductThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchByCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProduct = (state: { products: ProductsState }) => state.products.product;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;

// Category selectors
export const selectSmartphones = (state: { products: ProductsState }) => 
  state.products.products.filter(p => p.category.toLowerCase() === 'smartphones');

export const selectTablets = (state: { products: ProductsState }) => 
  state.products.products.filter(p => p.category.toLowerCase() === 'tablets');

export const selectSmartwatches = (state: { products: ProductsState }) => 
  state.products.products.filter(p => p.category.toLowerCase() === 'smartwatches');

export const selectAccessories = (state: { products: ProductsState }) => 
  state.products.products.filter(p => p.category.toLowerCase() === 'accessories');

export default productsSlice.reducer; 