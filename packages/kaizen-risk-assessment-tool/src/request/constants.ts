export const METHOD = {
  get: 'get',
  post: 'post',
  put: 'put',
  del: 'delete',
};

export const END_POINT = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    VERIFY_TOKEN: '/auth/verify-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  ORGANIZATIONS: {
    ASSESSMENT_SETTINGS:'/organizations/assessment-settings',
    ORGANIZATIONS_LAST_UPDATED:'/organizations/last-updated',
    CORPORATE_PROHIBITED_CLIENTS:'/organizations/corporate-prohibited-clients',
    INDIVIDUAL_PROHIBITED_CLIENTS:'/organizations/individual-prohibited-clients'
  },
  ACCOUNT_INFO: {
    ME: '/me',
  },
  ASSESSMENTS: {
    MAIN: '/assessments',
    SETTINGS: '/assessments/settings',
    GET: '/assessments?direction=desc',
    CHECK_CORPORATE_PROHIBITED: '/assessments/check-corporate-prohibited-clients',
    CHECK_INDIVIDUAL_PROHIBITED: '/assessments/check-individual-prohibited-clients',
    ARCHIVE: '/assessments/archive',
    UNARCHIVE: '/assessments/unarchive',
    ASSIGN: '/assessments/assign',
    ASSESSMENT_HISTORIES: '/assessments/assessment-histories',
  },
  SETTINGS: '/settings',
  USERS: '/users',
  INVOLVED_ASSESSMENTS: '/involved-assessments',
  CHARTS: {
    RISK_RATING: '/me/risk-rating',
    PROGRESS: '/me/assessment-progress',
    TEAM_INSIGHT: '/me/team-insight'
  },
  ACTIVITY_LOG: '/me/activity-logs',
}
