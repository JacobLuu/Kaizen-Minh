import styled from 'styled-components';
import {
  KAIZEN_GREY,
  KAIZEN_WHITE,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RATING_LOW,
  KAIZEN_RATING_MEDIUM,
  KAIZEN_RATING_HIGH,
} from '../../themes/colors';



export const TableContent = styled.div`
  border-radius: 4px;
  padding-top: 20px;
  box-sizing: border-box;

  .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd) {
    background-color: red;
  }

  .table-content-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  .table-content-wrapper{
    width: 735px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .filter-item {
    margin-bottom: 15px;
    margin-right: 30px;
  }

  .filter-item:last-child {
    margin-right: 0;
  }

  .add-user-button {
    width: 175px;
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
    padding: 16px 16px;
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

  .MuiTableRow-root:nth-child(even){
      background-color: #f4f4f4;
  }

  &&& .MuiTableRow-root:nth-child(odd){
      background-color: #fff;
  }

  && .MuiPaginationItem-page.Mui-selected {
    background-color: #2196f3;
    color: white;
  }

  && .MuiPaginationItem-page.Mui-selected:hover {
    background-color: #2196f3;
    color: white;
  }

  && .MuiTableCell-body {
    padding: 7px 16px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }
`;

export const ActiveBox = styled.div`
  background: ${KAIZEN_RATING_LOW};
  color: ${KAIZEN_WHITE};
  padding: 7px 10px;
  border-radius: 5px;
  text-align: center;
`;

export const InActiveBox = styled.div`
  background: ${KAIZEN_RATING_HIGH};
  color: ${KAIZEN_WHITE};
  padding: 7px 10px;
  border-radius: 5px;
  text-align: center;
`;

export const Invitationbox = styled.div`
  background: ${KAIZEN_RATING_MEDIUM};
  color: ${KAIZEN_WHITE};
  padding: 7px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  max-height: 34px;
  min-width: 121px;
`;

export const RevokedBox = styled.div`
  background: #c8c8c8;
  color: #505050;
  padding: 7px 10px;
  border-radius: 5px;
  text-align: center;
`;

export const TablePagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  align-items: center;
  && .MuiOutlinedInput-input {
    padding: 6px 30px 6px 10px;
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