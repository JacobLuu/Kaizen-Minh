import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_WHITE,
  KAIZEN_RED,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_BACKGROUND_COLOR,
} from '../../../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
    margin: 50px 0 15px 0;
    text-align: center;
  }

  .title_prohibited_client {
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 40px;
    color: ${KAIZEN_BLUE};
    margin-top: 45px;
    overflow-wrap: anywhere;
    text-align: center;
  }

  .subtitle_prohibited_client {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
    color: ${KAIZEN_RED};
    margin-top: 20px;
    justify-content: center;
    svg {
      margin-right: 10px;
    }
  }

  .is_prohibited_client {
    color: ${KAIZEN_RED};
  }

  .container {
    display: flex;
    justify-content: center;
    margin: 45px 0;
  }

  .active {
    border: 1px solid ${KAIZEN_BLUE_LINK};
  }

  .icon_active {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${KAIZEN_WHITE};
    background-color: ${KAIZEN_BLUE_LINK};
    border-radius: 50%;
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

  .group {
    width: 253px;
    height: 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .group_label {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
    margin-top: 18px;
  }

  .group_label_active {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_BLUE_LINK};
    margin-top: 18px;
  }
`;

export const CompanyIncorporatedOption = styled.div`
  .MuiFormGroup-root {
    flex-direction: row;
  }

  .MuiRadio-colorSecondary.Mui-checked {
    color: ${KAIZEN_BLUE_LINK};
  }

  .radio_group {
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }

  .radio_group_listed {
    padding: 10px 0;
    margin-left: 10px;
    box-sizing: border-box;
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }
`;
