import { createSlice } from '@reduxjs/toolkit';
import {
  REQUEST_STATUS,
} from '../../../constants/common';

const sliceName = 'myProgressSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    data: {},
    getProgressStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getProgressRequest: (state) => {
      state.getProgressStatus = REQUEST_STATUS.REQUESTING;
    },
    getProgressSucceeded: (state, { payload }) => {
      state.data = payload.data;
      state.getProgressStatus = REQUEST_STATUS.SUCCESS;
    },
    getProgressFailed: (state) => {
      state.getProgressStatus = REQUEST_STATUS.ERROR;
    },
    clearAll: (state) => {
      state.data = {};
    },
  },
});

export const {
  getProgressRequest,
  getProgressSucceeded,
  getProgressFailed,
  clearAll,
} = slice.actions;

export const selectProgressInfo = (state: any) => state.myProgressSlice;

export default slice.reducer;
