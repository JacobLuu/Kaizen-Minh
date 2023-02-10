import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Wrapper } from './styles';
import { isSuperAdmin, isAdmin } from '../../utils/roles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';
import {
  accountInfo
} from '../../utils/localStorage';

function DefaultPage() {

  React.useEffect(() => {
      if (isSuperAdmin()) {
        history.replace(CLIENT_PATH.USER_MANAGEMENT);
      } else if (isAdmin()) {
        history.replace(CLIENT_PATH.RISK_SETUP);
      } else {
        history.replace(CLIENT_PATH.DASHBOARD);
      }
  }, [accountInfo]);

  return (
      <Wrapper>
        <LoadingOverlay active spinner />
      </Wrapper>
  );
}

export default React.memo(DefaultPage);
