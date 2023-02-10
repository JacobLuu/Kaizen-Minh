import styled from 'styled-components';
import {
  KAIZEN_TEXT_RATING_HIGH,
  KAIZEN_TEXT_RATING_MEDIUM,
  KAIZEN_TEXT_RATING_LOW,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RED,
} from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${KAIZEN_PRIMARY_COLOR};
  span {
    color: ${KAIZEN_RED};
  }

  .text_high {
    color: ${KAIZEN_TEXT_RATING_HIGH};
  }

  .text_medium {
    color: ${KAIZEN_TEXT_RATING_MEDIUM};
  }

  .text_low {
    color: ${KAIZEN_TEXT_RATING_LOW};
  }
`;

export const Recommendation = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${KAIZEN_PRIMARY_COLOR};
  ul {
    padding-left: 15px;
  }
`;
