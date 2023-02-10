
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'globalStore',
  initialState: {
    errorMessages: [],
    successMessages: [],
    updateMessages: [],
  },
  reducers: {
    setErrorMessages: (state, action) => {
      state.errorMessages = action.payload;
    },
    setSuccessMessages: (state, action) => {
      state.successMessages = action.payload;
    },
    setUpdateMessages: (state, action) => {
      state.updateMessages = action.payload;
    },
  },
});

export const {
  setErrorMessages,
  setSuccessMessages,
  setUpdateMessages
} = slice.actions;

export const selectGlobalStore = (state: any) => state.globalStore;

export default slice.reducer;
