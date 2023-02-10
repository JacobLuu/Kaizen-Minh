import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import {
  getRiskAssessmentSetupRequest,
  getRiskAssessmentSetupSuccess,
  getRiskAssessmentSetupFail,
  saveRiskAssessmentSetupRequest,
  saveRiskAssessmentSetupSuccess,
  saveRiskAssessmentSetupFail,
} from './reducer';
import { setSuccessMessages, setErrorMessages } from '../Global/reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';

interface IRiskSetupPayload {

}

function* getRiskAssessmentSetupStateFlow() {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.ORGANIZATIONS.ASSESSMENT_SETTINGS,
      null,
      METHOD.get,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getRiskAssessmentSetupSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getRiskAssessmentSetupFail.type });
    }
  } catch (error) {
    yield put({
      type: getRiskAssessmentSetupFail.type,
      payload: error.response?.data?.message || '',
    });
  }
}

function* saveRiskAssessmentSetupStateFlow<
  T extends IRiskSetupPayload = IRiskSetupPayload
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.ORGANIZATIONS.ASSESSMENT_SETTINGS,
      payload,
      METHOD.post,
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = saveRiskAssessmentSetupSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.SAVE_CHANGED.SUCCESS]
      });
    } else {
      yield put({ type: saveRiskAssessmentSetupFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.SAVE_CHANGED.FAIL] });
    yield put({
      type: saveRiskAssessmentSetupFail.type,
      payload: error.response.data.message,
    });
  }
}

function* riskSetupWatcher() {
  yield debounce(500, saveRiskAssessmentSetupRequest, saveRiskAssessmentSetupStateFlow);
  yield takeEvery(getRiskAssessmentSetupRequest, getRiskAssessmentSetupStateFlow);
}

export default riskSetupWatcher;
