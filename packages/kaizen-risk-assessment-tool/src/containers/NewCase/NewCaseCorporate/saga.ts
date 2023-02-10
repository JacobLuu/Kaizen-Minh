import { call, put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import request from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import { setErrorMessages } from '../../Global/reducer';
import {
  checkCorporateProhibitedClientsRequest,
  checkCorporateProhibitedClientsSuccess,
  checkCorporateProhibitedClientsFail,
} from './reducer';

function* checkCorporateProhibitedClientsFlow(action) {
  try {
    const response = yield call(
      request,
      END_POINT.ASSESSMENTS.CHECK_CORPORATE_PROHIBITED,
      action.payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = checkCorporateProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: checkCorporateProhibitedClientsFail.type });
    }
  } catch (error) {
    yield put({ type: setErrorMessages.type, payload: [error] });
  }
}

function* newCaseWatcher() {
  yield takeEvery(
    checkCorporateProhibitedClientsRequest,
    checkCorporateProhibitedClientsFlow
  );
}

export default newCaseWatcher;
