import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

import {
  KAIZEN_GREY,
  KAIZEN_TEXT_GRAY,
  KAIZEN_PRIMARY_COLOR,
} from '../../themes/colors';

export const Container = styled(Dialog)`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    padding-bottom: 10px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .description {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_TEXT_GRAY};
    padding: 20px 0;
  }

  .content {
    box-sizing: border-box;
  }

  .content_categoryReferenceDescription {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    padding-top: 5px;
  }

  .labelField {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_GREY};
    padding-bottom: 5px;
  }

  .MuiButton-outlined {
    padding: 0 20px;
  }

  .MuiButton-contained {
    padding: 0 20px;
  }

  .MuiDialog-paperFullWidth {
    padding: 30px 45px;
  }
`;

export default null;
