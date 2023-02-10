/* eslint-disable import/no-cycle */
import moment from 'moment';
import { isAccountingOrganization } from '../utils/roles';

export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  REQUESTING: 'REQUESTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  REVOKED: 'revoked',
};

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED_SUCCESS: 201,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

export default {
  REQUEST_STATUS,
  STATUS_CODE,
  USER_STATUS,
  ROLES,
};

export const ASSESSMENT_CATEGORY = {
  CORPORATE: 'corporate',
  INDIVIDUAL: 'individual',
};

export const ASSESSMENT_TARGET_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

export const RISK_RATING = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  NA: 'n/a',
};

export const OPTION_DATATYPE = {
  PROFESSION: 'profession',
  COUNTRY: 'country',
};

export const NOT_APPLICABLE = 'N/A';

export const TOKEN_TYPE = {
  INVITATION: 'invitation',
  FORGOT_PASSWORD: 'forgot_password',
};

export const RISK_SCORES = {
  LOWER_BOUND_LOW_RISK_SCORE: 0,
  UPPER_BOUND_LOW_RISK_SCORE: 2,
  LOWER_BOUND_HIGH_RISK_SCORE: 3.5,
  UPPER_BOUND_HIGH_RISK_SCORE: 5,
};

export const RISK_SCORES_RANGE = {
  LOW_RANGE: 2,
  MEDIUM_RANGE: 1.5,
  HIGH_RANGE: 1.5,
  TOTAL_SCORE: 5,
};

export const INDUSTRY = {
  LAW: 'law',
  ACCOUNTING: 'accounting',
};

export const USER_STATUS_ACTION_URL = {
  DEACTIVATE_URL: '/deactivate',
  ACTIVATE_URL: '/activate',
  RESEND_URL: '/resend-invitation',
  DEACTIVATE_INVITATION_URL: '/deactivate-invitation',
};

export const CHANGE_USER_STATUS_ACTION = {
  DEACTIVATE_USER: 'DEACTIVATE_USER',
  REACTIVE_USER: 'ACTIVATE_USER',
  RESEND_INVITATION: 'RESEND_INVITATION',
  DEACTIVATE_INVITATION: 'INVALIDATE_INVITATION',
};

export const CHANGE_ASSESSMENT_CASE_ACTION = {
  ASSIGNMENT: 'ASSIGNMENT',
  ARCHIVE: 'ARCHIVE',
  UNARCHIVE: 'UNARCHIVE',
  EXPORT: 'EXPORT',
};

export const ASSESSMENT_STATUS = {
  IN_PROGRESS: 'in_progress',
  PENDING_REVIEW: 'pending_review',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  ABORTED: 'aborted',
};

export const TAB_VALUE = {
  IN_PROGRESS: 0,
  PENDING_REVIEW: 1,
  COMPLETED: 2,
  ARCHIVED: 3,
  ABORTED: 4,
};

export const ASSESSMENT_RISK_RATING = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};


export const SKELETON_LOADING_TYPE = {
  TABLE: 'table',
  PIE_CHART: 'pie_chart',
  BAR_CHART: 'bar_chart',
};

export const LIMIT_TEXT_SHOW_TOOLTIP = 52;

export const ORGANIZATION_LIMIT_TEXT_SHOW_TOOLTIP = 30;

export const DEFAULT_VALUE = 0;

export const MAX_DATE = moment().endOf('day');

export const MIN_DATE = moment(new Date(1902, 0, 0)).startOf('day');

export const INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID || 119
    );
  }
  return process.env.LAW_INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID || 101;
})();

export const CORPORATE_PC_PROHIBITED_CLIENT_NOT_APPLICABLE = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_CORPORATE_PC_PROHIBITED_CLIENT_NOT_APPLICABLE ||
      101271
    );
  }
  return (
    process.env.LAW_CORPORATE_PC_PROHIBITED_CLIENT_NOT_APPLICABLE || 101001
  );
})();

export const CORPORATE_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_CORPORATE_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED ||
      101272
    );
  }
  return (
    process.env.LAW_CORPORATE_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED || 101002
  );
})();

export const INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID || 215
    );
  }
  return process.env.LAW_INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID || 201;
})();

export const INDIVIDUAL_PC_PROHIBITED_CLIENT_NOT_APPLICABLE = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_INDIVIDUAL_PC_PROHIBITED_CLIENT_NOT_APPLICABLE ||
      201079
    );
  }
  return (
    process.env.LAW_INDIVIDUAL_PC_PROHIBITED_CLIENT_NOT_APPLICABLE || 201001
  );
})();

export const INDIVIDUAL_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED = (() => {
  if (isAccountingOrganization()) {
    return (
      process.env.ACCOUNTING_INDIVIDUAL_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED ||
      201080
    );
  }
  return (
    process.env.LAW_INDIVIDUAL_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED || 201002
  );
})();

export const CLIENT_IS_NOT_LISTED_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_CLIENT_IS_NOT_LISTED_ID || 101298;
  }
  return process.env.LAW_CLIENT_IS_NOT_LISTED_ID || 101028;
})();

// this is the default id used for searching 'Corporate Client TypeId'
export const CORPORATE_CLIENT_TYPE_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_CORPORATE_CLIENT_TYPE_ID || 120;
  }
  return process.env.LAW_CORPORATE_CLIENT_TYPE_ID || 102;
})();

// this is the default id used for searching 'Listed Status'
export const CORPORATE_LISTED_STATUS_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_CORPORATE_LISTED_STATUS_ID || 121;
  }
  return process.env.LAW_CORPORATE_LISTED_STATUS_ID || 103;
})();

// this is the default id used for searching 'Jurisdiction (Country of Incorporation)'
export const JURISDICTION_INCORPORATION_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_JURISDICTION_INCORPORATION_ID || 124;
  }
  return process.env.LAW_JURISDICTION_INCORPORATION_ID || 106;
})();

// this is the default id used for searching 'Jurisdiction (Country of Operation)'
export const JURISDICTION_OPERATION_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_JURISDICTION_OPERATION_ID || 125;
  }
  return process.env.LAW_JURISDICTION_OPERATION_ID || 107;
})();

// this is the default id used for searching 'Country of Residency'
export const COUNTRY_OF_RESIDENCE_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_COUNTRY_OF_RESIDENCE_ID || 219;
  }
  return process.env.LAW_COUNTRY_OF_RESIDENCE_ID || 205;
})();

// this is the default id used for searching 'Profession / Sector'
export const PROFESSION_OF_SECTOR_ID = (() => {
  if (isAccountingOrganization()) {
    return process.env.ACCOUNTING_PROFESSION_OF_SECTOR_ID || 220;
  }
  return process.env.LAW_PROFESSION_OF_SECTOR_ID || 206;
})();

// CookieControl variables

export const stateKaizenKeyword = 'kaizen';
export const consentCookieExpiry =
  process.env.REACT_APP_COOKIE_CONTROL_EXPIRED_DATE || 90;
