import { call, put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import request from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';

import {
  checkIndividualProhibitedClientsRequest,
  checkIndividualProhibitedClientsSuccess,
  checkIndividualProhibitedClientsFail,
} from './reducer';

import { setErrorMessages } from '../../Global/reducer';

function* checkIndividualProhibitedClientsFlow(action) {
  try {
    const response = yield call(
      request,
      END_POINT.ASSESSMENTS.CHECK_INDIVIDUAL_PROHIBITED,
      action.payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = checkIndividualProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: checkIndividualProhibitedClientsFail.type });
    }
  } catch (error) {
    yield put({ type: setErrorMessages.type, payload: [error] });
  }
}

function* newCaseIndividualWatcher() {
  yield takeEvery(
    checkIndividualProhibitedClientsRequest,
    checkIndividualProhibitedClientsFlow
  );
}

export default newCaseIndividualWatcher;
