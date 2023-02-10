import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS, SKELETON_LOADING_TYPE } from '../../../constants/common';
import SkeletonLoading from '../../../components/SkeletonLoading';
import {
  getRiskRatingRequest,
  selectRiskRatingInfo,
  clearAll,
} from './reducer';
import {
  KAIZEN_TEXT_RATING_LOW,
  KAIZEN_TEXT_RATING_MEDIUM,
  KAIZEN_TEXT_RATING_HIGH,
} from '../../../themes/colors';
import {
  RiskRatingsBox,
  TitleBox,
  Text,
  ChartBox,
  Wrapper,
  MakersBox,
  MakersTextBox,
  HighRiskMaker,
  HighRiskText,
  MediumRiskMaker,
  MediumRiskText,
  LowRiskMaker,
  LowRiskText,
} from './style';

function RiskRatings() {
  const dispatch = useDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const assessmentsRiskRatingData = useSelector(selectRiskRatingInfo);
  const totalRiskRating =
    assessmentsRiskRatingData?.data.low +
    assessmentsRiskRatingData?.data.medium +
    assessmentsRiskRatingData?.data.high;
  const DEFAULT_ASSESSMENT_CASE_DATA = [1, 1, 1];
  let dataInfo = [];
  if (
    assessmentsRiskRatingData?.data.low === 0 &&
    assessmentsRiskRatingData?.data.medium === 0 &&
    assessmentsRiskRatingData?.data.high === 0
  ) {
    dataInfo = DEFAULT_ASSESSMENT_CASE_DATA;
  } else {
    dataInfo = [
      assessmentsRiskRatingData?.data.low,
      assessmentsRiskRatingData?.data.medium,
      assessmentsRiskRatingData?.data.high,
    ];
  }
  const riskRatingsData = {
    series: dataInfo,
    options: {
      stroke: {
        show: false,
      },
      fill: {
        colors: [
          KAIZEN_TEXT_RATING_LOW,
          KAIZEN_TEXT_RATING_MEDIUM,
          KAIZEN_TEXT_RATING_HIGH,
        ],
      },
      chart: {
        type: 'pie',
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0.35,
          },
        },
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false,
          offsetX: -30,
          offsetY: 0,
          customScale: 0.8,
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 1280,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: -22,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
        {
          breakpoint: 960,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: -30,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
        {
          breakpoint: 769,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 0,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    dispatch(getRiskRatingRequest());
    return () => {
      dispatch(clearAll());
    };
  }, []);

  useEffect(() => {
    setIsLoadingPage(
      assessmentsRiskRatingData?.getRiskRatingStatus ===
      REQUEST_STATUS.REQUESTING
    );
  }, [assessmentsRiskRatingData?.getRiskRatingStatus]);

  return (
    <RiskRatingsBox>
      <TitleBox>
        <Text style={{ fontSize: 20 }}>
          BREAKDOWN OF CASES BY RISK RATINGS
        </Text>
      </TitleBox>
      {!isLoadingPage ? <ChartBox>
        <Wrapper>
          {assessmentsRiskRatingData?.data.low !== undefined && (
            <ReactApexChart
              options={riskRatingsData.options}
              series={riskRatingsData.series}
              type="pie"
              height="120%"
              width="120%"
            />
          )}
          <div className="annotation-box">
            <div className="annotation-item">
              <MakersBox>
                <span>Total Completed Cases</span>
                <span style={{ fontSize: '20px', fontWeight: 550 }}>
                  {totalRiskRating || '-'}
                </span>
              </MakersBox>
            </div>
            <div className="annotation-item">
              <MakersBox>
                <HighRiskMaker />
                <MakersTextBox>
                  <HighRiskText>High Risk</HighRiskText>
                </MakersTextBox>
                <div style={{ fontWeight: 400 }}>
                  {assessmentsRiskRatingData?.data.high}
                </div>
              </MakersBox>
            </div>
            <div className="annotation-item">
              <MakersBox>
                <MediumRiskMaker />
                <MakersTextBox>
                  <MediumRiskText>Medium Risk</MediumRiskText>
                </MakersTextBox>
                <div style={{ fontWeight: 400 }}>
                  {assessmentsRiskRatingData?.data.medium}
                </div>
              </MakersBox>
            </div>
            <div className="annotation-item">
              <MakersBox>
                <LowRiskMaker />
                <MakersTextBox>
                  <LowRiskText>Low Risk</LowRiskText>
                </MakersTextBox>
                <div style={{ fontWeight: 400 }}>
                  {assessmentsRiskRatingData?.data.low}
                </div>
              </MakersBox>
            </div>
          </div>
        </Wrapper>
      </ChartBox> : <SkeletonLoading loadingType={SKELETON_LOADING_TYPE.PIE_CHART} />}
    </RiskRatingsBox>
  );
}

export default React.memo(RiskRatings);
