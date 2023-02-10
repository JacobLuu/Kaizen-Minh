import { call, put, debounce, takeEvery, select } from 'redux-saga/effects';
import TOAST_MESSAGE from '../../constants/toastMessage';
import {
  CHANGE_ASSESSMENT_CASE_ACTION,
  STATUS_CODE,
} from '../../constants/common';
import mainRequest from '../../request';
import hookConvertObjectToQueryString from '../../utils/hookConvertObjectToQueryString';
import { END_POINT, METHOD } from '../../request/constants';
import {
  getHistoryDataRequest,
  getHistoryDataSuccess,
  getHistoryDataFail,
  archiveCasesSucceed,
  unArchiveCasesSucceed,
  archiveCasesFailed,
  unArchiveCasesFailed,
  archiveCasesRequest,
  unArchiveCasesRequest,
  assignCasesRequest,
} from './reducer';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import { getRiskRatingRequest } from './RiskRatings/reducer';
import { getTeamInsightRequest } from './TeamInsights/reducer';

function* DashboardFlow({ payload }) {
  const value = hookConvertObjectToQueryString(payload);

  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ASSESSMENTS.GET}&${value}`,
      null,
      METHOD.get
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getHistoryDataSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getHistoryDataFail.type });
    }
  } catch (error) {
    yield put({ type: getHistoryDataFail.type });
  }
}

function* editCasesFlow({ payload }) {
  const action = yield select((state) => state.DashboardStore.currentAction);
  const getFilterURL = () => {
    const url = '';
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.ARCHIVE) {
      return url.concat(END_POINT.ASSESSMENTS.ARCHIVE);
    }
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE) {
      return url.concat(END_POINT.ASSESSMENTS.UNARCHIVE);
    }
    if (action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT) {
      return url.concat(END_POINT.ASSESSMENTS.ASSIGN);
    }
    return url;
  };
  try {
    const response = yield call(
      mainRequest,
      getFilterURL(),
      payload,
      METHOD.put
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = archiveCasesSucceed;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: unArchiveCasesSucceed.type,
        payload: response.data,
      });

      if (action === CHANGE_ASSESSMENT_CASE_ACTION.ARCHIVE) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.ARCHIVE_CASES.SUCCESS],
        });

        yield put(getRiskRatingRequest());
        yield put(getTeamInsightRequest());
      } else if (action === CHANGE_ASSESSMENT_CASE_ACTION.UNARCHIVE) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.UNARCHIVE_CASES.SUCCESS],
        });
        yield put(getRiskRatingRequest());
      } else if (action === CHANGE_ASSESSMENT_CASE_ACTION.ASSIGNMENT) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.ASSIGN_CASES.SUCCESS],
        });
      } else {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.EXPORT_RESULT.SUCCESS],
        });
      }
    } else {
      yield put({ type: archiveCasesFailed.type });
      yield put({ type: unArchiveCasesFailed.type });
    }
  } catch (error: any) {
    yield put({
      type: archiveCasesFailed.type,
      payload: error?.response?.data?.message,
    });
    yield put({
      type: unArchiveCasesFailed.type,
      payload: error?.response?.data?.message,
    });
    yield put({
      type: setErrorMessages.type,
      payload: [`Failed. ${error?.response?.data?.message}`],
    });
  }
}

function* DashboardWatcher() {
  yield takeEvery(archiveCasesRequest, editCasesFlow);
  yield takeEvery(unArchiveCasesRequest, editCasesFlow);
  yield takeEvery(assignCasesRequest, editCasesFlow);
  yield debounce(500, getHistoryDataRequest, DashboardFlow);
}

export default DashboardWatcher;
