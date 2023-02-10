import React from 'react';
import  Button  from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CLIENT_PATH from '../../constants/clientPath';
import { Wrapper } from './styles';

function Expired() {
  return (
    <Wrapper>
      The URL you requested is invalid or has expired Please contact your
      organization&apos;s admin for support.
      <Button component={Link} color='primary' to={CLIENT_PATH.LOGIN} variant='text'>Login</Button>
    </Wrapper>
  );
}

export default React.memo(Expired);
