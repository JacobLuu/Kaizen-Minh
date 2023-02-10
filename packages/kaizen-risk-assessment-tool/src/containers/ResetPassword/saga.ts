import { call, put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  postVerifyTokenRequest,
  postVerifyTokenSuccess,
  postVerifyTokenFail,
} from './reducer';
import { IResetPassword } from './ResetPassword';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';
import validation from '../../translations/validation';

function* resetPasswordFlow<T extends IResetPassword = IResetPassword>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.AUTH.RESET_PASSWORD,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = resetPasswordSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.RESET_PASSWORD.SUCCESS],
      });
    } else {
      yield put({ type: resetPasswordFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.RESET_PASSWORD.FAIL],
    });
    yield put({
      type: resetPasswordFail.type,
      payload: validation.field_password_format,
    });
  }
}

function* postVerifyTokenFlow({ payload }) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.AUTH.VERIFY_TOKEN,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = postVerifyTokenSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: postVerifyTokenFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: postVerifyTokenFail.type });
    history.replace(CLIENT_PATH.EXPIRED);
  }
}

function* resetPasswordWatcher() {
  yield takeEvery(postVerifyTokenRequest, postVerifyTokenFlow);
  yield takeEvery(resetPasswordRequest, resetPasswordFlow);
}

export default resetPasswordWatcher;
