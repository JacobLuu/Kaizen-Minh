import moment from 'moment-timezone';
import { ACCESS_TOKEN } from '../constants/localStorage';
import { STATUS_CODE } from '../constants/common';
import CLIENT_PATH from '../constants/clientPath';
import API_HOST from '../constants/apiHosts';
import history from './history';
import toast from '../components/Toast';
import {
  removeCachedUrl,
  removeToken,
  removeUserRole,
  removeAccountInfo,
} from './localStorage';

const token = localStorage.getItem(ACCESS_TOKEN);

const downloadExcelSilently = (blobExcelFile, filename) => {
  const url = window.URL.createObjectURL(blobExcelFile);
  const hiddenAnchor = document.createElement('a');
  hiddenAnchor.href = url;
  hiddenAnchor.download = filename;
  document.body.appendChild(hiddenAnchor);
  hiddenAnchor.click();
  window.URL.revokeObjectURL(url);
};

export const downloadFile = async ({ id }) => {
  const response = await fetch(
    `${API_HOST.BASE_URL}assessments/${id}/export`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/vnd.ms-excel',
        'x-timezone': moment.tz.guess()
      }),
    }
  );

  const fileName = response.headers.get('response-file-name') || `Case-${id}.xlsx`;

  if (response.status === STATUS_CODE.SUCCESS) {
    const blobResponse = await response.blob();
    downloadExcelSilently(blobResponse, fileName);
  } else if (response.status === STATUS_CODE.UNAUTHORIZED) {
    removeToken();
    removeAccountInfo();
    removeUserRole();
    removeCachedUrl();
    response.json().then((res) => {
      toast.error(res.message);
    });
    history.replace(CLIENT_PATH.LOGIN);
  } else {
    response.json().then((res) => {
      toast.error(res.message);
    });
  }
};

export const downloadFileZip = async ({ ids }) => {
  const response = await fetch(
    `${API_HOST.BASE_URL}assessments/export`,
    {
      method: 'post',
      headers: new Headers({
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
        'x-timezone': moment.tz.guess(),
      }),
      body: JSON.stringify({ ids }),
    }
  );

  const fileName = response.headers.get('response-file-name') || 'Cases-completed.zip';

  if (response.status === STATUS_CODE.SUCCESS) {
    const blobResponse = await response.blob();
    downloadExcelSilently(blobResponse, fileName);
  } else if (response.status === STATUS_CODE.UNAUTHORIZED) {
    removeToken();
    removeAccountInfo();
    removeUserRole();
    removeCachedUrl();
    response.json().then((res) => {
      toast.error(res.message);
    });
    history.replace(CLIENT_PATH.LOGIN);
  } else {
    response.json().then((res) => {
      toast.error(res.message);
    });
  }

};
