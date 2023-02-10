import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

export const slice = createSlice({
  name: 'DashboardStore',
  initialState: {
    getDataSettingStatus: REQUEST_STATUS.IDLE,
    dataCountrys: [],
    corporateClientTypes: [],
    individualClientTypes: [],

    getDataHistory: {},
    getDataHistoryList: [],
    currentAction: '',
    historyUpdateStatus: REQUEST_STATUS.IDLE,
    archiveCasesStatus: REQUEST_STATUS.IDLE,
    unArchiveCasesStatus: REQUEST_STATUS.IDLE,
    assignCasesStatus: REQUEST_STATUS.IDLE,
    archiveCasesMessage: '',
    unArchiveCasesMessage: '',
    assignCasesMessage: '',
    isUpdateCaseStatus: false,
  },
  reducers: {
    getHistoryDataRequest: (state, action) => {
      if (action) state.historyUpdateStatus = REQUEST_STATUS.REQUESTING;
    },
    getHistoryDataSuccess: (state, { payload }) => {
      state.historyUpdateStatus = REQUEST_STATUS.SUCCESS;
      state.getDataHistory = payload;
      state.getDataHistoryList = payload.list;
    },
    getHistoryDataFail: (state) => {
      state.historyUpdateStatus = REQUEST_STATUS.ERROR;
    },

    setCurrentActionPayload: (state, { payload }) => {
        state.currentAction = payload
    },
    archiveCasesRequest: (state, action) => {
      if (action) {
        state.isUpdateCaseStatus = false;
        state.archiveCasesStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    unArchiveCasesRequest: (state, action) => {
      if (action) {
        state.isUpdateCaseStatus = false;
        state.unArchiveCasesStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    assignCasesRequest: (state, action) => {
      if (action) {
        state.isUpdateCaseStatus = false;
        state.assignCasesStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    archiveCasesSucceed: (state) => {
      state.isUpdateCaseStatus = true;
    },
    unArchiveCasesSucceed: (state) => {
      state.isUpdateCaseStatus = true;
    },
    assignCasesSucceed: (state) => {
      state.isUpdateCaseStatus = true;
    },
    archiveCasesFailed: (state, { payload }) => {
      state.archiveCasesStatus = REQUEST_STATUS.ERROR;
      state.archiveCasesMessage = payload
    },
    unArchiveCasesFailed: (state, { payload }) => {
      state.unArchiveCasesStatus = REQUEST_STATUS.ERROR
      state.unArchiveCasesMessage = payload;
    },
    assignCasesFailed: (state, { payload }) => {
      state.assignCasesStatus = REQUEST_STATUS.REQUESTING;
      state.assignCasesStatus = payload;
    },
    clearAll: (state) => {
      state.getDataHistoryList = [];
    },
  },
});

export const {
  getHistoryDataRequest,
  getHistoryDataSuccess,
  getHistoryDataFail,
  archiveCasesRequest,
  archiveCasesSucceed,
  archiveCasesFailed,
  unArchiveCasesRequest,
  unArchiveCasesSucceed,
  unArchiveCasesFailed,
  assignCasesRequest,
  assignCasesFailed,
  assignCasesSucceed,
  setCurrentActionPayload,
  clearAll
} = slice.actions;

export const selectDashboardStore = (state: any) => state.DashboardStore;

export default slice.reducer;
