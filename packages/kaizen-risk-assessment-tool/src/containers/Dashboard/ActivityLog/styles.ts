import styled from 'styled-components';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_GREY,
  KAIZEN_BLUE,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_WHITE,
} from '../../../themes/colors';

export const Wrapper = styled.div`
  padding: 30px 10px 30px 25px;
  background-color: white;
  box-sizing: border-box;
  height: 350px;
  border-radius: 4px;

  .header_title {
    color: ${KAIZEN_PRIMARY_COLOR};
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 21px;
    margin-bottom: 20px;
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

  .table_text {
    color: ${KAIZEN_PRIMARY_COLOR};
    font-size: 14px;
  }

  .case_id_text {
    color: ${KAIZEN_BLUE_LINK};
    font-size: 14px;
    cursor: pointer;
  }

  .MuiTableCell-head {
    background-color: ${KAIZEN_BACKGROUND_COLOR};
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

  &&& .MuiTableCell-root {
    border-bottom: none;
    padding: 12px;
    font-size: 14px;
  }

  .MuiTableRow-root:nth-child(even) {
    background-color: ${KAIZEN_WHITE};
    border-bottom: none;
  }

  &&& .MuiTableRow-root:nth-child(odd) {
    background-color: ${KAIZEN_WHITE};
    border-bottom: none;
  }

  && .MuiPaginationItem-page.Mui-selected {
    background-color: ${KAIZEN_BLUE_LINK};
    color: white;
  }

  && .MuiPaginationItem-page.Mui-selected:hover {
    background-color: ${KAIZEN_BLUE_LINK};
    color: white;
  }
`;

export default null;
