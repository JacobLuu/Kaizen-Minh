import React, { useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { isStandardUser } from '../../utils/roles';
import InProgressCases from './InProgressCases';
import InReviewCases from './InReviewCases';
import InArchivedCases from './InArchivedCases';
import CompletedCases from './CompletedCases';
import InAbortedCases from './InAbortedCases';
import MyProgress from './MyProgress/MyProgress';
import RiskRatings from './RiskRatings/RiskRatings';
import TeamInsights from './TeamInsights/TeamInsights';
import { REQUEST_STATUS, ASSESSMENT_STATUS, TAB_VALUE } from '../../constants/common';
import { selectDashboardStore } from './reducer';
import ContentLayout from '../ContentLayout';
import ActivityLog from './ActivityLog';
import { Wrapper, NavTabs, NavTab } from './styles';
import { selectTeamInsightInfo } from './TeamInsights/reducer';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Dashboard() {
  const { historyUpdateStatus } = useSelector(selectDashboardStore);

  const [isLoading, setIsLoading] = React.useState(false);
  const [navTabValue, setNavTabValue] = React.useState(TAB_VALUE.IN_PROGRESS);
  const query = useQuery();
  const currentTab = query.get('abc');
  const handleChangeTabs = (e, tabValue) => {
    setNavTabValue(tabValue);
  };

  useEffect(() => {
    switch (currentTab) {
      case ASSESSMENT_STATUS.IN_PROGRESS:
        setNavTabValue(TAB_VALUE.IN_PROGRESS);
        break;
      case ASSESSMENT_STATUS.PENDING_REVIEW:
        setNavTabValue(TAB_VALUE.PENDING_REVIEW);
        break;
      case ASSESSMENT_STATUS.COMPLETED:
        setNavTabValue(TAB_VALUE.COMPLETED);
        break;
      case ASSESSMENT_STATUS.ARCHIVED:
        setNavTabValue(TAB_VALUE.ARCHIVED);
        break;
      case ASSESSMENT_STATUS.ABORTED:
        if (isStandardUser()) {
          setNavTabValue(TAB_VALUE.ARCHIVED);
        } else setNavTabValue(TAB_VALUE.ABORTED);
        break;
      default:
        setNavTabValue(TAB_VALUE.IN_PROGRESS);
    }
  }, []);

  const teamInsightsData = useSelector(selectTeamInsightInfo);

  const ASSESSMENT_TAB_INDEX = {
    IN_PROGRESS: 0,
    PENDING_REVIEW: 1,
    COMPLETED: 2,
    ARCHIVED: 3,
    ABORTED: 4,
  };

  const tabTitle = [
    { title: 'In Progress', value: TAB_VALUE.IN_PROGRESS },
    { title: 'Pending Review', value: TAB_VALUE.PENDING_REVIEW },
    { title: 'Completed', value: TAB_VALUE.COMPLETED },
    { title: 'Archived', value: TAB_VALUE.ARCHIVED },
    { title: 'Aborted', value: TAB_VALUE.ABORTED },
  ];

  React.useEffect(() => {
    if (historyUpdateStatus === REQUEST_STATUS.REQUESTING) {
      setIsLoading(false);
    }
  }, [historyUpdateStatus]);

  return (
    <ContentLayout scrollToTop={historyUpdateStatus === REQUEST_STATUS.SUCCESS}>
      <Wrapper>
        <div className="wrapper_detail">
          <Typography className="wrapper_detail_title_sub">
            DASHBOARD
          </Typography>
        </div>
        <NavTabs value={navTabValue} onChange={handleChangeTabs}>
          {tabTitle.map((items) =>
            !(isStandardUser() && items.value === TAB_VALUE.ARCHIVED) ? (
              <NavTab
                textColor="primary"
                disableRipple
                focusRipple
                component={Link}
                to={`?currentTab=${items.title
                  .split(' ')
                  .join('_')
                  .toLowerCase()}`}
                disableFocusRipple={false}
                key={items.value}
                label={items.title}
              />
            ) : null
          )}
        </NavTabs>

        <LoadingOverlay active={isLoading} spinner>
          <TabPanel
            value={navTabValue}
            index={ASSESSMENT_TAB_INDEX.IN_PROGRESS}
          >
            <InProgressCases />
          </TabPanel>

          <TabPanel
            value={navTabValue}
            index={ASSESSMENT_TAB_INDEX.PENDING_REVIEW}
          >
            <InReviewCases />
          </TabPanel>

          <TabPanel value={navTabValue} index={ASSESSMENT_TAB_INDEX.COMPLETED}>
            <CompletedCases />
          </TabPanel>

          {!isStandardUser() && (
            <TabPanel value={navTabValue} index={ASSESSMENT_TAB_INDEX.ARCHIVED}>
              <InArchivedCases />
            </TabPanel>
          )}
          <TabPanel
            value={navTabValue}
            index={
              isStandardUser()
                ? ASSESSMENT_TAB_INDEX.ARCHIVED
                : ASSESSMENT_TAB_INDEX.ABORTED
            }
          >
            <InAbortedCases />
          </TabPanel>
        </LoadingOverlay>
      </Wrapper>
      <Grid container spacing={2}>
        <Grid item lg={6} sm={12}>
          <MyProgress loadingStatus={teamInsightsData?.getTeamInsightStatus} />
        </Grid>
        <Grid item lg={6} sm={12}>
          <RiskRatings />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={6} sm={12}>
          <ActivityLog />
        </Grid>
        <Grid item lg={6} sm={12}>
          <TeamInsights />
        </Grid>
      </Grid>
    </ContentLayout>
  );
}

export default React.memo(Dashboard);
