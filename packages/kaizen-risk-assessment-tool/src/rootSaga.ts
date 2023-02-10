import { all } from 'redux-saga/effects';
import loginSaga from './containers/Login/saga';
import signupSaga from './containers/Signup/saga';
import accountSetupSaga from './containers/AccountSetup/saga';
import resetPasswordSaga from './containers/ResetPassword/saga';
import forgotPasswordSaga from './containers/ForgotPassword/saga';
import riskSetupSaga from './containers/RiskSetup/saga';
import corporateProhibitedClientsSaga from './containers/RiskSetup/AdvancedSettingsCorporate/saga';
import individualProhibitedClientsSaga from './containers/RiskSetup/AdvancedSettingsIndividual/saga';
import DashboardSaga from './containers/Dashboard/saga';
import newCaseSaga from './containers/NewCase/saga';
import newCaseCorporateSaga from './containers/NewCase/NewCaseCorporate/saga';
import newCaseIndividualSaga from './containers/NewCase/NewCaseIndividual/saga';
import riskResultsSaga from './containers/RiskResults/saga';
import organizationsSaga from './containers/UsersManagement/Organizations/saga';
import usersSaga from './containers/UsersList/saga';
import progressChartSaga from './containers/Dashboard/MyProgress/saga';
import riskRatingChartSaga from './containers/Dashboard/RiskRatings/saga';
import teamInsightChartSaga from './containers/Dashboard/TeamInsights/saga';
import activityLogSaga from './containers/Dashboard/ActivityLog/saga';
import defaultLayoutSaga from './containers/DefaultLayout/saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    signupSaga(),
    accountSetupSaga(),
    resetPasswordSaga(),
    forgotPasswordSaga(),
    riskSetupSaga(),
    corporateProhibitedClientsSaga(),
    individualProhibitedClientsSaga(),
    DashboardSaga(),
    newCaseSaga(),
    newCaseCorporateSaga(),
    newCaseIndividualSaga(),
    riskResultsSaga(),
    organizationsSaga(),
    usersSaga(),
    progressChartSaga(),
    riskRatingChartSaga(),
    teamInsightChartSaga(),
    activityLogSaga(),
    defaultLayoutSaga(),
  ]);
}