/* eslint-disable no-param-reassign */

import {
  getToken,
  getCachedUrl,
  removeCachedUrl,
  isHavingToken,
} from './localStorage';

function isEncoded(uri) {
  uri = uri || '';
  return uri !== decodeURIComponent(uri);
}

const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  // if the uri is encoded, then we decode, else return the result
  if (isEncoded(results[2]))
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  return results[2];
};

export const getTrimmedObject = (object) => {
  return Object.entries(object).reduce((acc, curr) => {
    const [key, value] = curr;
    return {
      ...acc,
      [key]: typeof value === 'string' ? value.trim() : value,
    };
  }, {});
};

export const defaultFunction = () => undefined;

export default {
  getToken,
  getCachedUrl,
  removeCachedUrl,
  isHavingToken,
  defaultFunction,
  getParameterByName,
  getTrimmedObject,
};
