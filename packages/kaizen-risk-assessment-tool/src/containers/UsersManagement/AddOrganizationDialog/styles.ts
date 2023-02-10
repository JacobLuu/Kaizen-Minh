/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { KAIZEN_PRIMARY_COLOR } from '../../../themes/colors';

export const Container = styled.div`
  width: 483px;
  min-height: 420px;
  border-radius: 25px;
  padding: 50px 45px 30px;
  .form-label {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;

    letter-spacing: 0.01em;

    color: #80869b;
  }

  .title {
    color: ${KAIZEN_PRIMARY_COLOR};
    font-size: 16px;
    font-weight: 700;
    line-height: 21px;
    margin-bottom: 10px;
  }

  .field-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    height: 100px;
  }

  .action {
    margin-top: 80px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .warning-text {
    font-size: 10px;
    display: flex;
    justify-content: flex-end;
    line-height: 15px;
    color: #80869b;
  }
`;