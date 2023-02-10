import styled from 'styled-components';
import {
  KAIZEN_BLUE,
  KAIZEN_TEXT_RATING_MEDIUM,
  KAIZEN_TEXT_RATING_LOW,
  KAIZEN_TEXT_RATING_HIGH,
} from '../../themes/colors';

export const Results = styled.div`
  margin-top: 40px;
  text-align: center;

  .wrapper_result_title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: ${KAIZEN_BLUE};
    padding-bottom: 10px;
    span {
      padding-left: 10px;
    }
  }

  .wrapper_result_high {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: ${KAIZEN_TEXT_RATING_HIGH};
  }

  .wrapper_result_medium {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: ${KAIZEN_TEXT_RATING_MEDIUM};
  }

  .wrapper_result_low {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: ${KAIZEN_TEXT_RATING_LOW};
  }
`;

export default null;
