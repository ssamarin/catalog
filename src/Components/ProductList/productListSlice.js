import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  idsLoadingStatus: 'idle',
  products: [],
  productsLoadingStatus: 'idle',
  offset: 0,
};

const productList = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    incOffset: (state, action) => { state.offset += action.payload; },
    idsFetched: (state, action) => {
      state.ids = [...action.payload];
      state.idsLoadingStatus = 'idle';
    },
    idsFetchingError: (state) => { state.idsLoadingStatus = 'error'; },
    productsFetching: (state) => { state.productsLoadingStatus = 'loading'; },
    productsFetched: (state, action) => {
      state.products = [...action.payload];
      state.productsLoadingStatus = 'idle';
    },
    productsFetchingError: (state) => { state.productsLoadingStatus = 'error'; },
    productDeleted: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

const { actions, reducer } = productList;

export default reducer;
export const {
  incOffset,
  idsFetching,
  idsFetched,
  idsFetchingError,
  productsFetching,
  productsFetched,
  productsFetchingError,
  productDeleted,
} = actions;
