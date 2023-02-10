import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'defaultLayoutStore',
  initialState: {},
  reducers: {
    checkLastUpdatedRequest: () => {},
  },
});

export const { checkLastUpdatedRequest } = slice.actions;

export const selectDefaultLayoutStore = (state: any) =>
  state.defaultLayoutStore;

export default slice.reducer;
