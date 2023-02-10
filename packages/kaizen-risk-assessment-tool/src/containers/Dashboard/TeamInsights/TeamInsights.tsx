import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { Tooltip } from '@material-ui/core';
import {
  getTeamInsightRequest,
  selectTeamInsightInfo,
  clearAll,
} from './reducer';
import { KAIZEN_BLUE } from '../../../themes/colors';
import { REQUEST_STATUS, SKELETON_LOADING_TYPE } from '../../../constants/common';
import {
  CompletedBar,
  InprogressBar,
  PendingBar,
  TeamInsightsContainer,
  HeaderBox,
  TitleBox,
  TitleText,
  LegendBox,
  MakersBox,
  InprogressMaker,
  PendingMaker,
  CompletedMaker,
  MakersTextBox,
  MemberInsights,
  MemberInfo,
  MemberDetail,
  Name,
  BarChartWrapper,
  BarChart,
  CaseText,
  MakersText,
} from './style';
import SkeletonLoading from '../../../components/SkeletonLoading';

function TeamInsights() {
  const dispatch = useDispatch();
  const teamInsightsData = useSelector(selectTeamInsightInfo);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const getProgressPercent = (numberOfCaseItem, totalCase) => {
    return Math.ceil((numberOfCaseItem / totalCase) * 100);
  };

  const getShorcutName = (str) => {
    const words = str?.split(' ');
    const shortenName = `${words[0]} ${words[1]}`;
    const matches = shortenName?.match(/\b(\w)/g);
    return matches?.join('').toUpperCase();
  };

  useEffect(() => {
    dispatch(getTeamInsightRequest());
    return () => {
      dispatch(clearAll());
    };
  }, []);

  useEffect(() => {
    setIsLoadingPage(
      teamInsightsData?.getTeamInsightStatus === REQUEST_STATUS.REQUESTING
    );
  }, [teamInsightsData?.getTeamInsightStatus]);

  return (
    <LoadingOverlay active={isLoadingPage} spinner>
      <TeamInsightsContainer>
        <div className="team-insights-header">
          <HeaderBox>
            <TitleBox>
              <TitleText>TEAM INSIGHTS</TitleText>
            </TitleBox>
          </HeaderBox>

          <HeaderBox style={{ justifyContent: 'flex-end' }}>
            <LegendBox>
              <MakersBox>
                <InprogressMaker />
                <MakersTextBox>
                  <MakersText>In Progress</MakersText>
                </MakersTextBox>
              </MakersBox>
              <MakersBox>
                <PendingMaker />
                <MakersTextBox>
                  <MakersText>Pending Review</MakersText>
                </MakersTextBox>
              </MakersBox>
              <MakersBox>
                <CompletedMaker />
                <MakersTextBox>
                  <MakersText>Completed</MakersText>
                </MakersTextBox>
              </MakersBox>
            </LegendBox>
          </HeaderBox>
        </div>
        <div className="team_insight_body">
          {teamInsightsData?.data.length === 0 && !isLoadingPage && (
            <div className="no-records">No Records</div>
          )}
          {!isLoadingPage ? teamInsightsData?.data.map((data) => {
            const totalCase =
              data.in_progress + data.pending_review + data.completed;
            return (
              <MemberInsights key={data.id}>
                <MemberInfo>
                  <Avatar style={{ background: KAIZEN_BLUE }}>
                    {(data.name !== null && getShorcutName(data.name)) || '-'}
                  </Avatar>
                  <MemberDetail>
                    <Name className="member-name">{data.name || '-'}</Name>
                  </MemberDetail>
                </MemberInfo>
                <BarChartWrapper>
                  <BarChart>
                    <Tooltip title={`In Progress: ${data.in_progress}`} arrow>
                      <InprogressBar
                        style={{
                          width: `${getProgressPercent(
                            data.in_progress,
                            totalCase
                          )}%`,
                        }}
                      />
                    </Tooltip>
                    <Tooltip
                      title={`Pending Review: ${data.pending_review}`}
                      arrow
                    >
                      <PendingBar
                        style={{
                          width: `${getProgressPercent(
                            data.pending_review,
                            totalCase
                          )}%`,
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={`Completed: ${data.completed}`} arrow>
                      <CompletedBar
                        style={{
                          width: `${getProgressPercent(
                            data.completed,
                            totalCase
                          )}%`,
                        }}
                      />
                    </Tooltip>
                  </BarChart>
                  <CaseText>
                    Total:&nbsp;
                    <span>
                      {data.in_progress + data.pending_review + data.completed}
                    </span>
                    &nbsp;Cases
                  </CaseText>
                </BarChartWrapper>
              </MemberInsights>
            );
          }) : <SkeletonLoading loadingType={SKELETON_LOADING_TYPE.BAR_CHART} rowPerPage={10}/>}
        </div>
      </TeamInsightsContainer>
    </LoadingOverlay>
  );
}

export default TeamInsights;
