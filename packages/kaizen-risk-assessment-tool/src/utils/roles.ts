/* eslint-disable import/no-cycle */
import { currentUserRole } from './localStorage';
import { ROLES, INDUSTRY } from '../constants/common';
import { ACCOUNT_INFO } from '../constants/localStorage';

export const isAdmin = () => {
  return currentUserRole?.includes(ROLES.ADMIN);
};

export const isSuperAdmin = () => {
  return currentUserRole?.includes(ROLES.SUPER_ADMIN);
};

export const isManager = () => {
  return currentUserRole?.includes(ROLES.MANAGER);
};

export const isStandardUser = () => {
  return currentUserRole?.includes(ROLES.USER);
};

export const isAccountingOrganization = () => {
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));
  return accountInfo?.organization?.industry === INDUSTRY.ACCOUNTING;
};
