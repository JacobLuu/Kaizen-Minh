import styled from 'styled-components';
import { isSuperAdmin } from '../../../../utils/roles';

const Container = styled.div`
  min-width: ${isSuperAdmin() ? '800px' : '510px'};
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
    color: #80869b;
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
    width: ${isSuperAdmin() ? '47%' : '100%'};
  }

  .field-container-outside {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: ${isSuperAdmin() ? '30%' : '45%'};
    margin-right: 40px;
  }

  .form-container {
    width: ${isSuperAdmin() ? '65%' : '45%'};
  }

  .action {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .save-button {
    margin-left: 30px;
    background: #2196f3;
    color: #fff;
  }
`;

export default Container;