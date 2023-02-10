import React from 'react';
import { useLocation } from 'react-router';
import CLIENT_PATH from '../../constants/clientPath';
import Images from '../../assets/images';
import Login from '../Login';
import Signup from '../Signup';
import AccountSetup from '../AccountSetup';
import ForgotPassword from '../ForgotPassword';
import Expired from '../Expired';

import { Wrapper, Box, Logo } from './styles';

function AdminAccess() {
  const location = useLocation();
  const scrollToTopRef = React.useRef(null);
  const scrollTop = () => {
    scrollToTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  React.useEffect(() => {
    setTimeout(scrollTop(), 500);
  }, []);

  return (
    <Wrapper ref={scrollToTopRef}>
      <Box>
        <Logo>
          <img
            src={Images.img_logo}
            style={{ margin: 'auto' }}
            alt="logo"
            width="200"
          />
        </Logo>

        {location.pathname === CLIENT_PATH.LOGIN && <Login />}
        {location.pathname === CLIENT_PATH.SIGNUP && <Signup />}
        {location.pathname === CLIENT_PATH.REGISTER && <AccountSetup />}
        {location.pathname === CLIENT_PATH.FORGOT_PASSWORD && <ForgotPassword />}
        {location.pathname === CLIENT_PATH.EXPIRED && <Expired />}
      </Box>
    </Wrapper>
  );
}

export default AdminAccess;
