import { configureStore } from '@reduxjs/toolkit';

import productList from '../Components/ProductList/productListSlice';
import filters from '../Components/Header/headerSlice';

const store = configureStore({
  reducer: { productList, filters },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
