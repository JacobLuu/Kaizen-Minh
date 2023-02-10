import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RED,
  KAIZEN_GRAY,
  KAIZEN_WHITE
} from '../../themes/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  .title {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 21px;
    color: ${KAIZEN_BLUE_LINK};
  }
  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    opacity: 0.75;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    padding: 40px 0;
    box-sizing: border-box;
    max-width: 600px;
    margin: auto;
    color: ${KAIZEN_PRIMARY_COLOR};
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }

  .group-input {
    max-width: 350px;
  }

  .message_error {
    margin: 10px 0 25px;
    text-align: center;
    color: ${KAIZEN_RED};
    font-size: 12px;
  }

  .MuiButton-contained.Mui-disabled {
    background-color: ${KAIZEN_GRAY};
    color: ${KAIZEN_WHITE};
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const Container = styled(Card)`
  width: 768px;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  box-sizing: border-box;
  margin: auto;
  padding-bottom: 50px;
  form {
    padding: 20px;
  }
`;

export const BackLogin = styled(Link)`
  margin-bottom: 40px;
  padding: 0;
  color: ${KAIZEN_BLUE_LINK};
  font-size: 18px;
  text-decoration: none;
`;
