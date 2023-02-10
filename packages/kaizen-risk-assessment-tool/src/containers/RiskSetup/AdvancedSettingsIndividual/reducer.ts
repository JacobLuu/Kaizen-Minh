/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';


const sliceName = 'individualProhibitedSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    isGetIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isAddIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    addIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isEditIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isDeleteIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    individualProhibitedClients: [],
    individualProhibitedClientsTotalCount: 0
  },

  reducers: {
    getIndividualProhibitedClientsRequest: (state) => {
      state.isGetIndividualProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    getIndividualProhibitedClientsSuccess: (state, { payload }) => {
      state.isGetIndividualProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
      state.individualProhibitedClients = payload.list;
      state.individualProhibitedClientsTotalCount = payload.totalCount;
    },
    getIndividualProhibitedClientsFail: (state) => {
      state.isGetIndividualProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    addIndividualProhibitedClientsRequest: (state) => {
      state.isAddIndividualProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    addIndividualProhibitedClientsSuccess: (state) => {
      state.isAddIndividualProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    addIndividualProhibitedClientsFail: (state) => {
      state.isAddIndividualProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },
    
    editIndividualProhibitedClientsRequest: (state) => {
      state.isEditIndividualProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    editIndividualProhibitedClientsSuccess: (state) => {
      state.isEditIndividualProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    editIndividualProhibitedClientsFail: (state) => {
      state.isEditIndividualProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    deleteIndividualProhibitedClientsRequest: (state) => {
      state.isDeleteIndividualProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    deleteIndividualProhibitedClientsSuccess: (state) => {
      state.isDeleteIndividualProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    deleteIndividualProhibitedClientsFail: (state) => {
      state.isDeleteIndividualProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  editIndividualProhibitedClientsRequest,
  editIndividualProhibitedClientsSuccess,
  editIndividualProhibitedClientsFail,

  addIndividualProhibitedClientsRequest,
  addIndividualProhibitedClientsSuccess,
  addIndividualProhibitedClientsFail,

  getIndividualProhibitedClientsRequest,
  getIndividualProhibitedClientsSuccess,
  getIndividualProhibitedClientsFail,

  deleteIndividualProhibitedClientsRequest,
  deleteIndividualProhibitedClientsSuccess,
  deleteIndividualProhibitedClientsFail,
} = slice.actions;

export const selectIndividualProhibitedSlice = (state: any) => state[sliceName];

export default slice.reducer;
