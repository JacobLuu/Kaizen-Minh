import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_BLUE_LINK,
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_WHITE,
} from '../../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 950px;
  margin: auto;
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
    margin-top: 100px;
  }

  .container {
    display: flex;
    justify-content: center;
    margin: 45px 0;
  }

  .group {
    width: 253px;
    height: 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    cursor: pointer;
    margin: auto;

    .group_label {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: ${KAIZEN_GREY};
      margin-top: 18px;
    }

    .icon {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${KAIZEN_BLUE_LINK};
      background-color: ${KAIZEN_BACKGROUND_COLOR};
      border-radius: 50%;
    }
  }

  .group_active {
    width: 253px;
    height: 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid ${KAIZEN_BLUE_LINK};
    border-radius: 8px;
    cursor: pointer;
    margin: auto;
    
    .group_label {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: ${KAIZEN_BLUE_LINK};
      margin-top: 18px;
    }

    .icon {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${KAIZEN_WHITE};
      background-color: ${KAIZEN_BLUE_LINK};
      border-radius: 50%;
    }
  }
`;
