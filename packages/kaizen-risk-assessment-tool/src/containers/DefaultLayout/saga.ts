import { call, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import mainRequest from '../../request';
import {
  SETTINGS,
  ASSESSMENTS_SETTINGS,
  LAST_UPDATED_SETTING,
} from '../../constants/localStorage';
import { EventEmitter, Events } from '../../utils/events';

import { END_POINT, METHOD } from '../../request/constants';
import { checkLastUpdatedRequest } from './reducer';

function* checkLastUpdatedFlow() {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.ORGANIZATIONS.ORGANIZATIONS_LAST_UPDATED,
      null,
      METHOD.get
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const lastUpdatedSetting = localStorage.getItem(LAST_UPDATED_SETTING);
      if (
        lastUpdatedSetting === null ||
        parseInt(lastUpdatedSetting, 10) !==
          parseInt(response.data?.last_updated_at, 10)
      ) {
        EventEmitter.dispatch(Events.UPDATE_SETTING, true);
        const settingResponse = yield call(
          mainRequest,
          END_POINT.SETTINGS,
          null,
          METHOD.get
        );
        if (settingResponse.status === STATUS_CODE.SUCCESS) {
          localStorage.removeItem(SETTINGS);
          localStorage.setItem(SETTINGS, JSON.stringify(settingResponse.data));
        }
        const assessmentSettingResponse = yield call(
          mainRequest,
          END_POINT.ASSESSMENTS.SETTINGS,
          null,
          METHOD.get
        );
        if (assessmentSettingResponse.status === STATUS_CODE.SUCCESS) {
          localStorage.removeItem(ASSESSMENTS_SETTINGS);
          localStorage.setItem(
            ASSESSMENTS_SETTINGS,
            JSON.stringify(assessmentSettingResponse.data)
          );
        }
        if (
          settingResponse.status === STATUS_CODE.SUCCESS &&
          assessmentSettingResponse.status === STATUS_CODE.SUCCESS
        )
        EventEmitter.dispatch(Events.UPDATE_SETTING, false);
        localStorage.setItem(
          LAST_UPDATED_SETTING,
          response.data?.last_updated_at
        );
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

function* defaultLayoutWatcher() {
  yield takeEvery(checkLastUpdatedRequest, checkLastUpdatedFlow);
}

export default defaultLayoutWatcher;
