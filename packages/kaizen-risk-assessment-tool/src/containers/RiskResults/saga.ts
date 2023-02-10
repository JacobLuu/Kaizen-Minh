import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../constants/common';
import request from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import { setErrorMessages } from '../Global/reducer';
import {
  getDataRiskResultsSuccess,
  getDataRiskResultsRequest,
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
} from './reducer';
import { IAssessmentsCommentsState } from '../../types/AssessmentResult';

function* getDataRiskResultsFlow(action: PayloadAction<{ id: number }>) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getDataRiskResultsSuccess.type,
        payload: {
          assessmentResults: response.data,
        },
      });
    } else {
      yield put({ type: getDataRiskResultsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    if (error.response.status === STATUS_CODE.BAD_REQUEST) {
      history.replace(CLIENT_PATH.DASHBOARD);
    }
  }
}

function* getDataAssessmentsCommentsFlow(
  action: PayloadAction<{ id: number }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}/comments`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getDataAssessmentsCommentsSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({ type: getDataAssessmentsCommentsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    if (error.response.status === STATUS_CODE.BAD_REQUEST) {
      history.replace(CLIENT_PATH.DASHBOARD);
    }
  }
}

function* getDataAssessmentsHistoriesFlow(
  action: PayloadAction<{ id: number }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.ASSESSMENT_HISTORIES}/${id}`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getDataAssessmentsHistoriesSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({ type: getDataAssessmentsHistoriesFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    if (error.response.status === STATUS_CODE.BAD_REQUEST) {
      history.replace(CLIENT_PATH.DASHBOARD);
    }
  }
}

function* getDataAssessmentsHistoriesVersionFlow(
  action: PayloadAction<{ id: number }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}/histories`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getDataAssessmentsHistoriesVersionSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({ type: getDataAssessmentsHistoriesVersionFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    if (error.response.status === STATUS_CODE.BAD_REQUEST) {
      history.replace(CLIENT_PATH.DASHBOARD);
    }
  }
}

function* getDataAssessmentsActivityLogsFlow(
  action: PayloadAction<{ id: number }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}/activity-logs`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getDataAssessmentsActivityLogsSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({ type: getDataAssessmentsActivityLogsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    if (error.response.status === STATUS_CODE.BAD_REQUEST) {
      history.replace(CLIENT_PATH.DASHBOARD);
    }
  }
}

function* postDataAssessmentsCommentsFlow(
  action: PayloadAction<{ id: number; data: IAssessmentsCommentsState }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}/comments`,
      action.payload.data,
      METHOD.post
    );
    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = postDataAssessmentsCommentsSuccess;

      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: postDataAssessmentsCommentsFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: postDataAssessmentsCommentsFail.type });
  }
}

function* approveAssessmentResultsFlow(
  action: PayloadAction<{ id: number }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}/approve`,
      null,
      METHOD.put
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = approveAssessmentResultsSuccess;

      yield put({
        type
      });

      history.push({
        pathname: CLIENT_PATH.DASHBOARD,
        search: `?currentTab=${action.payload.redirectUrl}`
      });

    } else {
      yield put({ type: approveAssessmentResultsFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: approveAssessmentResultsFail.type });
  }
}

function* riskResultsWatcher() {
  yield takeEvery(getDataRiskResultsRequest, getDataRiskResultsFlow);
  yield takeEvery(
    getDataAssessmentsCommentsRequest,
    getDataAssessmentsCommentsFlow
  );
  yield takeEvery(
    getDataAssessmentsHistoriesVersionRequest,
    getDataAssessmentsHistoriesVersionFlow
  );
  yield takeEvery(
    getDataAssessmentsActivityLogsRequest,
    getDataAssessmentsActivityLogsFlow
  );
  yield takeEvery(
    getDataAssessmentsHistoriesRequest,
    getDataAssessmentsHistoriesFlow
  );
  yield debounce(500, postDataAssessmentsCommentsRequest, postDataAssessmentsCommentsFlow);
  yield debounce(500, approveAssessmentResultsRequest, approveAssessmentResultsFlow);
}

export default riskResultsWatcher;
