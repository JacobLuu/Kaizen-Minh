import {
  call,
  put,
  debounce,
} from 'redux-saga/effects';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import { STATUS_CODE } from '../../constants/common';
import { ACCOUNT_INFO,ACCESS_TOKEN,USER_ROLE } from '../../constants/localStorage';
import { loginRequest, loginSuccess, loginFail } from './reducer';

interface ILoginPayload {
  email: string,
  password: string,
}

function* loginFlow<T extends ILoginPayload = ILoginPayload>({ payload }: { payload: T}) {
  try {
    const response = yield call(mainRequest, END_POINT.AUTH.SIGNIN, payload, METHOD.post);
    const {token,roles} = response.data;
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(USER_ROLE, JSON.stringify(roles));

    if (response.status === STATUS_CODE.SUCCESS) {
      // get me
      const loginResponse = yield call(mainRequest, END_POINT.ACCOUNT_INFO.ME , null, METHOD.get);
      if (loginResponse.status === STATUS_CODE.SUCCESS) {
        localStorage.setItem(ACCOUNT_INFO, JSON.stringify(loginResponse.data));
      } 
      const { type } = loginSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: loginFail.type });
    }
  } catch (error) {
    yield put({ type: loginFail.type, payload: error.response.data.message });
  }
}

function* loginWatcher() {
  yield debounce(500, loginRequest, loginFlow);
}

export default loginWatcher;
