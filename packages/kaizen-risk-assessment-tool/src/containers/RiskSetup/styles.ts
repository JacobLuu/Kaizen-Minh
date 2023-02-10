import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  KAIZEN_GREY,
  KAIZEN_BLUE,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLACK,
  KAIZEN_GRAY
} from '../../themes/colors';

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

  .wrapper_link {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${KAIZEN_BLUE_LINK};
    text-decoration: none;
    cursor: pointer;
  }

  .wrapper_sub_title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: ${KAIZEN_BLACK};
    margin-top: 30px;
    padding: 20px 0;
    border-top: 1px solid #d7d7d7;
  }

  .wrapper_option_title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
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

  .wrapper_button_group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #d7d7d7;
  }

  .btn {
    float: right;
  }
`;

export const NavTabs = styled(Tabs)`
  margin-bottom: 30px;
  .MuiTabs-flexContainer {
    justify-content: flex-start;
  }

  && .MuiTab-root {
    min-width: auto;
    margin: 0 30px 0 0;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
  }

  && .MuiTabs-indicator {
    height: 2px;
    background-color: ${KAIZEN_BLUE};
  }

  && .Mui-selected {
    font-weight: bold;
    color: ${KAIZEN_BLUE};
  }
`;

export const NavTab = styled(Tab)`
  && {
    color: ${KAIZEN_GREY};
    padding: 0;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  }
`;

export const InputCustom = styled.div`
  .current_label {
    align-items: start;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #404040;
  }

  .input_field_custom {
    width: 100%;
  }

  .label_value {
    word-break: break-all;
    align-items: start;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    padding-left: 5px;
  }
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const Edit = styled(EditIcon)`
  && {
    font-size: 16px;
  }
  cursor: pointer;
  margin-left: 10px;
  color: ${KAIZEN_BLUE_LINK};
`;

export const Cancel = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  cursor: pointer;
  margin-left: 5px;
  color: ${KAIZEN_BLUE_LINK};
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

export const Save = styled(Button)`
  cursor: pointer;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin: 0 50px 0 15px;
  color: ${KAIZEN_BLUE_LINK};

  .MuiButton-label {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${(props) => (props.disabled ? KAIZEN_GRAY : KAIZEN_BLUE_LINK)};
    text-transform: capitalize;
  }

  &&:hover {
    background-color: transparent;
  }
`;

export const Container = styled.div`
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
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .table_text_header {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
`;

export const ProhibitedClient = styled.div`
  .MuiIconButton-root {
    padding: 0;
  }
  .clientList_title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
  }

  .clientList_header {
    background-color: #e0eaf5;

    p {
      color: ${KAIZEN_BLUE};
    }
  }

  .clientList_column {
    border-bottom: none;
  }

  .clientList_row:nth-child(even) {
    background-color: #eff2f7;
  }

  .clientList_column_action {
    display: flex;
    justify-content: flex-end;
    border-bottom: none;
    p {
      margin-left: 50px;
      box-sizing: border-box;
      color: ${KAIZEN_BLUE_LINK};
      cursor: pointer;
    }
  }
`;

export const TablePagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  .MuiOutlinedInput-input {
    padding: 6px 30px 6px 10px;
    color: ${KAIZEN_GREY};
  }
  .rows_per_page {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .rows_per_page > p {
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
  }
`;

export const SettingTabs = styled(Tabs)`
  margin-bottom: 30px;

  && .MuiTabs-root {
    min-height: 35px;
  }

  && .MuiTab-root {
    min-height: 35px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
  }

  && .MuiTabs-indicator {
    height: 0px;
  }

  && .Mui-selected {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_BLUE_LINK};
    background: rgba(33, 150, 243, 0.2);
    border: 0.25px solid #2196f3;
  }
`;

export const SettingTab = styled(Tab)`
  && {
    color: ${KAIZEN_GREY};
    padding: 0;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.5);
    border: 0.25px solid rgba(0, 0, 0, 0.5);
    min-width: fit-content;
    padding: 0 20px;
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

export const DialogCompanySpecial = styled(Dialog)`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .description {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
    padding: 20px 0;
  }

  .content {
    width: 750px;
    padding: 80px 100px;
  }

  .content_categoryReferenceDescription {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    padding-top: 5px;
  }

  .labelField {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_GREY};
    padding-bottom: 5px;
  }
`;
