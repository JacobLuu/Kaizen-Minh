import styled from 'styled-components';
import {
  KAIZEN_WHITE,
  KAIZEN_GREY,
  KAIZEN_BLUE,
  KAIZEN_BLUE_LINK,
  KAIZEN_PRIMARY_COLOR,
} from '../../themes/colors';


export const Wrapper = styled.div`
  padding: 30px 30px 47vh 30px;
  margin-bottom: 20px;
  background-color: ${KAIZEN_WHITE};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;

  .wrapper_back_support{
    display: flex;
    color: ${KAIZEN_BLUE};
    align-items: center;
  }

  .wrapper_title {
    margin-left: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: ${KAIZEN_BLUE};
  }

  .wrapper_subtitle {
    margin: 20px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .rounded-box {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    box-shadow: 0px 0px 20px rgba(128, 134, 155, 0.2);
    padding: 20px 20px;
    border-radius: 8px;
    cursor: pointer;
  }

  .rounded-box_title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${KAIZEN_BLUE};
  }

  .rounded-box_subtitle {
    margin: 10px 0 0;
    font-weight: 400;
    font-size: 14px;
    color: ${KAIZEN_GREY};
    line-height: 30px;
  }

  .rounded-box_text-button {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    height: fit-content;
    border-radius: 15px;
    .MuiTypography-body1 {
      color: ${KAIZEN_BLUE_LINK};
      text-transform: none;
    }
  }

`;

export default Wrapper;
