import { call, put, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import mainRequest from '../../request';
import { METHOD } from '../../request/constants';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import { signupRequest, signupSuccess, signupFail } from './reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';

interface ISignupInputs {
  email: string;
}

function* signupFlow<T extends ISignupInputs = ISignupInputs>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(
      mainRequest,
      '/auth/verify-email',
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = signupSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.EMAIL_VERIFICATION.SUCCESS],
      });
    } else {
      yield put({ type: signupFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.EMAIL_VERIFICATION.FAIL],
    });
    yield put({
      type: signupFail.type,
      payload: error.response.data?.message,
    });
  }
}

function* signupWatcher() {
  yield debounce(500, signupRequest, signupFlow);
}

export default signupWatcher;
