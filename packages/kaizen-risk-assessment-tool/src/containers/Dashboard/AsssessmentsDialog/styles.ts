import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { KAIZEN_PRIMARY_COLOR, KAIZEN_TEXT_GRAY } from '../../../themes/colors';

const DialogContainer = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    padding: 20px;
    max-width: 700px;
  }
  .MuiTypography-h6 {
    color: ${KAIZEN_PRIMARY_COLOR};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
  }

  .MuiDialogContentText-root {
    color: ${KAIZEN_TEXT_GRAY};
  }

  .MuiInputLabel-formControl {
    color: ${KAIZEN_TEXT_GRAY};
  }

  .select-wrapper {
    width: 50%;
  }

  .action {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 20px;
    }
  }

  .dialog-content-list {
    margin: 40px 30px 40px 90px;
    .case-wrapper {
      display: flex;
      margin-bottom: 15px;
      .case-id {
        margin-right: 20px;
        width: 20%;
      }
      .case-name {
        width: 80%;
      }
    }
  }

  .select-assignee-title {
    margin: 0 0 30px 0;
    .select-assignee-text {
      margin-bottom: 15px;
    }
  }
`;

export default DialogContainer;
