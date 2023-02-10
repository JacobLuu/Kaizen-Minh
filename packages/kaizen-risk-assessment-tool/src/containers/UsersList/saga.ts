import { call, put, takeEvery, select, debounce } from 'redux-saga/effects';
import mainRequest from '../../request';
import { METHOD, END_POINT } from '../../request/constants';
import {
  STATUS_CODE,
  ROLES,
  USER_STATUS_ACTION_URL,
} from '../../constants/common';
import { IGetUsers, IAddUser, IEditUser } from '../../types/UsersList';
import {
  getUsersRequested,
  getUsersFailed,
  getUsersSucceeded,
  addUserFailed,
  addUserRequest,
  addUserSucceeded,
  editUserSucceeded,
  editUserFailed,
  editUserRequest,
  updateInvitationFailed,
  updateInvitationRequested,
  updateInvitationSucceeded,
  changeUserStatusRequest,
  getInvolvedAssessmentsRequested,
  getInvolvedAssessmentsSucceeded,
  getInvolvedAssessmentsFailed,
} from './reducer';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import TOAST_MESSAGE from '../../constants/toastMessage';


function* getUsersFlow<T extends IGetUsers = IGetUsers>({
  payload,
}: {
  payload: T;
}) {
  const orgs = yield select((state) => state.organizationsSlice.list);
  const getFilterURL = () => {
    const orgIdList = orgs.map((org) => org.id);
    const organizationIdParam = orgIdList.includes(payload.selectedOrganization)
      ? `&organization_id=${payload.selectedOrganization}`
      : '';
    const userStatus = payload.userStatus
      ? `&status=${payload.userStatus}`
      : '';
    const roleParam =
      payload.selectedRole.toLowerCase() === ROLES.ADMIN ||
      payload.selectedRole.toLowerCase() === ROLES.MANAGER ||
      payload.selectedRole.toLowerCase() === ROLES.USER
        ? `&role=${payload.selectedRole.toLowerCase()}`
        : '';
    const searchParam = payload.searchedCharacters
      ? `&search=${payload.searchedCharacters}`
      : '';
    const offsetParam = payload.offset ? `&offset=${payload.offset}` : '';
    const limitParam = payload.limit ? `&limit=${payload.limit}` : '';
    return `${END_POINT.USERS}?direction=desc${roleParam.concat(
      offsetParam,
      limitParam,
      organizationIdParam,
      searchParam,
      userStatus
    )}`;
  };

  try {
    const response = yield call(mainRequest, getFilterURL(), null, METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getUsersSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getUsersFailed.type });
    }
  } catch (error: any) {
    yield put({
      type: getUsersFailed.type,
      payload: error.response.data.message,
    });
  }
}

function* getInvolvedAssessmentsFlow({payload}) {
  try {
    const response = yield call(mainRequest,`${END_POINT.USERS}/${payload}${END_POINT.INVOLVED_ASSESSMENTS}`, null, METHOD.get);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getInvolvedAssessmentsSucceeded;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getInvolvedAssessmentsFailed.type });
    }
  } catch (error: any) {
    yield put({
      type: getInvolvedAssessmentsFailed.type,
      payload: error.response.data.message,
    });
  }
}

function* addUserFlow<T extends IAddUser = IAddUser>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(
      mainRequest,
      END_POINT.USERS,
      payload,
      METHOD.post
    );

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = addUserSucceeded;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [TOAST_MESSAGE.SEND_INVITATION.SUCCESS],
      });
    } else {
      yield put({ type: addUserFailed.type });
      yield put({
        type: setErrorMessages.type,
        payload: [TOAST_MESSAGE.SEND_INVITATION.FAIL],
      });
    }
  } catch (error: any) {
    yield put({
      type: addUserFailed.type,
      payload: error.response.data.message,
    });
    yield put({
      type: setErrorMessages.type,
      payload: [`Failed to invite. ${error?.response?.data?.message}`],
    });
  }
}

function* editUserFlow<T extends IEditUser = IEditUser>({
  payload,
}: {
  payload: T;
}) {
  const userId = yield select((state) => state.usersSlice.userId);
  const getFilterURL = () => {
    const url = `${END_POINT.USERS}/${userId}`;
    if (payload === USER_STATUS_ACTION_URL.DEACTIVATE_URL) {
      return url.concat(USER_STATUS_ACTION_URL.DEACTIVATE_URL);
    }
    if (payload === USER_STATUS_ACTION_URL.ACTIVATE_URL) {
      return url.concat(USER_STATUS_ACTION_URL.ACTIVATE_URL);
    }
    if (payload === USER_STATUS_ACTION_URL.DEACTIVATE_INVITATION_URL) {
      return url.concat(USER_STATUS_ACTION_URL.DEACTIVATE_INVITATION_URL);
    }
    if (payload === USER_STATUS_ACTION_URL.RESEND_URL) {
      return url.concat(USER_STATUS_ACTION_URL.RESEND_URL);
    }
    return url;
  };
  try {
    const response = yield call(
      mainRequest,
      getFilterURL(),
      payload,
      METHOD.put
    );

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = editUserSucceeded;

      yield put({
        type,
        payload: response.data,
      });

      yield put({
        type: updateInvitationSucceeded.type,
        payload: response.data,
      });

      if (payload === USER_STATUS_ACTION_URL.DEACTIVATE_URL) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.DEACTIVATE_USER.SUCCESS]
        })
      }
      else if (payload === USER_STATUS_ACTION_URL.ACTIVATE_URL) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.REACTIVE_USER.SUCCESS]
        })
      }
      else if (payload === USER_STATUS_ACTION_URL.DEACTIVATE_INVITATION_URL) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.INVALIDATE_INVITATION.SUCCESS]
        })
      }
      else if (payload === USER_STATUS_ACTION_URL.RESEND_URL) {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.SEND_INVITATION.SUCCESS]
        })
      } else {
        yield put({
          type: setSuccessMessages.type,
          payload: [TOAST_MESSAGE.EDIT_USER.SUCCESS]
        })
      }
    } else {
      yield put({ type: editUserFailed.type });
      yield put({ type: updateInvitationFailed.type });
    }
  } catch (error) {
    yield put({
      type: editUserFailed.type,
      payload: error.response.data.message,
    });
    yield put({
      type: updateInvitationFailed.type,
      payload: error.response.data.message,
    });
    yield put({
      type: setErrorMessages.type,
      payload: [`Failed. ${error?.response?.data?.message}`],
    });
  }
}

function* usersWatcher() {
  yield debounce(500, getUsersRequested, getUsersFlow);
  yield takeEvery(getInvolvedAssessmentsRequested, getInvolvedAssessmentsFlow);
  yield takeEvery(addUserRequest, addUserFlow);
  yield takeEvery(editUserRequest, editUserFlow);
  yield takeEvery(updateInvitationRequested, editUserFlow);
  yield takeEvery(changeUserStatusRequest, editUserFlow);
}

export default usersWatcher;
