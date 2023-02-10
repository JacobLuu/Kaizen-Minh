import styled from 'styled-components';
import { KAIZEN_BACKGROUND_COLOR, KAIZEN_BLACK, KAIZEN_BLUE, KAIZEN_GREY, KAIZEN_WHITE } from '../../themes/colors';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .slider {
    height: auto;
    min-width: 240px;
    background: #ffffff;
  }

  .list {
    span {
      color: ${KAIZEN_GREY};
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.1px;
    }
  }

  .MuiListItem-root.Mui-selected,
  .MuiListItem-root.Mui-selected:hover {
    box-sizing: border-box;
    color: ${KAIZEN_BLUE};
    background-color: rgba(0, 0, 0, 0);
    .list-icon {
      color: ${KAIZEN_BLUE};
    }
    .list-text {
      span {
        color: ${KAIZEN_BLUE};
        width: max-content;
        border-bottom: 2px solid ${KAIZEN_BLUE};
      }
    }
  }

  .list-item:hover {
    background-color: rgba(0, 0, 0, 0);
    color: ${KAIZEN_BLUE};
    .list-icon {
      color: ${KAIZEN_BLUE};
    }
    .list-text {
      span {
        color: ${KAIZEN_BLUE};
        width: max-content;
        border-bottom: 2px solid ${KAIZEN_BLUE};
        transition: 0.15s;
      }
    }
  }

  .list-icon {
    min-width: 40px;
    color: #757575;
  }

  .space {
    margin-top: 15px;
    box-sizing: border-box;
  }

  .detail-wrapper {
    width: 80%;
    background: ${KAIZEN_BACKGROUND_COLOR};
    display: flex;
    flex-direction: column;
  }

  .info-detail {
    color: ${KAIZEN_BLACK};
    font-size: 12px;
    text-transform: capitalize;
  }

  .account-name {
    color: ${KAIZEN_BLUE};
    font-size: 16px;
  }
`;

export const UserInfo = styled.div`
    display: flex;
    height: 80px;
    width: 200px;
    align-items: center;
    background-color: ${KAIZEN_BACKGROUND_COLOR};
    align-self: center;
    margin-left: 7%;
    border-radius: 7px;


  .avatar-wrapper {
    background: ${KAIZEN_BACKGROUND_COLOR};
    color: ${KAIZEN_WHITE};
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
  }
  .avatar-icon {
    background: ${KAIZEN_BLUE};
    color: ${KAIZEN_WHITE};
  }
`;

export const Content = styled.div`
  align-self: flex-start;
  width: calc(100% - 280px);
  height: auto;
  box-sizing: border-box;
  margin: 20px 20px;
`;

export const Logo = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 15px 15px 50px 15px;
`;
