import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productsLoadingStatus: 'idle',
  offset: 0,
};

const productList = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    productsFetching: (state) => { state.productsLoadingStatus = 'loading'; },
    productsFetched: (state, action) => {
      state.products = [...action.payload];
      state.productsLoadingStatus = 'idle';
    },
    productsFetchingError: (state) => { state.productsLoadingStatus = 'error'; },
    productDeleted: (state, action) => {
      state.products
        .filter((product) => product.id !== action.payload);
    },
  },
});

const { actions, reducer } = productList;

export default reducer;
export const {
  productsFetching,
  productsFetched,
  productsFetchingError,
  productDeleted,
} = actions;
