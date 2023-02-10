import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLACK,
  KAIZEN_RED,
  KAIZEN_TEXT_GRAY,
  KAIZEN_PRIMARY_COLOR,
} from '../../../themes/colors';

export const Wrapper = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  .wrapper_title {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    color: ${KAIZEN_BLACK};
    margin-bottom: 20px;
  }
  .wrapper_detail {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
    margin-bottom: 15px;
  }
  .back_button {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_GREY};
    margin-bottom: 25px;
  }

  .table_text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }

  .table_text_header {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }

  .add_company {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_BLUE_LINK};
    width: fit-content;
    margin-top: 25px;
    margin-bottom: 20px;
    cursor: pointer;
    svg {
      padding-right: 5px;
    }
  }
`;

export const LabelCustomizationContainer = styled.div`
  .Input_field {
    width: 350px;
  }

  .label_customization_title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .label_customization_text {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_TEXT_GRAY};
  }
  .link {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_BLUE_LINK};
    text-decoration: none;
    cursor: pointer;
  }
`;

export const RecommendationsCustomizationContainer = styled.div`
  .recommendations_customization_title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_GREY};
    padding-bottom: 15px;
  }
  .field_error {
    border: 1px solid ${KAIZEN_RED};
  }
  .text_error {
    color: ${KAIZEN_RED};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
