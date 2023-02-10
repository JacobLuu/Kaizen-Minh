import {
  ACCESS_TOKEN,
  CACHED_URL,
  USER_ROLE,
  ACCOUNT_INFO,
  SETTINGS,
  LAST_UPDATED_SETTING,
  ASSESSMENTS_SETTINGS,
} from '../constants/localStorage';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const getCachedUrl = () => localStorage.getItem(CACHED_URL);

export const removeCachedUrl = () => localStorage.removeItem(CACHED_URL);

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  window.dispatchEvent(new Event('storage'));
};

export const removeAccountInfo = () => localStorage.removeItem(ACCOUNT_INFO);

export const removeLastUpdated = () =>
  localStorage.removeItem(LAST_UPDATED_SETTING);

export const removeAssessmentsSettings = () =>
  localStorage.removeItem(ASSESSMENTS_SETTINGS);

export const removeSettings = () => localStorage.removeItem(SETTINGS);

export const removeUserRole = () => localStorage.removeItem(USER_ROLE);

export const isHavingToken = () => !!getToken();

export const currentUserRole = JSON.parse(localStorage.getItem(USER_ROLE));

export const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));
