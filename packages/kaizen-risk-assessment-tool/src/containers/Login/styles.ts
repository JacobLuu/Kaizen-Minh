import styled from 'styled-components';

import {
    KAIZEN_BLUE_LINK, KAIZEN_PRIMARY_COLOR, KAIZEN_RED
} from '../../themes/colors';

export const Form = styled.form`
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 21px;
    text-align: center;
    color: ${KAIZEN_BLUE_LINK};
  }

  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    text-align: center;
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

  .group_input {
    max-width: 400px;
  }

  .forgot_password {
    margin-bottom: 40px;
    color: ${KAIZEN_BLUE_LINK};
    font-size: 18px;
    text-decoration: none;
  }

  .message_error {
    margin-bottom: 20px;
  }

  .MuiFormHelperText-root.Mui-error {
    color: ${KAIZEN_RED}
  }

  .submit_button {
    text-transform: capitalize;
    font-weight: 500;
    letter-spacing: 0.15px;
    font-size: 18px;
  }
`;

export default Form;
