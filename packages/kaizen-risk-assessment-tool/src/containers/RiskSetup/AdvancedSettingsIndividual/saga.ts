import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import TOAST_MESSAGE from '../../../constants/toastMessage';
import {
  IndividualProhibitedClients,
  AddIndividualProhibitedClients,
  EditIndividualProhibitedClients,
  DeleteIndividualProhibitedClients,
} from '../../../types/IndividualAdvancedSetting';
import {
  editIndividualProhibitedClientsRequest,
  editIndividualProhibitedClientsSuccess,
  editIndividualProhibitedClientsFail,
  addIndividualProhibitedClientsRequest,
  addIndividualProhibitedClientsSuccess,
  addIndividualProhibitedClientsFail,
  getIndividualProhibitedClientsRequest,
  getIndividualProhibitedClientsSuccess,
  getIndividualProhibitedClientsFail,
  deleteIndividualProhibitedClientsRequest,
  deleteIndividualProhibitedClientsSuccess,
  deleteIndividualProhibitedClientsFail,
} from './reducer';
import {
  setSuccessMessages,
  setErrorMessages,
} from '../../Global/reducer';

function* getIndividualProhibitedClientsStateFlow<
  T extends IndividualProhibitedClients = IndividualProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.INDIVIDUAL_PROHIBITED_CLIENTS}?limit=${payload.limit}&offset=${payload.offset}`,
      null,
      METHOD.get
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getIndividualProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getIndividualProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: getIndividualProhibitedClientsFail.type,
      payload: error.response?.data?.message || '',
    });
  }
}

function* addIndividualProhibitedClientsStateFlow<
  T extends AddIndividualProhibitedClients = AddIndividualProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.ORGANIZATIONS.INDIVIDUAL_PROHIBITED_CLIENTS,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = addIndividualProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.ADD_INDIVIDUAL.SUCCESS]
      });
    } else {
      yield put({ type: addIndividualProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.ADD_INDIVIDUAL.FAIL]
    });
    yield put({
      type: addIndividualProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* editIndividualProhibitedClientsStateFlow<
  T extends EditIndividualProhibitedClients = EditIndividualProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.INDIVIDUAL_PROHIBITED_CLIENTS}/${payload.id}`,
      payload.data,
      METHOD.put
    );

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = editIndividualProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.SAVE_CHANGED.SUCCESS],
      });

      yield put({
        type: getIndividualProhibitedClientsRequest.type,
        payload: {
          limit: payload.limit,
          offset: payload.offset,
        }})
    } else {
      yield put({ type: editIndividualProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.SAVE_CHANGED.FAIL],
    });
    yield put({
      type: editIndividualProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* deleteIndividualProhibitedClientsStateFlow<
  T extends DeleteIndividualProhibitedClients = DeleteIndividualProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.INDIVIDUAL_PROHIBITED_CLIENTS}/${payload.id}`,
      null,
      METHOD.del
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = deleteIndividualProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.DELETE_INDIVIDUAL.SUCCESS],
      });
    } else {
      yield put({ type: deleteIndividualProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.DELETE_INDIVIDUAL.FAIL],
    });
    yield put({
      type: deleteIndividualProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* IndividualProhibitedClientsWatcher() {
  yield debounce(
    500,
    editIndividualProhibitedClientsRequest,
    editIndividualProhibitedClientsStateFlow
  );
  yield debounce(
    500,
    addIndividualProhibitedClientsRequest,
    addIndividualProhibitedClientsStateFlow
  );
  yield debounce(
    500,
    deleteIndividualProhibitedClientsRequest,
    deleteIndividualProhibitedClientsStateFlow
  );
  yield takeEvery(
    getIndividualProhibitedClientsRequest,
    getIndividualProhibitedClientsStateFlow
  );
}

export default IndividualProhibitedClientsWatcher;
