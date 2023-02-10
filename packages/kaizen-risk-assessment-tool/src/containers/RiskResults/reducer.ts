import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../constants/common';
import {
  AssessmentResultResponse,
  AssessmentResultState,
} from '../../types/AssessmentResult';

const getKeyRiskIndicatorResult = (assessmentIndicators) => {
  const specialKRIWarnings = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < assessmentIndicators.length; i++) {
    const item = assessmentIndicators[i];
    const checkedIndicator = specialKRIWarnings.find(
      (e) => e.indicator_id === item.indicator_id
    );
    if (!checkedIndicator) {
      const options = assessmentIndicators
        .filter((e) => e.indicator_id === item.indicator_id)
        .map((indicator) => {
          return {
            indicator_option_short_description:
              indicator.indicator_option_short_description,
            indicator_option_id: indicator.indicator_option_id,
            indicator_option_risk_score: indicator.indicator_option_risk_score,
            indicator_option_risk_rating:
              indicator.indicator_option_risk_rating,
            is_special_selection: indicator.is_special_selection,
          };
        });

      specialKRIWarnings.push({
        indicator_id: item.indicator_id,
        is_special_selection: options.some((obj) => obj.is_special_selection),
        indicator_name: item.indicator_name,
        indicator_options: options,
      });
    }
  }
  return specialKRIWarnings;
};

const initialState: AssessmentResultState = {
  getDataRiskResultsStatus: REQUEST_STATUS.IDLE,
  getAssessmentsCommentsStatus: REQUEST_STATUS.IDLE,
  getDataAssessmentsHistoriesVersionStatus: REQUEST_STATUS.IDLE,
  getDataAssessmentsHistoriesStatus: REQUEST_STATUS.IDLE,
  getDataAssessmentsActivityLogsStatus: REQUEST_STATUS.IDLE,
  postAssessmentsCommentsStatus: REQUEST_STATUS.IDLE,
  approveAssessmentResultsStatus: REQUEST_STATUS.IDLE,
  assessmentResults: {
    archived_at: null,
    archived_user: null,
    assessment_indicators: [],
    assigned_user: {
      id: null,
      name: '',
    },
    assigned_user_id: null,
    case_id: '',
    client_name: '',
    client_type: '',
    corporate_assessment: null,
    created_at: null,
    created_user: {
      id: null,
      name: '',
    },
    created_user_id: null,
    id: null,
    individual_assessment: null,
    is_archived: false,
    is_prohibited: false,
    organization_id: null,
    reviewer_user: {
      id: null,
      name: '',
    },
    reviewer_user_id: null,
    risk_rating: '',
    risk_score: null,
    status: '',
    target_type: '',
    updated_at: null,
  },
  specialKRIWarnings: [],
  assessmentsComments: [],
  assessmentsHistoriesVersion: [],
  assessmentsHistoriesVersionTotal: 0,
  assessmentsActivityLogs: [],
};

