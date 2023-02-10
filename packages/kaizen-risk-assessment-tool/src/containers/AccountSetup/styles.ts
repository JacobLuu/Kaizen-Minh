import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RED,
  KAIZEN_GRAY
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
  .MuiFormHelperText-root.Mui-error {
    line-height: 14px;
  }

  .MuiIconButton-colorPrimary {
    color: ${KAIZEN_GRAY};
  }

  .MuiFormControlLabel-root.Mui-disabled {
    cursor: pointer;
  }

  .MuiCheckbox-colorPrimary.Mui-disabled {
    color: ${KAIZEN_GRAY};
  }

  .MuiCheckbox-colorPrimary.Mui-checked.Mui-disabled {
    color: ${KAIZEN_BLUE_LINK};
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }

  .group_input {
    padding-top: 35px;
    max-width: 500px;
  }

  .group_checkbox {
    padding: 30px 0;
    max-width: 550px;
  }

  .message_error {
    margin: 10px 60px 0;
    text-align: center;
    color: ${KAIZEN_RED};
    font-size: 12px;
  }

  .checkboxLabel {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #787878;
  }

  .text_strong {
    font-weight: bold;
    cursor: pointer;
  }

  .link_gdpr {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    text-decoration-line: underline;
    color: #787878;
  }

  .box_terms_of_service {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .MuiButtonBase-root {
      padding: 0 5px 0 0;
    }
  }

  .check_box_terms_of_service {
    cursor: pointer;
  }
`;

export const ModalButton = styled(Button)``;

export const ModalSignUp = styled(Dialog)`
  border-radius: 10px;

  .terms_of_service {
    padding: 20px 40px;
    max-width: 735px;
    background-color: #ffffff;
  }

  .modal_content {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    text-align: justify;
    color: ${KAIZEN_PRIMARY_COLOR};
    background-color: #f3f3f3;
    padding: 0 5px;
    box-sizing: border-box;
    height: 300px;
    overflow: auto;
  }

  .button_close {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
  }

  .header {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .header_title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    margin: 24px 0;
  }

  .sub_text {
    padding: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: justify;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .footer {
    .MuiButton-root {
      text-transform: none;
    }

    .button_agree.Mui-disabled {
      background-color: #a3a0a0;
    }
    display: flex;
    justify-content: flex-end;
  }
`;

export const Content = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  padding-bottom: 10px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
  }
  p {
    padding-bottom: 10px;
  }
  ul {
    list-style: decimal;
    padding-left: 20px;
    padding-bottom: 10px;
  }

  ul li {
    list-style-type: disc;
    padding-bottom: 5px;
  }

  .bold_text {
    font-weight: bold;
  }

  .list_number {
    list-style: decimal;
    padding-left: 20px;
  }

  .list_number::marker {
    font-weight: bold;
  }

  .list_number li {
    padding-bottom: 5px;
  }

  .list_alpha {
    padding-left: 10px;
    list-style-type: lower-alpha;
  }

  .list_alpha li {
    padding-bottom: 5px;
  }
`;
