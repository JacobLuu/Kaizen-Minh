import React, { useEffect } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import path from './constants/clientPath';
import AdminAccess from './containers/AdminAccess';
import ResetPassword from './containers/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutSidebar from './containers/DefaultLayout';
import history from './utils/history';
import 'react-toastify/dist/ReactToastify.css';
import { getLocationPrompt } from './utils/locationPrompt';
import { ACCESS_TOKEN } from './constants/localStorage';
import { removeCachedUrl } from './utils/localStorage';
import cookieControlConfig from './utils/cookiesControl';
import { consentCookieExpiry } from './constants/common';

function App() {
  const s3ConfigPath = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
  if (s3ConfigPath) {
    history.replace(s3ConfigPath);
  }

  useEffect(() => {
    const cookieControl = window.CookieControl;
    if (consentCookieExpiry) {
      Object.assign(cookieControlConfig, { consentCookieExpiry });
    }

    cookieControl.load(cookieControlConfig);
  }, []);

  return (
    <HashRouter
      getUserConfirmation={(message, callback) => {
        const locationPrompt = getLocationPrompt();
        const allowTransition = window.confirm(message);
        if (allowTransition && locationPrompt === '/login') {
          localStorage.removeItem(ACCESS_TOKEN);
          removeCachedUrl();
        }
        callback(allowTransition);
      }}
    >
      <Switch>
        {/**
         * PUBLIC PATHS
         *  */}
        <Route
          exact
          path={path.LOGIN}
          component={(props) => <AdminAccess {...props} />}
        />
        <Route
          path={path.REGISTER}
          component={(props) => <AdminAccess {...props} />}
        />
        <Route
          exact
          path={path.SIGNUP}
          component={(props) => <AdminAccess {...props} />}
        />
        <Route
          exact
          path={path.FORGOT_PASSWORD}
          component={(props) => <AdminAccess {...props} />}
        />
        <Route path={path.RESET_PASSWORD} component={ResetPassword} />
        <Route
          path={path.EXPIRED}
          component={(props) => <AdminAccess {...props} />}
        />
        {/**
         * PROTECTED PATHS
         */}
        <ProtectedRoute path={path.ROOT} component={LayoutSidebar} />
      </Switch>
    </HashRouter>
  );
}

export default App;
