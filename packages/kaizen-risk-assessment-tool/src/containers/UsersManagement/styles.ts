import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
  KAIZEN_BLUE_LINK,
  KAIZEN_GREY,
  KAIZEN_BLUE,
  KAIZEN_TAB_ODD_COLOR,
} from '../../themes/colors';

export const Wrapper = styled.div`
  padding: 30px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  .MuiTableRow-root.MuiTableRow-head {
    background-color: white;
  }

  .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd) {
    background-color: ${KAIZEN_TAB_ODD_COLOR};
  }

  .MuiTableCell-root{
    border-bottom: none
  }

  .group_date_picker {
    align-items: baseline;
    display: flex;
    margin: 20px 20px 20px 0;
    .MuiIconButton-root {
      padding: 0;
      color: #919191;
    }
  }

  .functional-group{
    display: flex;
    justify-content: end;
    color: ${KAIZEN_BLUE_LINK};
    p {
      color: ${KAIZEN_BLUE_LINK};
    }
  }

  .MuiFormControlLabel-label.Mui-disabled {
    color: rgba(0, 0, 0, 0.75);
  }

  .group_date_picker > p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #979797;
    padding-right: 10px;
  }

  .wrapper_title {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: #80869b;
  }

  .wrapper_detail{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wrapper_detail_title_sub {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    margin: 15px 0;
  }

  .wrapper_detail_export {
    color: ${KAIZEN_BLUE_LINK};
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }

  .wrapper_search {
    input {
      width: 310px;
    }
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: ${KAIZEN_BLUE};
    color: white;
  }

  .MuiPaginationItem-page.Mui-selected:hover {
    background-color: ${KAIZEN_BLUE};
    color: white;
  }

  .group_sort_filter {
    display: flex;
    white-space: nowrap;

    p {

      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.7);
    }

    .bold_risk_rating {
      font-weight: bold;
    }
  }

  .wrapper_row_title {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    p {

      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.7);
    }
    img {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      color: #030303;
    }

    .bold_text {
      font-weight: bold;
    }
  }

  .wrapper_case_id p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: ${KAIZEN_BLUE_LINK};
    cursor: pointer;
  }

  .MuiTablePagination-toolbar {
    margin-right: 50px;
  }

  .table_pagination {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    .MuiOutlinedInput-input {
      padding: 6px 30px 6px 10px;
    }
  }

  .rows_per_page {
    display: flex;
    align-items: center;
  }

  .rows_per_page > p {
    display: flex;
    align-items: center;

    padding-left: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
  }

  .empty_data {
    text-align: center;
  }
`;

export const NavTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    justify-content: flex-start;
  }

  && .MuiTab-root {
    min-width: auto;
    margin: 0 50px 0 0;
  }

  .MuiTab-wrapper:hover {
    color: ${KAIZEN_BLUE};
  }

  && {
    border-bottom: 0px solid rgba(163, 161, 161, 0.15);
  }

  && .MuiTabs-indicator {
    height: 3px;
    background-color: ${KAIZEN_BLUE};
  }

  && .Mui-selected {
    font-weight: 600;
    color: ${KAIZEN_BLUE};
  }
`;

export const NavTab = styled(Tab)`
  && {
    color: ${KAIZEN_GREY};
    padding: 0;
    text-transform: none;
    opacity: 1;
    font-size: ${(props) => props.size || '18px'};
    font-style: normal;
    font-weight: normal;
    line-height: 21px;
    letter-spacing: 0.1px;
  }
`;
