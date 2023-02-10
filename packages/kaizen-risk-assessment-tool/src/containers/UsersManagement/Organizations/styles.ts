import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import {
  KAIZEN_GREY,
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_BACKGROUND_COLOR,
} from '../../../themes/colors';

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

export const TableText = styled(Typography)`
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
    text-transform: capitalize;
    white-space: pre;
`;

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
    width: 515px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
  }

  .add-organization {
    width: 225px;
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

  && .MuiButton-label {
    width: max-content;
  }
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