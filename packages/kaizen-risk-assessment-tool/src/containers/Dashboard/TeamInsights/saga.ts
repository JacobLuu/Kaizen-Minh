import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import { STATUS_CODE } from '../../../constants/common';
import {
  getTeamInsightRequest,
  getTeamInsightSucceeded,
  getTeamInsightFailed,
 } from './reducer';

function* teamInsightFlow() {
  try {
    const response = yield call(mainRequest, END_POINT.CHARTS.TEAM_INSIGHT , null, METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getTeamInsightSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getTeamInsightFailed.type });
    }
  } catch (error) {
    yield put({ type: getTeamInsightFailed.type, payload: error.response.data.message });
  }
}

function* teamInsightWatcher() {
  yield takeEvery(getTeamInsightRequest, teamInsightFlow);

}

export default teamInsightWatcher;
