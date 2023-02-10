import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common'
import { IGetUsers } from '../../types/UsersList';

export const slice = createSlice({
  name: 'usersSlice',
  initialState: {
    list: [],
    involvedAssessments: [],
    totalCount: 0,
    userId: '',
    addUserMessage: '',
    editUserMessage: '',
    changeUserStatusMessage: '',
    isUpdateUserSuccess: false,
    getUsersStatus: REQUEST_STATUS.IDLE,
    addUserStatus: REQUEST_STATUS.IDLE,
    editUserStatus: REQUEST_STATUS.IDLE,
    getInvolvedAssessmentsStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getUsersRequested: (state, _action: PayloadAction<IGetUsers> ) => {
      state.getUsersStatus = REQUEST_STATUS.REQUESTING;
    },
    getUsersSucceeded: (state, { payload }) => {
      state.list = payload.list;
      state.totalCount = payload.totalCount;
      state.getUsersStatus = REQUEST_STATUS.SUCCESS;
    },
    getUsersFailed: () => {},

    getInvolvedAssessmentsRequested: (state, _action: PayloadAction<IGetUsers> ) => {
      state.getInvolvedAssessmentsStatus = REQUEST_STATUS.REQUESTING;
    },
    getInvolvedAssessmentsSucceeded: (state, { payload }) => {
      state.involvedAssessments = payload.list;
      state.getInvolvedAssessmentsStatus = REQUEST_STATUS.SUCCESS;
    },
    getInvolvedAssessmentsFailed: (state) => {
      state.getInvolvedAssessmentsStatus = REQUEST_STATUS.ERROR;
    },

    addUserRequest: (state, action) => {
      if (action) {
        state.addUserStatus = REQUEST_STATUS.REQUESTING;
        state.isUpdateUserSuccess = false;
      };
    },
    addUserSucceeded: (state) => {
      state.isUpdateUserSuccess = true;
    },
    addUserFailed: (state, { payload }) => {
      state.addUserStatus = REQUEST_STATUS.ERROR;
      state.addUserMessage = payload;
    },
    setUserId: (state, {payload}) => {
        state.userId = payload;
    },
    editUserRequest: (state, action) => {
      if (action) {
        state.editUserStatus = REQUEST_STATUS.REQUESTING;
        state.isUpdateUserSuccess = false;
      }
    },
    editUserSucceeded: (state) => {
      state.isUpdateUserSuccess = true;
    },
    editUserFailed: (state, { payload }) => {
      state.editUserStatus = REQUEST_STATUS.ERROR;
      state.editUserMessage = payload;
    },
    updateInvitationRequested: (state, action) => {
      if (action) {
        state.editUserStatus = REQUEST_STATUS.REQUESTING;
        state.isUpdateUserSuccess = false;
      }
    },
    updateInvitationSucceeded: (state) => {
      state.isUpdateUserSuccess = true
    },
    updateInvitationFailed: (state, { payload }) => {
      state.editUserStatus = REQUEST_STATUS.ERROR;
      state.editUserMessage = payload;
    },
    changeUserStatusRequest: (state) => {
      state.isUpdateUserSuccess = false
    },
    changeUserSucceeded: (state) => {
      state.isUpdateUserSuccess = true;
    },
    changeUserStatusFailed: (state, { payload }) => {
      state.changeUserStatusMessage = REQUEST_STATUS.ERROR;
      state.changeUserStatusMessage = payload;
    },
    clearAll: (state) => {
      state.list = [];
      state.totalCount = 0;
    }
  },
});

export const {
  getUsersRequested,
  getUsersSucceeded,
  getUsersFailed,
  getInvolvedAssessmentsRequested,
  getInvolvedAssessmentsSucceeded,
  getInvolvedAssessmentsFailed,
  addUserRequest,
  addUserSucceeded,
  addUserFailed,
  setUserId,
  editUserRequest,
  editUserSucceeded,
  editUserFailed,
  updateInvitationFailed,
  updateInvitationRequested,
  updateInvitationSucceeded,
  changeUserStatusFailed,
  changeUserStatusRequest,
  changeUserSucceeded,
  clearAll,
} = slice.actions;

export const selectUsersList = (state: any) => state.usersSlice;

export default slice.reducer;
