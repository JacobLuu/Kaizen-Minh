import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { KAIZEN_TEXT_GRAY } from '../../../../themes/colors';

const DialogContainer = styled(Dialog)`
  .dialog-content {
    padding: 30px;
  }

  .dialog-title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    padding-bottom: 20px;
  }

  .dialog-content-list {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${KAIZEN_TEXT_GRAY};
    max-height: 300px;
    overflow: auto;
    padding-right: 10px;
    margin: 10px 0px 10px 20px;
    .case-wrapper {
      display: flex;
      margin-bottom: 10px;
      .case-id {
        margin-right: 5px;
      }
      .case-name {
      }
    }
  }
`;

export default DialogContainer;
