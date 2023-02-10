import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import { STATUS_CODE } from '../../../constants/common';
import {
  getActivityLogRequest,
  getActivityLogSucceed,
  getActivityLogFailed,
 } from './reducer';

function* activityLogFlow() {
  try {
    const response = yield call(mainRequest, END_POINT.ACTIVITY_LOG , null, METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getActivityLogSucceed;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getActivityLogFailed.type });
    }
  } catch (error) {
    yield put({ type: getActivityLogFailed.type, payload: error.response.data.message });
  }
}

function* activityLogWatcher() {
  yield takeEvery(getActivityLogRequest, activityLogFlow);

}

export default activityLogWatcher;