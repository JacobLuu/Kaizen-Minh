import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tooltip } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import {
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_TAB_ODD_COLOR,
  KAIZEN_GREY,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_RATING_HIGH,
  KAIZEN_WHITE,
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

  .MuiTableCell-root {
    border-bottom: none;
  }

  .group_date_picker {
    align-items: baseline;
    display: flex;
    height: 80px;
    margin: 0 20px 0 0;
    .MuiIconButton-root {
      padding: 0;
      color: #919191;
    }
  }

  .group_search {
    display: flex;
    margin: 0 20px 0 0;
    .MuiIconButton-root {
      padding: 0;
      color: #919191;
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

  .wrapper_detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wrapper_detail_title_sub {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    margin: 15px 0;
    color: ${KAIZEN_PRIMARY_COLOR};
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

  .wrapper_row_text p {
    color: ${KAIZEN_PRIMARY_COLOR};
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

export const HtmlTooltip = withStyles((_theme: Theme) => ({
  tooltip: {
    backgroundColor: KAIZEN_RATING_HIGH,
    color: KAIZEN_WHITE,
    maxWidth: 220,
    fontSize: 12,
    padding: 15,
    fontWeight: 'normal',
    border: 'none',
  },
  arrow: {
    color: KAIZEN_RATING_HIGH,
  },
}))(Tooltip);

export const Toolbar = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-start;
  button:last-child {
    margin-left: 20px;
  }
`;

export const NavTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    justify-content: flex-start;
  }

  && .MuiTab-root {
    min-width: auto;
    padding: 0 10px;
    margin: 0 20px 0 0;
  }

  && .MuiTabs-indicator {
    height: 2px;
    background-color: ${KAIZEN_BLUE};
  }

  && .Mui-selected {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${KAIZEN_BLUE};
  }
`;

export const NavTab = styled(Tab)`
  && {
    color: ${KAIZEN_GREY};
    padding: 0;
    text-transform: none;
    opacity: 1;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;
