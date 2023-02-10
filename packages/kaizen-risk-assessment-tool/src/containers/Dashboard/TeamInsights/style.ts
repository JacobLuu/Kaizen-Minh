import styled from 'styled-components';
import {
  KAIZEN_LIGHTER_COLOR,
  KAIZEN_BLUE,
  KAIZEN_BLUE_LINK,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_WHITE,
} from '../../../themes/colors';

export const TeamInsightsContainer = styled.div`
  width: 100%;
  height: 350px;
  background: ${KAIZEN_WHITE};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 10px 0px 25px;
  box-sizing: border-box;
  .no-records {
    text-align: center;
    color: ${KAIZEN_PRIMARY_COLOR};
    font-size: 20px;
    font-weight: 500;
    margin-top: 40px;
  }

  .team-insights-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: sticky;
    top: 0;
    z-index: 10;
    padding-top: 30px;
    background-color: ${KAIZEN_WHITE};
  }

  .team_insight_body {
    overflow-y: scroll;
  }
`;

export const HeaderBox = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  &:last-child {
    justify-content: flex-end;
    margin: 10px 0 10px 0;
  }
`;

export const LegendBox = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
`;

export const MakersBox = styled.div`
  width: 28%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: baseline;
  &:last-child {
    width: 20%;
    margin-left: 15px;
  }
  &:first-child {
    width: 20%;
    margin-right: 15px;
  }
`;

export const InprogressMaker = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${KAIZEN_BLUE_LINK};
`;

export const PendingMaker = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${KAIZEN_LIGHTER_COLOR};
`;

export const CompletedMaker = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${KAIZEN_BLUE};
`;
export const MakersTextBox = styled.div`
  width: 95%;
  height: 100%;
  align-items: center;
  margin-left: 10px;
`;

export const MakersText = styled.div`
  height: 100%;
  line-height: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #757575;
`;

export const TitleBox = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleText = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${KAIZEN_PRIMARY_COLOR};
`;

export const MemberInsights = styled.div`
  height: 42px;
  width: 98%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 27px;
`;
export const MemberInfo = styled.div`
  width: 160px;
  max-width: 160px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-right: 20px;
`;

export const MemberDetail = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  .member-name {
    line-height: normal;
    vertical-align: text-bottom;
  }
`;

export const Name = styled.span`
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  letter-spacing: 0.1px;

  color: #0e0e2c;
`;

export const BarChartWrapper = styled.div`
  height: 50%;
  width: 75%;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

export const BarChart = styled.div`
  height: 50%;
  width: 75%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border-radius: 20px;
  overflow: hidden;
`;

export const InprogressBar = styled.div`
  height: 100%;
  background-color: ${KAIZEN_BLUE_LINK};
`;

export const PendingBar = styled.div`
  height: 100%;
  background-color: ${KAIZEN_LIGHTER_COLOR};
`;

export const CompletedBar = styled.div`
  height: 100%;
  background-color: ${KAIZEN_BLUE};
`;

export const CaseText = styled.div`
  width: 105px;
  min-width: 105px;
  height: 85%;
  margin-left: 15px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  letter-spacing: 0.1px;

  color: #757575;
`;
