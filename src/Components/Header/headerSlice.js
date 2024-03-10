import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSearchData: '',
  dbSearchData: '',
  currentBrand: 'All',
  currentPrice: 'All',
};

const headerSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updatePageSearchData: (state, action) => { state.pageSearchData = action.payload; },
    updateDbSearchData: (state, action) => { state.dbSearchData = action.payload; },
    setCurrentBrand: (state, action) => { state.currentBrand = action.payload; },
    setCurrentPrice: (state, action) => { state.currentPrice = action.payload; },
  },
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  updatePageSearchData,
  updateDbSearchData,
  setCurrentBrand,
  setCurrentPrice,
} = actions;
