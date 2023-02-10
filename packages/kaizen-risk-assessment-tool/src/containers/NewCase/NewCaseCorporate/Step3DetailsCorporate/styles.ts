import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_WHITE,
  // KAIZEN_BLUE,
  KAIZEN_BLUE_LINK,
  KAIZEN_TEXT_GRAY,
  KAIZEN_BACKGROUND_COLOR,
} from '../../../../themes/colors';

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
    text-align: center;
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

  .MuiTypography-body1{
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_TEXT_GRAY};
  }

  .wrapper_content_detail_title{
    display: block;
  	display: -webkit-box;
  	font-size: 16px;
  	line-height: 1.3;
  	-webkit-line-clamp: 1;
  	-webkit-box-orient: vertical;
  	overflow: hidden;
  	text-overflow: ellipsis;
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
    margin-bottom: 5px;
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }

  .radio_group_listed {
    padding: 10px 0;
    margin: 0px 0px 5px 10px;
    box-sizing: border-box;
    .MuiFormControlLabel-root:last-child {
      margin-right: 0px;
    }
  }
`;
