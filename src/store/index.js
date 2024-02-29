import { configureStore } from '@reduxjs/toolkit';

import productList from '../Components/ProductList/productListSlice';

const store = configureStore({
  reducer: { productList },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
