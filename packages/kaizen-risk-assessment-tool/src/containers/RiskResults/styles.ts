import styled, { keyframes } from 'styled-components';
import HelpIcon from '@material-ui/icons/Help';
import { Box, Tabs, Tab, Tooltip } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  KAIZEN_BLUE,
  KAIZEN_BLUE_LINK,
  KAIZEN_GREY,
  KAIZEN_TEXT_GRAY,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_WHITE,
  KAIZEN_RATING_HIGH,
} from '../../themes/colors';

const animationNewComment = keyframes`
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;

export const Help = styled(HelpIcon)`
  && {
    font-size: 16px;
    margin-left: 10px;
    color: ${KAIZEN_BLUE_LINK};
  }
`;

export const Comment = styled.div`
  .comment_avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background: ${KAIZEN_BLUE};
  }
  .comment_title {
    color: ${KAIZEN_BLUE};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .comment {
    display: flex;
    margin-top: 10px;
  }
  .comment_container {
    width: 100%;
  }
  .comment_content {
    position: relative;
  }
  .comment_placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    bottom: 10px;
    right: 15px;
    position: absolute;
    color: ${KAIZEN_TEXT_GRAY};
    background: white;
  }
`;

export const Comments = styled(Box)`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  -webkit-animation: ${animationNewComment} 0.4s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: ${animationNewComment} 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  .comments_avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background: ${KAIZEN_BLUE};
  }
  .comments_user_name {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    color: ${KAIZEN_PRIMARY_COLOR};
    margin-right: 40px;
  }
  .comments_updated {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: ${KAIZEN_TEXT_GRAY};
  }
  .comment {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: ${KAIZEN_TEXT_GRAY};
    margin-top: 5px;
  }
`;

export const CommentsField = styled.textarea`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  border-radius: 4px;
  background-color: white;
  border: 1px solid ${KAIZEN_GREY};
  padding: 10px 20px;
  min-height: 70px;
  height: auto;
  box-sizing: border-box;
  overflow-y: none;
  resize: none;
  outline: none;
`;

export const NavTabs = styled(Tabs)`
  margin-bottom: 30px;
  .MuiTabs-flexContainer {
    justify-content: flex-start;
  }

  .MuiTabs-fixed {
    height: 38px;
  }
  && .MuiTab-root {
    min-width: auto;
    margin: 0 30px 0 0;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
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
    font-size: 16px;
    line-height: 21px;
  }
`;

export const VersionHistoryContainer = styled(Box)`
  height: 300px;
  overflow: auto;
  .version_history_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    border: 1px solid ${KAIZEN_GREY};
    border-radius: 4px;
    margin-bottom: 25px;
  }

  .bg_active {
    background-color: ${KAIZEN_BACKGROUND_COLOR};
  }

  .version_history_avatar {
    width: 40px;
    height: 40px;
    background: ${KAIZEN_BLUE};
  }
  .version_history_content {
    padding: 0 30px;
    width: 100%;
  }
  .version_history_title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${KAIZEN_PRIMARY_COLOR};
  }
  .version_history_subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${KAIZEN_TEXT_GRAY};
  }
  .version_history_button {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
  }
`;

export const ActivityLogsContainer = styled(Box)`
  height: 300px;
  overflow: auto;

  .MuiTableCell-stickyHeader {
    background-color: #e0eaf5;
    border: none;
  }

  .table_text_header {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${KAIZEN_BLUE};
  }

  .activity_log_column {
    border-bottom: none;
  }

  .table_text {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    text-transform: capitalize;
  }

  .activity_log_row:nth-child(even) {
    background-color: #eff2f7;
  }
`;

export const HtmlTooltip = withStyles((_theme: Theme) => ({
  tooltip: {
    backgroundColor: KAIZEN_RATING_HIGH,
    color: KAIZEN_WHITE,
    maxWidth: 600,
    fontSize: 12,
    padding: 15,
    fontWeight: 'normal',
    border: 'none',
  },
  arrow: {
    color: KAIZEN_RATING_HIGH,
  },
}))(Tooltip);
