import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import {
  KAIZEN_BACKGROUND_GREY,
  KAIZEN_TEXT_RATING_MEDIUM,
  KAIZEN_TEXT_RATING_LOW,
  KAIZEN_RED,
  KAIZEN_PRIMARY_COLOR,
  KAIZEN_WHITE,
} from '../../../themes/colors';

export const RiskRatingsBox = styled(Box)`
  width: 100%;
  min-height: 350px;
  border-radius: 4px;
  background: ${KAIZEN_WHITE};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 0 0 0px;
  box-sizing: border-box;
  align-items: center;
`;

export const TitleBox = styled(Box)`
  width: 100%;
  height: 21px;
  padding-left: 30px;
`;

export const Text = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${KAIZEN_PRIMARY_COLOR};
`;

export const ChartBox = styled(Box)`
  width: 475px;
  height: 233px;
`;

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding-right: 30px;
  box-sizing: border-box;
  align-items: center;
  .annotation-box {
    min-width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .annotation-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: ${KAIZEN_BACKGROUND_GREY};
    color: ${KAIZEN_PRIMARY_COLOR};
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .total-cases-title {
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .total-cases {
    font-size: 25px;
    font-weight: 600;
  }
  @media (max-width: 1350px) {
    .apexcharts-canvas {
      width: 240px !important;
    }
  }
`;

export const MakersBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 7px;
  box-sizing: border-box;
`;

export const MakersTextBox = styled.div`
  display: flex;
  width: 65%;
  height: 100%;
  align-items: center;
  margin-left: 10px;
`;

export const HighRiskText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${KAIZEN_RED};
`;

export const MediumRiskText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${KAIZEN_TEXT_RATING_MEDIUM};
`;

export const LowRiskText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${KAIZEN_TEXT_RATING_LOW};
`;

export const HighRiskMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  background-color: ${KAIZEN_RED};
`;

export const MediumRiskMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  background-color: ${KAIZEN_TEXT_RATING_MEDIUM};
`;

export const LowRiskMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  background-color: ${KAIZEN_TEXT_RATING_LOW};
`;
