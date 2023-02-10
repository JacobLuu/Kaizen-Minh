import {
  call,
  put,
  takeEvery,
  debounce
} from 'redux-saga/effects';
import { setErrorMessages, setSuccessMessages } from '../../Global/reducer';
import mainRequest from '../../../request';
import { METHOD } from '../../../request/constants';
import { STATUS_CODE, INDUSTRY } from '../../../constants/common';
import { IAddOrganization, IGetOrganizations } from '../../../types/Organizations'
import TOAST_MESSAGE from '../../../constants/toastMessage';
import {
  getOrganizationsRequested,
  getOrganizationsSucceeded,
  getOrganizationsFailed,
  addOrganizationRequest,
  addOrganizationSucceeded,
  addOrganizationFailed,
 } from './reducer';

function* getOrganizationsFlow<T extends IGetOrganizations = IGetOrganizations>
({ payload }: { payload: T }) {
  const getFilterURL = () => {
    const industryParam = payload.selectedIndustry.toLowerCase() === INDUSTRY.LAW
    || payload.selectedIndustry.toLowerCase() === INDUSTRY.ACCOUNTING
    ? `&industry=${payload.selectedIndustry.toLowerCase()}` : '';
    const searchParam =  payload.searchedCharacters.length !== 0 ? `&search=${payload.searchedCharacters}` : '';
    return `/organizations?direction=desc&offset=${payload.offset}&limit=${payload.limit}${industryParam.concat(searchParam)}`
  };

  try {
    const response = yield call(mainRequest, getFilterURL(), {
      responseType: 'blob'       
}, METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getOrganizationsSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getOrganizationsFailed.type });
    }
  } catch (error: any) {
    yield put({ type: getOrganizationsFailed.type, payload: error.response.data.message });
  }
}

function* addOrganizationFlow<T extends IAddOrganization = IAddOrganization>
({ payload }: { payload: T }) {
  try {
    const response = yield call(mainRequest, '/organizations', payload, METHOD.post);

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = addOrganizationSucceeded;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.ADD_ORGANIZATION.SUCCESS],
      });
    } else {
      yield put({ type: addOrganizationFailed.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [TOAST_MESSAGE.ADD_ORGANIZATION.FAIL],
    });
    yield put({ type: addOrganizationFailed.type, payload: error.response.data.message });
  }
}

function* organizationsWatcher() {
  yield debounce(500,getOrganizationsRequested, getOrganizationsFlow);
  yield takeEvery(addOrganizationRequest, addOrganizationFlow);
}

export default organizationsWatcher;
