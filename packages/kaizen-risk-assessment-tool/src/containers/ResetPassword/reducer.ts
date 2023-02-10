import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'resetPasswordSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    postVerifyTokenStatus: REQUEST_STATUS.IDLE,
    resetPasswordStatus: REQUEST_STATUS.IDLE,
    resetPasswordMessage: '',
  },
  reducers: {
    makeLoading: (state, { payload }) => {
      state.resetPasswordStatus = payload;
    },
    resetPasswordRequest: (state, action) => {
      if (action) state.resetPasswordStatus = REQUEST_STATUS.REQUESTING;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordStatus = REQUEST_STATUS.SUCCESS;
    },
    resetPasswordFail: (state, { payload }) => {
      state.resetPasswordStatus = REQUEST_STATUS.ERROR;
      state.resetPasswordMessage = payload;
    },
    resetStatus: (state) => {
      state.resetPasswordStatus = REQUEST_STATUS.IDLE;
    },
    clearAPIMessage: (state) => {
      state.resetPasswordMessage = '';
    },

    postVerifyTokenRequest: (state) => {
      state.postVerifyTokenStatus = REQUEST_STATUS.REQUESTING;
    },
    postVerifyTokenSuccess: (state) => {
      state.postVerifyTokenStatus = REQUEST_STATUS.SUCCESS;
    },
    postVerifyTokenFail: (state) => {
      state.postVerifyTokenStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  resetPasswordRequest,
  makeLoading,
  resetPasswordSuccess,
  resetPasswordFail,
  resetStatus,
  clearAPIMessage,
  postVerifyTokenRequest,
  postVerifyTokenSuccess,
  postVerifyTokenFail,

} = slice.actions;

export const selectResetPasswordSlice = (state: any) => state[sliceName];

export default slice.reducer;
