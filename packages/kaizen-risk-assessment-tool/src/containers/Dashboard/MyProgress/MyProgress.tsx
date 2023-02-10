import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from '../../../components/SkeletonLoading';
import { isStandardUser } from '../../../utils/roles';
import { getProgressRequest, clearAll, selectProgressInfo } from './reducer';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_BLUE,
  KAIZEN_LIGHTER_COLOR,
} from '../../../themes/colors';
import {
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
  MyProgressBox,
} from './style';
import { REQUEST_STATUS, SKELETON_LOADING_TYPE } from '../../../constants/common';

export interface IMyProgress {
  loadingStatus: string;
}

function MyProgress(props: IMyProgress) {
  const { loadingStatus } = props;
  const dispatch = useDispatch();
  const [isAssessmentCasesView, setIsAssessmentCasesView] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const {
    data: { assignee: assigneeCase, reviewer: reviewerCase },
  } = useSelector(selectProgressInfo);

  const totalCasesAssessments =
    assigneeCase?.in_progress +
    assigneeCase?.pending_review +
    assigneeCase?.completed;
  const totalCasesReview =
    reviewerCase?.pending_review + reviewerCase?.completed;

  const chartData = React.useMemo(() => {
    let chartData = [];

    if (reviewerCase && !isAssessmentCasesView) {
      chartData = [reviewerCase?.pending_review, reviewerCase?.completed];
    } else if (assigneeCase) {
      chartData = [
        assigneeCase?.in_progress,
        assigneeCase?.pending_review,
        assigneeCase?.completed,
      ];
    }
    return chartData;
  }, [assigneeCase, reviewerCase, isAssessmentCasesView]);

  const handleViewCase = () => {
    setIsAssessmentCasesView(!isAssessmentCasesView);
  };

  const RiskRatingsData = {
    series: chartData,
    options: {
      fill: {
        colors: isAssessmentCasesView
          ? [KAIZEN_BLUE_LINK, KAIZEN_LIGHTER_COLOR, KAIZEN_BLUE]
          : [KAIZEN_LIGHTER_COLOR, KAIZEN_BLUE],
      },
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      colors: [KAIZEN_BLUE_LINK, KAIZEN_LIGHTER_COLOR, KAIZEN_BLUE],
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

  React.useEffect(() => {
    dispatch(getProgressRequest());
    return () => {
      dispatch(clearAll());
    };
  }, []);

  useEffect(() => {
    setIsLoadingPage(loadingStatus === REQUEST_STATUS.REQUESTING);
  }, [loadingStatus]);

  return (
    <MyProgressBox>
      <TitleBox>
        <Text style={{ fontSize: 20 }}>
          {isAssessmentCasesView
            ? 'MY PROGRESS - ASSESSMENT CASE'
            : 'MY PROGRESS - REVIEW CASE'}
        </Text>
      </TitleBox>
      {!isLoadingPage ? <ChartBox>
        <Wrapper>
          {chartData?.length > 0 && (
            <ReactApexChart
              options={RiskRatingsData.options}
              series={RiskRatingsData.series}
              type="donut"
              height="120%"
              width="120%"
            />
          )}
          <div className="annotation-box">
            {!isStandardUser() && (
              <Button
                onClick={handleViewCase}
                color="primary"
                variant="text"
                style={{ fontSize: '14px', width: '120%' }}
              >
                {isAssessmentCasesView
                  ? 'View Cases Review Breakdown'
                  : 'View Cases Assessment Breakdown'}
              </Button>
            )}
            <div className="annotation-item">
              <MakersBox>
                <span className="total-cases-title">Total</span>
                <span className="total-cases">
                  {(isAssessmentCasesView
                    ? totalCasesAssessments
                    : totalCasesReview) || '0'}
                </span>
              </MakersBox>
            </div>
            {isAssessmentCasesView && (
              <div className="annotation-item">
                <MakersBox>
                  <HighRiskMaker />
                  <MakersTextBox>
                    <HighRiskText>In Progress</HighRiskText>
                  </MakersTextBox>
                  <div style={{ fontWeight: 400 }}>
                    {assigneeCase?.in_progress}
                  </div>
                </MakersBox>
              </div>
            )}
            <div className="annotation-item">
              <MakersBox>
                <MediumRiskMaker />
                <MakersTextBox>
                  <MediumRiskText>Pending Review</MediumRiskText>
                </MakersTextBox>
                <div style={{ fontWeight: 400 }}>
                  {isAssessmentCasesView
                    ? assigneeCase?.pending_review
                    : reviewerCase?.pending_review}
                </div>
              </MakersBox>
            </div>
            <div className="annotation-item">
              <MakersBox>
                <LowRiskMaker />
                <MakersTextBox>
                  <LowRiskText>Completed</LowRiskText>
                </MakersTextBox>
                <div style={{ fontWeight: 400 }}>
                  {isAssessmentCasesView
                    ? assigneeCase?.completed
                    : reviewerCase?.completed}
                </div>
              </MakersBox>
            </div>
          </div>
        </Wrapper>
      </ChartBox> : <SkeletonLoading loadingType={SKELETON_LOADING_TYPE.PIE_CHART} />}
    </MyProgressBox>
  );
}

export default React.memo(MyProgress);
