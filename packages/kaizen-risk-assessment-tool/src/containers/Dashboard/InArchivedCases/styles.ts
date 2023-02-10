import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import {
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_GREY,
  KAIZEN_BLUE,
  KAIZEN_BLUE_LINK,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_LIGHTER_COLOR,
  KAIZEN_ARCHIVED_STATUS_BACKGROUND,
  KAIZEN_BACKGROUND_GREY,
  KAIZEN_WHITE,
} from '../../../themes/colors';

export const InProgressContainer = styled.div`
  .MuiInputBase-root {
    font-size: 12px;
  }

  && .MuiOutlinedInput-input {
    padding: 8px;
  }

  .MuiButton-outlined {
    padding: 0px 45px;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    margin: 23px 0 0 0;
    flex-wrap: wrap;
    min-height: 100px;
  }

  .filter-section {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 100%;
  }

  .search-filter {
    margin: 0 20px 20px 0;
    min-width: 260px;
  }

  .date-filter-container {
    width: 485px;
  }

  .date-filter-inner {
    display: flex;
    justify-content: flex-start;
  }

  .button-section {
    min-width: 170px;
    margin-bottom: 20px;
  }

  .MuiFormControl-marginNormal {
    margin-top: 0;
    margin-bottom: 8px;
  }

  .status {
    background: ${KAIZEN_ARCHIVED_STATUS_BACKGROUND};
    color: ${KAIZEN_BLUE};
    padding: 10px 5px;
    border-radius: 5px;
    text-align: center;
  }

  .status_disable {
    background: ${KAIZEN_LIGHTER_COLOR};
    color: ${KAIZEN_PRIMARY_COLOR};
    padding: 10px 5px;
    border-radius: 5px;
    text-align: center;
  }

  .case_ID {
    display: flex;
    align-items: center;
  }
`;

export const Text = styled(Typography)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #4a4a4a;

  .title_risk_rating {
    text-transform: capitalize;
  }

  .title_targetType {
    text-transform: capitalize;
  }

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
    color: #4a4a4a;
    padding-right: 5px;
    box-sizing: border-box;
  }
`;

export const TableContent = styled.div`
  .table_text_header {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_BLUE};
  }

  .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd) {
    background-color: red;
  }

  .table-content-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  .table-content-wrapper {
    width: 43%;
    display: flex;
    justify-content: flex-start;
  }

  .table-pagination {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid grey;
    .MuiOutlinedInput-input {
      padding: 6px 30px 6px 10px;
    }
  }

  .MuiTableCell-head {
    background-color: ${KAIZEN_BACKGROUND_COLOR};
    height: 64px;
  }

  .MuiTableCell-root {
    padding: 11px;
  }

  .clientList_title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_GREY};
  }

  .clientList_header {
    p {
      color: ${KAIZEN_BLUE};
      font-weight: 600;
    }
  }

  .clientList_row:nth-child(odd) {
    background-color: #000;
  }

  .clientList_column_action {
    display: flex;
    justify-content: flex-end;
    p {
      margin-left: 50px;
      box-sizing: border-box;
      color: ${KAIZEN_BLUE_LINK};
      cursor: pointer;
    }
  }

  .MuiTableRow-root:nth-child(even) {
    background-color: ${KAIZEN_BACKGROUND_GREY};
  }

  &&& .MuiTableRow-root:nth-child(odd) {
    background-color: ${KAIZEN_WHITE};
  }

  && .MuiPaginationItem-page.Mui-selected {
    background-color: ${KAIZEN_BLUE_LINK};
    color: white;
  }

  && .MuiPaginationItem-page.Mui-selected:hover {
    background-color: ${KAIZEN_BLUE_LINK};
    color: white;
  }

  &&& .MuiTypography-root {
    border-bottom: none;
    font-size: 14px;
  }
`;

export const TablePagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;

  && .MuiOutlinedInput-input {
    padding: 10px 30px 10px 10px;
    color: ${KAIZEN_GREY};
  }

  .MuiOutlinedInput-root {
    height: 36px;
    position: relative;
    border-radius: 4px;
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
