import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useParams } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import ContentLayout from '../ContentLayout';
import RiskResultDetail from './RiskResultDetail';
import history from '../../utils/history';
import {
  selectRiskResultsStore,
  getDataRiskResultsRequest,
  getDataAssessmentsCommentsRequest,
  riskResultsClearData,
} from './reducer';
import { REQUEST_STATUS, ASSESSMENT_STATUS } from '../../constants/common';
import CLIENT_PATH from '../../constants/clientPath';
import { KAIZEN_BLUE } from '../../themes/colors';
import { ACCOUNT_INFO } from '../../constants/localStorage';
import { isManager, isAdmin } from '../../utils/roles';
import { getDataAssessmentsSettingsRequest } from '../NewCase/reducer';

import './style.css';

function RiskResults() {
  const [isLoadingPage, setLoadingPage] = React.useState(false);
  const dispatch = useDispatch();
  const {
    getDataRiskResultsStatus,
    getDataAssessmentsHistoriesStatus,
    assessmentResults,
  } = useSelector(selectRiskResultsStore);

  const { id } = useParams();

  const isCaseArchived = assessmentResults?.is_archived;

  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));

  useEffect(() => {
    setLoadingPage(
      getDataRiskResultsStatus === REQUEST_STATUS.REQUESTING ||
        getDataAssessmentsHistoriesStatus === REQUEST_STATUS.REQUESTING
    );
  }, [getDataRiskResultsStatus, getDataAssessmentsHistoriesStatus]);

  useEffect(() => {
    dispatch(getDataRiskResultsRequest({ id }));
    dispatch(getDataAssessmentsCommentsRequest({ id }));

    if (!isManager || !isAdmin) {
      if (assessmentResults?.reviewer_user_id !== accountInfo?.id) {
        history.replace(CLIENT_PATH.DASHBOARD);
      }
    }
  }, [id]);

  useEffect(() => {
    dispatch(getDataAssessmentsSettingsRequest());
    return () => {
      dispatch(riskResultsClearData());
    };
  }, []);

  return (
    <ContentLayout
      scrollToTop={getDataRiskResultsStatus === REQUEST_STATUS.SUCCESS}
    >
      <LoadingOverlay active={isLoadingPage} spinner>
        <div className="results">
          <div className="results_header">
            <div className="results_header_button">
              <div
                className="results_back"
                onClick={() => {
                  history.push(
                    `${CLIENT_PATH.DASHBOARD}?currentTab=${
                      isCaseArchived
                        ? ASSESSMENT_STATUS.ARCHIVED
                        : assessmentResults?.status
                    }`
                  );
                }}
                role="button"
                aria-hidden="true"
              >
                <ArrowBackIcon className="results_back_icon" />
                <p style={{ fontSize: '20px', color: KAIZEN_BLUE }}>
                  DASHBOARD
                </p>
              </div>
            </div>
          </div>
          <div className="risk_results_detail_paper">
            <RiskResultDetail caseId={id} />
          </div>
        </div>
      </LoadingOverlay>
    </ContentLayout>
  );
}

export default React.memo(RiskResults);
