import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'loginSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    posts: [],
    loginStatus: REQUEST_STATUS.IDLE,
    loginMessage: '',
  },
  reducers: {
    makeLoading: (state, { payload }) => {
      state.loginStatus = payload;
    },
    loginRequest: (state, action) => {
      if (action) state.loginStatus = REQUEST_STATUS.REQUESTING;
    },
    loginSuccess: (state) => {
      state.loginStatus = REQUEST_STATUS.SUCCESS;
    },
    loginFail: (state, { payload }) => {
      state.loginStatus = REQUEST_STATUS.ERROR;
      state.loginMessage = payload;
    },
    clearAPIMessage: (state) => {
      state.loginMessage = '';
    },
  },
});

export const {
  loginRequest,
  makeLoading,
  loginSuccess,
  clearAPIMessage,
  loginFail,
} = slice.actions;

export const selectLoginSlice = (state: any) => state[sliceName];

export default slice.reducer;
