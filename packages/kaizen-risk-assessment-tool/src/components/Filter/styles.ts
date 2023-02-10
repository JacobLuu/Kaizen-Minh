import styled from 'styled-components';
import {
  KAIZEN_BLUE_LINK,
} from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const FilterStyles = styled.div`
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;

    img {
      margin-left: 5px;

        fill:red

    }
    svg {
      visibility: hidden;
      width: 14px;
      font-size: 20px;
      height: 14px;
      color: #030303;
      margin-left: 5px;
    }
    &:hover{
      svg {
      margin-left: 5px;
      visibility: visible;
      width: 14px;
      font-size: 20px;
      height: 14px;
      color: #030303;
    }
    }
  }

  .wrapper_case_id {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: ${KAIZEN_BLUE_LINK};
  }
`;
