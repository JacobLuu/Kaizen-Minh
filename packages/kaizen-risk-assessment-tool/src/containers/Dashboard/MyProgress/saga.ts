import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import { STATUS_CODE } from '../../../constants/common';
import {
  getProgressRequest,
  getProgressSucceeded,
  getProgressFailed
 } from './reducer';

function* progressFlow() {
  try {
    const response = yield call(mainRequest, END_POINT.CHARTS.PROGRESS , null , METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getProgressSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getProgressFailed.type });
    }
  } catch (error) {
    yield put({ type: getProgressFailed.type, payload: error.response.data.message });
  }
}

function* progressWatcher() {
  yield takeEvery(getProgressRequest, progressFlow);
}

export default progressWatcher;
