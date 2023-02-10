/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { KAIZEN_PRIMARY_COLOR } from '../../../../themes/colors';

export const Container = styled.div`
  min-width: 800px;
  height: 339px;
  border-radius: 25px;
  padding: 50px 45px 30px;
  display: flex;
  flex-direction: column;
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
    margin-bottom: 40px;
  }

  .fields-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
  }

  .fields-wrapper-internal {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .field-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 47%;
  }

  .field-container-outside {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 30%;
    margin-right: 40px;
  }

  .form-container {
    width: 65%;
  }

  .action {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .save-button {
    margin-left: 30px;
  }
`;