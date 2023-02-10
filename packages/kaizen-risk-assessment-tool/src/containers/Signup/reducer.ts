import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'signupSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    signupStatus: REQUEST_STATUS.IDLE,
    signupMessage: '',
  },
  reducers: {
    makeLoading: (state, { payload }) => {
      state.signupStatus = payload;
    },
    signupRequest: (state, action) => {
      if (action) state.signupStatus = REQUEST_STATUS.REQUESTING;
    },
    signupSuccess: (state) => {
      state.signupStatus = REQUEST_STATUS.SUCCESS;
    },
    signupFail: (state, { payload }) => {
      state.signupStatus = REQUEST_STATUS.ERROR;
      state.signupMessage = payload;
    },
    signupResetStatus: (state) => {
      state.signupStatus = REQUEST_STATUS.IDLE;
    },
    clearAPIMessage: (state) => {
      state.signupMessage = '';
    },
  },
});

export const {
  signupRequest,
  makeLoading,
  signupSuccess,
  signupFail,
  clearAPIMessage,
  signupResetStatus,
} = slice.actions;

export const selectSignupSlice = (state: any) => state[sliceName];

export default slice.reducer;
