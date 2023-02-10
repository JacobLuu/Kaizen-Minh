import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'AccountSetupSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    invitationStatus: REQUEST_STATUS.IDLE,
    registerStatus: REQUEST_STATUS.IDLE,
    organizationName: '',
    registerMessage: '',
  },
  reducers: {
    registerRequest: (state) => {
      state.registerStatus = REQUEST_STATUS.REQUESTING;
    },
    registerSuccess: (state) => {
      state.registerStatus = REQUEST_STATUS.SUCCESS;
    },
    registerFail: (state, { payload }) => {
      state.registerStatus = REQUEST_STATUS.ERROR;
      state.registerMessage = payload;
    },
    registerResetStatus: (state) => {
      state.registerStatus = REQUEST_STATUS.IDLE;
    },
    clearAPIMessage: (state) => {
      state.registerMessage = '';
    },

    verifyInvitationRequest: (state, action) => {
      if (action) state.invitationStatus = REQUEST_STATUS.REQUESTING;
    },
    verifyInvitationSuccess: (state, { payload }) => {
      state.invitationStatus = REQUEST_STATUS.SUCCESS;
      state.organizationName = payload?.organization_name
    },
    verifyInvitationFail: (state) => {
      state.invitationStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  registerResetStatus,
  clearAPIMessage,
  verifyInvitationRequest,
  verifyInvitationSuccess,
  verifyInvitationFail,
} = slice.actions;

export const selectAccountSetupSlice = (state: any) => state[sliceName];

export default slice.reducer;
