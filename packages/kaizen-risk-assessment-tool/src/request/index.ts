import axios from 'axios';
import moment from 'moment-timezone';
import { ACCESS_TOKEN } from '../constants/localStorage';
import {
  removeToken,
  removeUserRole,
  removeAccountInfo,
  removeSettings,
  removeLastUpdated,
  removeAssessmentsSettings
} from '../utils/localStorage';
import { STATUS_CODE } from '../constants/common';
import CLIENT_PATH from '../constants/clientPath';
import history from '../utils/history';
import { METHOD } from './constants';
import APIHost from '../constants/apiHosts';

const { get } = METHOD;
// get, post, del, put

const mainRequestConfig = {
  baseURL: APIHost.BASE_URL,
};

const mainAxiosInstance = axios.create(mainRequestConfig);

mainAxiosInstance.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'x-timezone': moment.tz.guess(),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

mainAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
      localStorage.removeItem(ACCESS_TOKEN);
      removeToken();
      removeAccountInfo();
      removeUserRole();
      removeSettings();
      removeLastUpdated();
      removeAssessmentsSettings();
      history.replace(CLIENT_PATH.LOGIN);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const mainRequest = (url, values, method) => {
  const data = values;
  let params;
  if (method === get) {
    params = values;
  }

  return mainAxiosInstance({ url, data, params, method });
};
export default mainRequest;
