import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import { STATUS_CODE } from '../../../constants/common';
import {
  getRiskRatingRequest,
  getRiskRatingSucceeded,
  getRiskRatingFailed
 } from './reducer';

function* riskRatingFlow() {
  try {
    const response = yield call(mainRequest, END_POINT.CHARTS.RISK_RATING, null , METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getRiskRatingSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getRiskRatingFailed.type });
    }
  } catch (error) {
    yield put({ type: getRiskRatingFailed.type, payload: error.response.data.message });
  }
}

function* riskRatingWatcher() {
  yield takeEvery(getRiskRatingRequest, riskRatingFlow);
}

export default riskRatingWatcher;
