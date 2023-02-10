import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginSlice from './containers/Login/reducer';
import signupSlice from './containers/Signup/reducer';
import AccountSetupSlice from './containers/AccountSetup/reducer';
import resetPasswordSlice from './containers/ResetPassword/reducer';
import forgotPasswordSlice from './containers/ForgotPassword/reducer';
import riskSetupSlice from './containers/RiskSetup/reducer';
import corporateProhibitedSlice from './containers/RiskSetup/AdvancedSettingsCorporate/reducer';
import individualProhibitedSlice from './containers/RiskSetup/AdvancedSettingsIndividual/reducer';
import history from './utils/history';
import globalStore from './containers/Global/reducer';
import DashboardStore from './containers/Dashboard/reducer';
import newCaseStore from './containers/NewCase/reducer';
import newCaseIndividualStore from './containers/NewCase/NewCaseIndividual/reducer';
import newCaseCorporateStore from './containers/NewCase/NewCaseCorporate/reducer';
import riskResultsStore from './containers/RiskResults/reducer';
import organizationsSlice from './containers/UsersManagement/Organizations/reducer';
import usersSlice from './containers/UsersList/reducer';
import myProgressSlice from './containers/Dashboard/MyProgress/reducer';
import riskRatingSlice from './containers/Dashboard/RiskRatings/reducer';
import teamInsightSlice from './containers/Dashboard/TeamInsights/reducer';
import activityLogSlice from './containers/Dashboard/ActivityLog/reducer';
import defaultLayoutStore from './containers/DefaultLayout/reducer';


const rootReducer = combineReducers({
  router: connectRouter(history),
  loginSlice,
  signupSlice,
  AccountSetupSlice,
  resetPasswordSlice,
  forgotPasswordSlice,
  riskSetupSlice,
  corporateProhibitedSlice,
  individualProhibitedSlice,
  globalStore,
  DashboardStore,
  newCaseStore,
  newCaseIndividualStore,
  newCaseCorporateStore,
  riskResultsStore,
  organizationsSlice,
  usersSlice,
  myProgressSlice,
  riskRatingSlice,
  teamInsightSlice,
  activityLogSlice,
  defaultLayoutStore,
});

export default rootReducer;