import { call, put, debounce, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import {
  registerRequest,
  registerSuccess,
  registerFail,
  verifyInvitationRequest,
  verifyInvitationSuccess,
  verifyInvitationFail,
} from './reducer';
import { IAccountSetupInputs } from './AccountSetup';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';

function* registerFlow<T extends IAccountSetupInputs = IAccountSetupInputs>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.AUTH.SIGNUP,
      payload,
      METHOD.post
    );
    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = registerSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.ACCOUNT_SET_UP.SUCCESS],
      });
    } else {
      yield put({ type: registerFail.type });
    }
  } catch (error: any) {
    yield put({
      type: registerFail.type,
      payload: error.response.data.message,
    });
  }
}

function* postVerifyInvitationFlow({ payload }) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.AUTH.VERIFY_TOKEN,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = verifyInvitationSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: verifyInvitationFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: verifyInvitationFail.type });
    history.replace(CLIENT_PATH.EXPIRED);
  }
}
function* registerWatcher() {
  yield takeEvery(verifyInvitationRequest, postVerifyInvitationFlow);
  yield debounce(500, registerRequest, registerFlow);
}

export default registerWatcher;
