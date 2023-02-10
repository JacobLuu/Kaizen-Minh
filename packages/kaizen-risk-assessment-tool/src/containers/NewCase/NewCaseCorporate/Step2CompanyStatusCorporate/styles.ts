import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_WHITE,
  KAIZEN_BLUE,
  KAIZEN_RED,
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
    margin: 45px auto 10px auto;
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

export const DialogContainer = styled.div`

.button{
  width: 100%;
  margin-top: 25px;
}

.inputted_information{
  color: ${KAIZEN_TEXT_GRAY};
  width: fit-content;
  padding: 5px;
  margin: 12px 0 24px 0;
  border-radius: 4px;
  border: 1px solid ${KAIZEN_GREY};
}

.client_list{
  margin-bottom: 45px;
}

.client_list_bar{
  display: flex;
  justify-content: space-between;
  .MuiTypography-body1 {
    color: ${KAIZEN_TEXT_GRAY};
  }
}

.list_label{
  width: 100%;
  .MuiTypography-body1{
    color: ${KAIZEN_TEXT_GRAY};
  }
}

.text_percent{
  color: ${KAIZEN_BLUE_LINK};
}

.list_item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
`

export const CompanyIncorporatedOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;

  .label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${KAIZEN_GREY};
  }

  .label_warning {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    margin-top: 25px;
    color: ${KAIZEN_RED};
  }

  .label_assignee {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin: 40px 0 20px 0;
    color: ${KAIZEN_BLUE};
  }
  .option {
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_TEXT_GRAY};
    width: 50%;
  }
  .MuiFormGroup-root {
    flex-direction: row;
  }
`;