export const slice = createSlice({
  name: 'riskResultsStore',
  initialState,
  reducers: {
    getDataRiskResultsRequest: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (action) state.getDataRiskResultsStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataRiskResultsSuccess: (
      state,
      action: PayloadAction<{ assessmentResults: AssessmentResultResponse }>
    ) => {
      state.getDataRiskResultsStatus = REQUEST_STATUS.SUCCESS;
      state.assessmentResults = action.payload.assessmentResults;

      state.specialKRIWarnings = getKeyRiskIndicatorResult(
        state.assessmentResults?.assessment_indicators
      );
    },
    getDataRiskResultsFail: (state, action) => {
      if (action) state.getDataRiskResultsStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsCommentsRequest: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (action)
        state.getAssessmentsCommentsStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsCommentsSuccess: (state, { payload }) => {
      state.getAssessmentsCommentsStatus = REQUEST_STATUS.SUCCESS;
      state.assessmentsComments = payload.list;
    },
    getDataAssessmentsCommentsFail: (state, action) => {
      if (action) state.getAssessmentsCommentsStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsHistoriesVersionRequest: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (action)
        state.getDataAssessmentsHistoriesVersionStatus =
          REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsHistoriesVersionSuccess: (state, { payload }) => {
      state.getDataAssessmentsHistoriesVersionStatus = REQUEST_STATUS.SUCCESS;
      state.assessmentsHistoriesVersion = payload.list;
      state.assessmentsHistoriesVersionTotal = payload.totalCount;
    },
    getDataAssessmentsHistoriesVersionFail: (state, action) => {
      if (action)
        state.getDataAssessmentsHistoriesVersionStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsHistoriesRequest: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (action)
        state.getDataAssessmentsHistoriesStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsHistoriesSuccess: (state, { payload }) => {
      state.getDataAssessmentsHistoriesStatus = REQUEST_STATUS.SUCCESS;
      state.assessmentResults = {
        ...state.assessmentResults,
        ...payload,
      };
      state.specialKRIWarnings = getKeyRiskIndicatorResult(
        payload.assessment_indicators
      );
    },
    getDataAssessmentsHistoriesFail: (state, action) => {
      if (action)
        state.getDataAssessmentsHistoriesStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsActivityLogsRequest: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (action)
        state.getDataAssessmentsActivityLogsStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataAssessmentsActivityLogsSuccess: (state, { payload }) => {
      state.getDataAssessmentsActivityLogsStatus = REQUEST_STATUS.SUCCESS;
      state.assessmentsActivityLogs = payload.list;
    },
    getDataAssessmentsActivityLogsFail: (state) => {
      state.getDataAssessmentsActivityLogsStatus = REQUEST_STATUS.ERROR;
    },

    postDataAssessmentsCommentsRequest: (state) => {
      state.postAssessmentsCommentsStatus = REQUEST_STATUS.REQUESTING;
    },
    postDataAssessmentsCommentsSuccess: (state) => {
      state.postAssessmentsCommentsStatus = REQUEST_STATUS.SUCCESS;
    },
    postDataAssessmentsCommentsFail: (state) => {
      state.postAssessmentsCommentsStatus = REQUEST_STATUS.ERROR;
    },

    approveAssessmentResultsRequest: (state) => {
      state.approveAssessmentResultsStatus = REQUEST_STATUS.REQUESTING;
    },
    approveAssessmentResultsSuccess: (state) => {
      state.approveAssessmentResultsStatus = REQUEST_STATUS.SUCCESS;
    },
    approveAssessmentResultsFail: (state) => {
      state.approveAssessmentResultsStatus = REQUEST_STATUS.ERROR;
    },

    riskResultsClearData: (state) => {
      state.assessmentResults = {
        archived_at: null,
        archived_user: null,
        assessment_indicators: [],
        assigned_user: {
          id: null,
          name: '',
        },
        assigned_user_id: null,
        case_id: '',
        client_name: '',
        client_type: '',
        corporate_assessment: null,
        created_at: null,
        created_user: {
          id: null,
          name: '',
        },
        created_user_id: null,
        id: null,
        individual_assessment: null,
        is_archived: false,
        is_prohibited: false,
        organization_id: null,
        reviewer_user: {
          id: null,
          name: '',
        },
        reviewer_user_id: null,
        risk_rating: '',
        risk_score: null,
        status: '',
        target_type: '',
        updated_at: null,
      };
      state.assessmentsComments = [];
      state.assessmentsHistoriesVersion = [];
      state.assessmentsActivityLogs = [];
      state.specialKRIWarnings = [];
    },
  },
});

export const {
  getDataRiskResultsRequest,
  getDataRiskResultsSuccess,
  getDataRiskResultsFail,

  getDataAssessmentsCommentsRequest,
  getDataAssessmentsCommentsSuccess,
  getDataAssessmentsCommentsFail,

  getDataAssessmentsHistoriesVersionRequest,
  getDataAssessmentsHistoriesVersionSuccess,
  getDataAssessmentsHistoriesVersionFail,

  getDataAssessmentsHistoriesRequest,
  getDataAssessmentsHistoriesSuccess,
  getDataAssessmentsHistoriesFail,

  getDataAssessmentsActivityLogsRequest,
  getDataAssessmentsActivityLogsSuccess,
  getDataAssessmentsActivityLogsFail,

  postDataAssessmentsCommentsRequest,
  postDataAssessmentsCommentsSuccess,
  postDataAssessmentsCommentsFail,

  approveAssessmentResultsRequest,
  approveAssessmentResultsSuccess,
  approveAssessmentResultsFail,

  riskResultsClearData,
} = slice.actions;

export const selectRiskResultsStore = (state: any) => state.riskResultsStore;

export default slice.reducer;
