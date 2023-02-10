import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import mainRequest from '../../../request';
import { METHOD, END_POINT } from '../../../request/constants';
import TOAST_MESSAGE from '../../../constants/toastMessage';
import {
  CorporateProhibitedClients,
  AddCorporateProhibitedClients,
  EditCorporateProhibitedClients,
  DeleteCorporateProhibitedClients,
} from '../../../types/CorporateAdvancedSetting';
import {
  editCorporateProhibitedClientsRequest,
  editCorporateProhibitedClientsSuccess,
  editCorporateProhibitedClientsFail,
  addCorporateProhibitedClientsRequest,
  addCorporateProhibitedClientsSuccess,
  addCorporateProhibitedClientsFail,
  getCorporateProhibitedClientsRequest,
  getCorporateProhibitedClientsSuccess,
  getCorporateProhibitedClientsFail,
  deleteCorporateProhibitedClientsRequest,
  deleteCorporateProhibitedClientsSuccess,
  deleteCorporateProhibitedClientsFail,
} from './reducer';
import {
  setSuccessMessages,
  setErrorMessages,
} from '../../Global/reducer';

function* getCorporateProhibitedClientsStateFlow<
  T extends CorporateProhibitedClients = CorporateProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.CORPORATE_PROHIBITED_CLIENTS}?limit=${payload.limit}&offset=${payload.offset}`,
      null,
      METHOD.get
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getCorporateProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getCorporateProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: getCorporateProhibitedClientsFail.type,
      payload: error.response?.data?.message || '',
    });
  }
}

function* addCorporateProhibitedClientsStateFlow<
  T extends AddCorporateProhibitedClients = AddCorporateProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.ORGANIZATIONS.CORPORATE_PROHIBITED_CLIENTS,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = addCorporateProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.ADD_COMPANY.SUCCESS],
      });
    } else {
      yield put({ type: addCorporateProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.ADD_COMPANY.FAIL]
    });
    yield put({
      type: addCorporateProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* editCorporateProhibitedClientsStateFlow<
  T extends EditCorporateProhibitedClients = EditCorporateProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.CORPORATE_PROHIBITED_CLIENTS}/${payload.id}`,
      payload.data,
      METHOD.put
    );

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = editCorporateProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.SAVE_CHANGED.SUCCESS],
      });

      yield put({
        type:  getCorporateProhibitedClientsRequest.type,
        payload: {
          limit: payload.limit,
          offset: payload.offset,
        }
      })
    } else {
      yield put({ type: editCorporateProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.SAVE_CHANGED.FAIL],
    });
    yield put({
      type: editCorporateProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* deleteCorporateProhibitedClientsStateFlow<
  T extends DeleteCorporateProhibitedClients = DeleteCorporateProhibitedClients
>({ payload }: { payload: T }) {
  try {
    const response = yield call(
      mainRequest,
      `${END_POINT.ORGANIZATIONS.CORPORATE_PROHIBITED_CLIENTS}/${payload.id}`,
      null,
      METHOD.del
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = deleteCorporateProhibitedClientsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.DELETE_COMPANY.SUCCESS],
      });
    } else {
      yield put({ type: deleteCorporateProhibitedClientsFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.DELETE_COMPANY.FAIL],
    });
    yield put({
      type: deleteCorporateProhibitedClientsFail.type,
      payload: error.response.data.message,
    });
  }
}

function* CorporateProhibitedClientsWatcher() {
  yield debounce(
    500,
    editCorporateProhibitedClientsRequest,
    editCorporateProhibitedClientsStateFlow
  );
  yield debounce(
    500,
    addCorporateProhibitedClientsRequest,
    addCorporateProhibitedClientsStateFlow
  );
  yield debounce(
    500,
    deleteCorporateProhibitedClientsRequest,
    deleteCorporateProhibitedClientsStateFlow
  );
  yield takeEvery(
    getCorporateProhibitedClientsRequest,
    getCorporateProhibitedClientsStateFlow
  );
}

export default CorporateProhibitedClientsWatcher;
