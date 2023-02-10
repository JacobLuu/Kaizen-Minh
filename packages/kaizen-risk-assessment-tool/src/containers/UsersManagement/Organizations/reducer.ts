import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common'

export const slice = createSlice({
  name: 'organizationsSlice',
  initialState: {
    list: [],
    totalCount: 0,
    getOrganizationsStatus: REQUEST_STATUS.IDLE,
    addOrganizationStatus: REQUEST_STATUS.IDLE,
    addOrganizationMessage: '',
    isUpdateOrganizationSuccess: false
  },
  reducers: {
    getOrganizationsRequested: (state) => {
      state.getOrganizationsStatus = REQUEST_STATUS.REQUESTING;
    },
    getOrganizationsSucceeded: (state, { payload }) => {
      state.list = payload.list;
      state.totalCount = payload.totalCount;
      state.getOrganizationsStatus = REQUEST_STATUS.SUCCESS;
    },
    getOrganizationsFailed: () => {},
    addOrganizationRequest: (state, action) => {
      if (action) {
        state.isUpdateOrganizationSuccess = false;
        state.addOrganizationStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    addOrganizationSucceeded: (state) => {
      state.isUpdateOrganizationSuccess = true;
    },
    addOrganizationFailed: (state, { payload }) => {
      state.addOrganizationStatus = REQUEST_STATUS.ERROR;
      state.addOrganizationMessage = payload;
    },
    clearAll: (state) => {
      state.list = [];
      state.totalCount = 0;
    }
  },
});

export const {
  getOrganizationsRequested,
  getOrganizationsSucceeded,
  getOrganizationsFailed,
  addOrganizationRequest,
  addOrganizationSucceeded,
  addOrganizationFailed,
  clearAll,
} = slice.actions;

export const selectOrganizationsList = (state: any) => state.organizationsSlice;

export default slice.reducer;
