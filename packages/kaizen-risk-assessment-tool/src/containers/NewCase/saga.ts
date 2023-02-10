import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import CLIENT_PATH from '../../constants/clientPath';
import { STATUS_CODE, ASSESSMENT_CATEGORY } from '../../constants/common';
import { SETTINGS, ASSESSMENTS_SETTINGS } from '../../constants/localStorage';
import request from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import { IPostDataNewCase } from '../../types/newCase/NewCaseCorporate';
import history from '../../utils/history';

import {
  postNewCaseDataRequest,
  postNewCaseDataSuccess,
  postNewCaseDataFail,
  updateNewCaseDataRequest,
  updateNewCaseDataSuccess,
  updateNewCaseDataFail,
  getDataNewCaseSettingsRequest,
  getDataNewCaseSettingsSuccess,
  getDataNewCaseSettingsFail,
  getDataAssessmentsCaseRequest,
  getDataAssessmentsCaseSuccess,
  getDataAssessmentsCaseFail,
  getDataAssessmentsSettingsRequest,
  getDataAssessmentsSettingsSuccess,
  getDataAssessmentsSettingsFail,
} from './reducer';

import {
  getCorporateNewCaseSettingsDataSuccess,
  getCorporateAssessmentsSettingsDataSuccess,
  getCorporateAssessmentCaseDataSuccess,
} from './NewCaseCorporate/reducer';

import {
  getDataNewCaseSettingsIndividualSuccess,
  getDataAssessmentsSettingsIndividualSuccess,
  getDataAssessmentsCaseIndividualSuccess,
} from './NewCaseIndividual/reducer';

function* postDataNewCaseFlow(action: PayloadAction<IPostDataNewCase>) {
  try {
    const response = yield call(
      request,
      END_POINT.ASSESSMENTS.MAIN,
      action.payload.data,
      METHOD.post
    );
    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = postNewCaseDataSuccess;

      yield put({
        type,
        payload: response.data,
      });

      history.push({
        pathname: CLIENT_PATH.DASHBOARD,
        search: `?currentTab=${action.payload.redirectUrl}`,
      });

      yield put({
        type: setSuccessMessages.type,
        payload: [action.payload.toastMessage],
      });
    } else {
      yield put({ type: postNewCaseDataFail.type });
    }
  } catch (error) {
    yield put({
      type: postNewCaseDataFail.type,
      payload: error.response.data?.invalidParams[0]?.message,
    });
  }
}

function* updateDataNewCaseFlow(
  action: PayloadAction<{
    id: number;
    isBackToDashboard?: boolean;
    data: IPostDataNewCase;
  }>
) {
  const { id } = action.payload;
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${id}`,
      action.payload.data,
      METHOD.put
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateNewCaseDataSuccess;

      yield put({
        type,
        payload: response.data,
      });

      if (action.payload.isBackToDashboard) {
        history.push({
          pathname: CLIENT_PATH.DASHBOARD,
          search: `?currentTab=${action.payload.redirectUrl}`,
        });
      } else {
        history.push({
          pathname: `${CLIENT_PATH.RISK_RESULT}/${id}`,
        });
      }

      yield put({
        type: setSuccessMessages.type,
        payload: [action.payload.toastMessage],
      });
    } else {
      yield put({ type: updateNewCaseDataFail.type });
    }
  } catch (error) {
    yield put({ type: updateNewCaseDataFail.type });
  }
}

function* settingFlow() {
  try {
    const response = JSON.parse(localStorage.getItem(SETTINGS));
    if (response) {
      const { type } = getDataNewCaseSettingsSuccess;
      yield put({
        type,
      });

      const { type: SettingsCorporate } =
        getCorporateNewCaseSettingsDataSuccess;
      yield put({
        type: SettingsCorporate,
        payload: response,
      });

      const { type: SettingsIndividual } =
        getDataNewCaseSettingsIndividualSuccess;
      yield put({
        type: SettingsIndividual,
        payload: response,
      });
    } else {
      yield put({ type: getDataNewCaseSettingsFail.type });
    }
  } catch (error) {
    yield put({ type: getDataNewCaseSettingsFail.type });
  }
}

function* getDataAssessmentsSettingsFlow() {
  try {
    const response = JSON.parse(localStorage.getItem(ASSESSMENTS_SETTINGS));
    if (response) {
      const { type } = getDataAssessmentsSettingsSuccess;
      yield put({
        type,
        payload: response,
      });

      const { type: assessmentsSettingsCorporate } =
        getCorporateAssessmentsSettingsDataSuccess;
      yield put({
        type: assessmentsSettingsCorporate,
        payload: response,
      });

      const { type: assessmentsSettingsIndividual } =
        getDataAssessmentsSettingsIndividualSuccess;
      yield put({
        type: assessmentsSettingsIndividual,
        payload: response,
      });
    } else {
      yield put({ type: getDataAssessmentsSettingsFail.type });
    }
  } catch (error) {
    if (error.response) {
      yield put({
        type: setErrorMessages.type,
        payload: [error.response.message],
      });
    }
  }
}

function* getDataAssessmentsCaseFlow(action: PayloadAction<{ id: string }>) {
  try {
    const response = yield call(
      request,
      `${END_POINT.ASSESSMENTS.MAIN}/${action.payload.id}`,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getDataAssessmentsCaseSuccess;
      yield put({
        type,
        payload: response.data,
      });

      if (response.data.target_type === ASSESSMENT_CATEGORY.CORPORATE) {
        const { type: assessmentsCaseCorporate } =
          getCorporateAssessmentCaseDataSuccess;
        yield put({
          type: assessmentsCaseCorporate,
          payload: response.data,
        });
      }

      if (response.data.target_type === ASSESSMENT_CATEGORY.INDIVIDUAL) {
        const { type: assessmentsCaseIndividual } =
          getDataAssessmentsCaseIndividualSuccess;
        yield put({
          type: assessmentsCaseIndividual,
          payload: response.data,
        });
      }
    } else {
      yield put({ type: getDataAssessmentsCaseFail.type });
    }
  } catch (error) {
    if (error.response) {
      yield put({
        type: setErrorMessages.type,
        payload: [error.response.data.message],
      });
    }
  }
}

function* newCaseWatcher() {
  yield takeEvery(
    getDataAssessmentsSettingsRequest,
    getDataAssessmentsSettingsFlow
  );
  yield takeEvery(getDataAssessmentsCaseRequest, getDataAssessmentsCaseFlow);
  yield takeEvery(getDataNewCaseSettingsRequest, settingFlow);
  yield debounce(500, postNewCaseDataRequest, postDataNewCaseFlow);
  yield debounce(500, updateNewCaseDataRequest, updateDataNewCaseFlow);
}

export default newCaseWatcher;
