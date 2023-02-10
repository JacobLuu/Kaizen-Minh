import { createSlice } from '@reduxjs/toolkit';
import {
  REQUEST_STATUS,
} from '../../../constants/common';

const sliceName = 'riskRatingSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    data: {},
    getRiskRatingStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getRiskRatingRequest: (state) => {
      state.getRiskRatingStatus = REQUEST_STATUS.REQUESTING;
    },
    getRiskRatingSucceeded: (state, { payload }) => {
      state.data = payload.data;
      state.getRiskRatingStatus = REQUEST_STATUS.SUCCESS;
    },
    getRiskRatingFailed: (state) => {
      state.getRiskRatingStatus = REQUEST_STATUS.ERROR;
    },
    clearAll: (state) => {
      state.data = {};
    },
  },
});

export const {
  getRiskRatingRequest,
  getRiskRatingSucceeded,
  getRiskRatingFailed,
  clearAll,
} = slice.actions;

export const selectRiskRatingInfo = (state: any) => state.riskRatingSlice;

export default slice.reducer;
