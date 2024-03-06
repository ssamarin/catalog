import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: '',
};

const headerSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearchData: (state, action) => { state.searchData = action.payload; },
  },
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  updateSearchData,
} = actions;
