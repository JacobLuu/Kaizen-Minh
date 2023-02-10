/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';


const sliceName = 'corporateProhibitedSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    isGetCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isAddCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    addCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isEditCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    isDeleteCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    corporateProhibitedClients: [],
    corporateProhibitedClientsTotalCount: 0
  },

  reducers: {
    getCorporateProhibitedClientsRequest: (state) => {
      state.isGetCorporateProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    getCorporateProhibitedClientsSuccess: (state, { payload }) => {
      state.isGetCorporateProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
      state.corporateProhibitedClients = payload.list;
      state.corporateProhibitedClientsTotalCount = payload.totalCount;
    },
    getCorporateProhibitedClientsFail: (state) => {
      state.isGetCorporateProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    addCorporateProhibitedClientsRequest: (state) => {
      state.isAddCorporateProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    addCorporateProhibitedClientsSuccess: (state) => {
      state.isAddCorporateProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    addCorporateProhibitedClientsFail: (state) => {
      state.isAddCorporateProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },
    
    editCorporateProhibitedClientsRequest: (state) => {
      state.isEditCorporateProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    editCorporateProhibitedClientsSuccess: (state) => {
      state.isEditCorporateProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    editCorporateProhibitedClientsFail: (state) => {
      state.isEditCorporateProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    deleteCorporateProhibitedClientsRequest: (state) => {
      state.isDeleteCorporateProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    deleteCorporateProhibitedClientsSuccess: (state) => {
      state.isDeleteCorporateProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    deleteCorporateProhibitedClientsFail: (state) => {
      state.isDeleteCorporateProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  editCorporateProhibitedClientsRequest,
  editCorporateProhibitedClientsSuccess,
  editCorporateProhibitedClientsFail,

  addCorporateProhibitedClientsRequest,
  addCorporateProhibitedClientsSuccess,
  addCorporateProhibitedClientsFail,

  getCorporateProhibitedClientsRequest,
  getCorporateProhibitedClientsSuccess,
  getCorporateProhibitedClientsFail,

  deleteCorporateProhibitedClientsRequest,
  deleteCorporateProhibitedClientsSuccess,
  deleteCorporateProhibitedClientsFail,
} = slice.actions;

export const selectCorporateProhibitedSlice = (state: any) => state[sliceName];

export default slice.reducer;
