import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';
import { IPostDataNewCase } from '../../types/newCase/NewCaseCorporate';

export const slice = createSlice({
  name: 'newCaseStore',
  initialState: {
    postNewCaseDataStatus: REQUEST_STATUS.IDLE,
    updateNewCaseDataStatus: REQUEST_STATUS.IDLE,
    indicatorSettingsStatus: REQUEST_STATUS.IDLE,
    indicatorAssessmentsSettingsStatus: REQUEST_STATUS.IDLE,
    indicatorAssessmentsCaseStatus: REQUEST_STATUS.IDLE,
    assessmentsSettingsData: [],
    messagesFail: ''
  },
  reducers: {
    postNewCaseDataRequest: (
      state,
      _action: PayloadAction<IPostDataNewCase>
    ) => {
      state.postNewCaseDataStatus = REQUEST_STATUS.REQUESTING;
    },

    postNewCaseDataSuccess: (state) => {
      state.postNewCaseDataStatus = REQUEST_STATUS.SUCCESS;
    },

    postNewCaseDataFail: (state, {payload}) => {
      state.messagesFail = payload
      state.postNewCaseDataStatus = REQUEST_STATUS.ERROR;
    },

    updateNewCaseDataRequest: (
      state
    ) => {
      state.updateNewCaseDataStatus = REQUEST_STATUS.REQUESTING;
    },

    updateNewCaseDataSuccess: (state) => {
      state.updateNewCaseDataStatus = REQUEST_STATUS.SUCCESS;
    },

    updateNewCaseDataFail: (state) => {
      state.updateNewCaseDataStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsSettingsRequest: (state) => {
      state.indicatorAssessmentsSettingsStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsSettingsSuccess: (state) => {
      state.indicatorAssessmentsSettingsStatus = REQUEST_STATUS.SUCCESS;
    },
    getDataAssessmentsSettingsFail: (state) => {
      state.indicatorAssessmentsSettingsStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsCaseRequest: (state) => {
      state.indicatorAssessmentsCaseStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsCaseSuccess: (state) => {
      state.indicatorAssessmentsCaseStatus = REQUEST_STATUS.SUCCESS;
    },
    getDataAssessmentsCaseFail: (state) => {
      state.indicatorAssessmentsCaseStatus = REQUEST_STATUS.ERROR;
    },

    getDataNewCaseSettingsRequest: (state) => {
      state.indicatorSettingsStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataNewCaseSettingsSuccess: (state) => {
      state.indicatorSettingsStatus = REQUEST_STATUS.SUCCESS;
    },
    getDataNewCaseSettingsFail: (state) => {
      state.indicatorSettingsStatus = REQUEST_STATUS.ERROR;
    },

    clearNewCaseData: (state) => {
      state.postNewCaseDataStatus = REQUEST_STATUS.IDLE;
      state.updateNewCaseDataStatus = REQUEST_STATUS.IDLE;
      state.indicatorSettingsStatus = REQUEST_STATUS.IDLE;
      state.indicatorAssessmentsCaseStatus = REQUEST_STATUS.IDLE;
      state.indicatorAssessmentsSettingsStatus = REQUEST_STATUS.IDLE;
      state.messagesFail = ''
    },
  },
});

export const {
  postNewCaseDataRequest,
  postNewCaseDataSuccess,
  postNewCaseDataFail,

  updateNewCaseDataRequest,
  updateNewCaseDataSuccess,
  updateNewCaseDataFail,
  
  getDataAssessmentsSettingsRequest,
  getDataAssessmentsSettingsSuccess,
  getDataAssessmentsSettingsFail,

  getDataAssessmentsCaseRequest,
  getDataAssessmentsCaseSuccess,
  getDataAssessmentsCaseFail,

  getDataNewCaseSettingsRequest,
  getDataNewCaseSettingsSuccess,
  getDataNewCaseSettingsFail,

  clearNewCaseData
} = slice.actions;

export const selectNewCaseStore = (state: any) => state.newCaseStore;

export default slice.reducer;
