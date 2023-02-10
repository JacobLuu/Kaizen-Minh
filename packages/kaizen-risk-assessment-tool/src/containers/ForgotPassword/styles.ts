import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { KAIZEN_BLUE_LINK, KAIZEN_PRIMARY_COLOR } from '../../themes/colors';


export const Back = styled(ArrowBackIcon)`
  margin-right: 10px;
  color: ${KAIZEN_BLUE_LINK};
`;

export const Form = styled.form`
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    left: -10px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 21px;
    color: ${KAIZEN_BLUE_LINK};
  }

  .subtitle {
    opacity: 0.75;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
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
    width: 300px;
  }
`;
  