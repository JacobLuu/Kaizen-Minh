import { call, put, debounce } from 'redux-saga/effects';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import { STATUS_CODE } from '../../constants/common';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
} from './reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';

interface INewPasswordRequest {
  payload: {
    email: string;
  };
}

function* newPasswordRequest({ payload }: INewPasswordRequest) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.AUTH.FORGOT_PASSWORD,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = forgotPasswordSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.EMAIL_VERIFICATION.SUCCESS],
      });
    } else {
      yield put({ type: forgotPasswordFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.EMAIL_VERIFICATION.FAIL],
    });
    yield put({
      type: forgotPasswordFail.type,
      payload: error.response.data.message,
    });
  }
}

function* loginWatcher() {
  yield debounce(500, forgotPasswordRequest, newPasswordRequest);
}

export default loginWatcher;
