import styled from 'styled-components';
import {
  KAIZEN_WHITE,
  KAIZEN_GREY,
  KAIZEN_ROUNDED_BORDER_COLOR,
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

  .wrapper_title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .wrapper_subtitle {
    margin: 20px 0;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .rounded-box {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    border: 1px solid ${KAIZEN_ROUNDED_BORDER_COLOR};
    padding: 30px 30px;
    border-radius: 4px;
  }

  .rounded-box_title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_BLUE};
  }

  .rounded-box_subtitle {
    margin: 10px 0 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_GREY};
  }

  .rounded-box_text-button {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    background: none;
    height: fit-content;
    .MuiTypography-body1 {
      color: ${KAIZEN_BLUE_LINK};
      text-transform: none;
    }
  }

  .MuiButton-label {
    width: max-content;
  }

  .rounded-box_container-button {
    font-weight: 500;
    font-size: 16px;
    height: 51px;
    width: 139px;
    border-radius: 50px;
    .MuiTypography-body1 {
      color: ${KAIZEN_WHITE};
      text-transform: none;
      line-height: 51px;
    }
  }

`;

export default Wrapper;
