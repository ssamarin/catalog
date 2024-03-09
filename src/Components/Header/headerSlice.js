import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: '',
  currentBrand: 'All',
};

const headerSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearchData: (state, action) => { state.searchData = action.payload; },
    setCurrentBrand: (state, action) => { state.currentBrand = action.payload; },
  },
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  updateSearchData,
  setCurrentBrand,
} = actions;
