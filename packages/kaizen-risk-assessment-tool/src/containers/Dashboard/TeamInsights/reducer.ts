import { createSlice } from '@reduxjs/toolkit';
import {
  REQUEST_STATUS,
} from '../../../constants/common';

const sliceName = 'teamInsightSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
    getTeamInsightStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getTeamInsightRequest: (state) => {
      state.getTeamInsightStatus = REQUEST_STATUS.REQUESTING;
    },
    getTeamInsightSucceeded: (state, { payload }) => {
      state.data = payload.data;
      state.getTeamInsightStatus = REQUEST_STATUS.SUCCESS;
    },
    getTeamInsightFailed: (state) => {
      state.getTeamInsightStatus = REQUEST_STATUS.ERROR;
    },
    clearAll: (state) => {
      state.data = [];
    },
  },
});

export const {
  getTeamInsightRequest,
  getTeamInsightSucceeded,
  getTeamInsightFailed,
  clearAll,
} = slice.actions;

export const selectTeamInsightInfo = (state: any) => state.teamInsightSlice;

export default slice.reducer;
