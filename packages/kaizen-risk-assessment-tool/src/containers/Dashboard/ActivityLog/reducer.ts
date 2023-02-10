import { createSlice } from '@reduxjs/toolkit';
import {
  REQUEST_STATUS,
} from '../../../constants/common';

const sliceName = 'activityLogSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
    getActivityLogStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getActivityLogRequest: (state) => {
      state.getActivityLogStatus = REQUEST_STATUS.REQUESTING;
    },
    getActivityLogSucceed: (state, { payload }) => {
      state.data = payload.list;
      state.getActivityLogStatus = REQUEST_STATUS.SUCCESS;
    },
    getActivityLogFailed: (state) => {
      state.getActivityLogStatus = REQUEST_STATUS.ERROR;
    },
    clearAll: (state) => {
      state.data = [];
    },
  },
});

export const {
  getActivityLogRequest,
  getActivityLogSucceed,
  getActivityLogFailed,
  clearAll,
} = slice.actions;

export const selectActivityLog = (state: any) => state.activityLogSlice;

export default slice.reducer;