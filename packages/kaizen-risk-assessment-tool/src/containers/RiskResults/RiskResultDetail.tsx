import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormHelperText,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';

import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import { useReactToPrint } from 'react-to-print';
import DetailAssessmentItem from '../../components/DetailAssessmentItem';
import CLIENT_PATH from '../../constants/clientPath';
import { ACCOUNT_INFO } from '../../constants/localStorage';
import Tooltip from '../../components/Tooltip';
import useValidationResolver from '../../utils/hookValidationResolver';
import { downloadFile } from '../../utils/hookDownloadFile';
import validation from '../../translations/validation';
import Dialog from '../../components/Dialog';
import ActivityLogsRows from './ActivityLogsRows';
import history from '../../utils/history';
import {
  ASSESSMENT_CATEGORY,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../constants/common';
import { KAIZEN_RED, KAIZEN_BLUE } from '../../themes/colors';
import { isManager, isAdmin } from '../../utils/roles';
import convertTimestamp from '../../utils/convertTimestamp';
import getShortcutName from '../../utils/hookShortcutName';
import hookConvertRiskScoreToRating from '../../utils/hookConvertRiskScoreToRating';
import RiskRatingRecommendation from '../../components/RiskRatingRecommendation';

import {
  selectRiskResultsStore,
  postDataAssessmentsCommentsRequest,
  getDataAssessmentsCommentsRequest,
  getDataAssessmentsHistoriesRequest,
  getDataAssessmentsActivityLogsRequest,
  getDataAssessmentsHistoriesVersionRequest,
  approveAssessmentResultsRequest,
} from './reducer';

import {
  Comment,
  Comments,
  CommentsField,
  NavTabs,
  NavTab,
  HtmlTooltip,
  VersionHistoryContainer,
  ActivityLogsContainer,
} from './styles';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

interface ColumnsType {
  id?: string;
  label?: string;
  align?: string;
}

const tabTitle = [
  { title: 'Version History', value: 0 },
  { title: 'Activity Log', value: 1 },
];

const specialKRIWarningTitles = {
  'Political (PEP) Exposure': `Follow recommendations for Low, Medium or High risk
    - Perform EDD o the PEP/GO involvement
    - Form final client categorisation once EDD outcome on PEP/GO is known
    - Collect Source of Wealth/Funds information
    `,
  'Adverse Media / Negative News Exposure Levels': `Follow recommendations for Low, Medium or High risk
    - Identify the party(ies) with adverse media and assess relevance and involvement
    - Can any controls or mitigants reduce the risk?
    - Does the media impact the relationship?
    - If a true hit, organise with account manager to monitor?
    - Obtain senior management approval
  `,
  'Sanctions Exposure Levels': `Follow recommendations for Low, Medium or High risk
    - Identify the sanctioned parties
    - Can any controls or mitigants reduce the risk
    - If sanctions exposure, does the client have a license to conduct business
    - Obtain senior management approval
  `,
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return <div>{value === index && <div>{children}</div>}</div>;
};

const columns: Array<ColumnsType> = [
  { id: 'activity_log_date', label: 'Date' },
  { id: 'activity_log_Type', label: 'Log Type' },
  {
    id: 'activity_log_by',
    label: 'Completed By',
  },
];

const getIndicatorOptionShortDescription = (data: any) => {
  return data?.indicator_options
    ?.map((item) => {
      return item?.indicator_option_short_description;
    })
    .join(', ');
};

const getIndicatorOptionRiskScore = (data: any) => {
  return (
    data?.indicator_options?.reduce((sum, item) => {
      if (item?.indicator_option_risk_score !== 0) {
        return sum + item?.indicator_option_risk_score;
      }
      return sum;
    }, 0) / data?.indicator_options?.length
  );
};

const RiskResultDetail = ({ caseId }: any) => {
  const {
    postAssessmentsCommentsStatus,
    assessmentResults,
    specialKRIWarnings,
    assessmentsComments,
    assessmentsHistoriesVersion,
    assessmentsHistoriesVersionTotal,
    assessmentsActivityLogs,
    getDataAssessmentsHistoriesStatus,
    getDataAssessmentsActivityLogsStatus,
    getDataRiskResultsStatus,
  } = useSelector(selectRiskResultsStore);
  const dispatch = useDispatch();
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));
  const [isPlaceholderRendered, setStatePlaceholderRendered] = useState(true);
  const [isOpenDialogActivity, setOpenDialogActivity] = useState(false);
  const [isActiveLoading, setIsActiveLoading] = React.useState(false);
  const [isTabValue, setTabValue] = useState(0);
  const pdfExportComponent = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: `Kaizen compliance solutions ${new Date().getFullYear()}`,
    content: () => pdfExportComponent.current,
  });

  const handleChangeTabs = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleViewActivity = () => {
    setOpenDialogActivity(true);
    dispatch(getDataAssessmentsHistoriesVersionRequest({ id: caseId }));
    dispatch(getDataAssessmentsActivityLogsRequest({ id: caseId }));
  };

  const handleResultHistoryView = (id) => {
    setOpenDialogActivity(false);
    dispatch(getDataAssessmentsHistoriesRequest({ id }));
  };

  const contentSchemaObj = Yup.object().shape({
    content: Yup.string().min(50, validation.field_limit_length),
  });

  const form = useForm({
    defaultValues: {
      content: '',
    },
    resolver: useValidationResolver(contentSchemaObj),
  });

  const isCasePendingReview =
    assessmentResults?.status === ASSESSMENT_STATUS.PENDING_REVIEW;

  const isCaseCompleted =
    assessmentResults?.status === ASSESSMENT_STATUS.COMPLETED;

  const isCaseArchived = assessmentResults?.is_archived;

  const isCaseAborted = assessmentResults?.status === ASSESSMENT_STATUS.ABORTED;

  const userAccessible =
    assessmentResults?.reviewer_user_id === accountInfo?.id ||
    isManager ||
    isAdmin;

  const corporateLabelSetting =
    assessmentResults?.assessment_setting?.corporate_label_setting;

  const individualLabelSetting =
    assessmentResults?.assessment_setting?.individual_label_setting;

  const handleInfoCharactersLength = (str) => {
    if (str.length >= 15) return str.slice(0, 12).concat('...');
    return str;
  };

  const handleApprove = () => {
    dispatch(
      approveAssessmentResultsRequest({
        id: caseId,
        redirectUrl: ASSESSMENT_STATUS.COMPLETED,
      })
    );
  };

  const handleUpdateCase = () => {
    history.push(`${CLIENT_PATH.NEW_CASE}/${caseId}`);
  };

  const handleSubmitComment = (data) => {
    dispatch(
      postDataAssessmentsCommentsRequest({
        id: caseId,
        data: {
          content: data.content,
        },
      })
    );
    form.reset();
  };

  useEffect(() => {
    if (getDataRiskResultsStatus === REQUEST_STATUS.SUCCESS) {
      if (assessmentResults?.latest_assessment_history_id) {
        dispatch(
          getDataAssessmentsHistoriesRequest({
            id: assessmentResults?.latest_assessment_history_id,
          })
        );
      }
    }
  }, [getDataRiskResultsStatus]);

  useEffect(() => {
    if (postAssessmentsCommentsStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(getDataAssessmentsCommentsRequest({ id: caseId }));
    }
  }, [postAssessmentsCommentsStatus]);

  useEffect(() => {
    setIsActiveLoading(
      getDataAssessmentsHistoriesStatus === REQUEST_STATUS.REQUESTING &&
        getDataAssessmentsActivityLogsStatus === REQUEST_STATUS.REQUESTING
    );
  }, [getDataAssessmentsHistoriesStatus, getDataAssessmentsActivityLogsStatus]);

  return (
    <>
      <div ref={pdfExportComponent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="result_title_box">
            <p className="results_title">Risk Assessment Results</p>
            {!isCaseAborted && (
              <div>
                {assessmentResults?.risk_rating && (
                  <span className="risk_title_left">
                    Risk Rating:
                    <p
                      className={`risk_value risk_value_${assessmentResults?.risk_rating}`}
                    >
                      {assessmentResults?.risk_rating}
                    </p>
                  </span>
                )}

                {assessmentResults?.risk_score > 0 && (
                  <span className="risk_title_left">
                    Risk Score:
                    <p
                      className={`risk_value risk_value_${hookConvertRiskScoreToRating(
                        assessmentResults?.risk_score
                      )}`}
                    >
                      {assessmentResults?.risk_score}
                    </p>
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <Tooltip
              title={
                assessmentResults?.corporate_assessment?.company_name ||
                assessmentResults?.individual_assessment?.legal_name ||
                ''
              }
            >
              <p
                className="risk_title_right"
                style={
                  assessmentResults?.is_prohibited
                    ? { color: KAIZEN_RED }
                    : { color: KAIZEN_BLUE }
                }
              >
                {assessmentResults?.corporate_assessment?.company_name ||
                  assessmentResults?.individual_assessment?.legal_name}
              </p>
            </Tooltip>
            {assessmentResults?.is_prohibited && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <ReportProblemOutlinedIcon className="risk_warning" />
                <p className="risk_warning">Prohibited Client</p>
              </span>
            )}
          </div>
        </div>

        {!isCaseAborted && (
          <>
            <RiskRatingRecommendation
              riskRating={assessmentResults?.risk_rating}
              recommendationSetting={
                assessmentResults.target_type === ASSESSMENT_CATEGORY.CORPORATE
                  ? assessmentResults?.assessment_setting
                      ?.corporate_recommendation_setting
                  : assessmentResults?.assessment_setting
                      ?.individual_recommendation_setting
              }
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {specialKRIWarnings?.map(
                (item) =>
                  item?.is_special_selection && (
                    <div
                      key={item.indicator_id}
                      className="results_key_special_selection"
                    >
                      <div className="results_question_category_name">
                        {item.indicator_name}
                        <HtmlTooltip
                          arrow
                          placement="bottom"
                          title={
                            <div style={{ whiteSpace: 'pre-line' }}>
                              {specialKRIWarningTitles[item.indicator_name] ||
                                ''}
                            </div>
                          }
                        >
                          <ErrorOutlineIcon className="results_question_category_warning_icon" />
                        </HtmlTooltip>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              <p className="kaizen_blue_text--fw600">AUDIT LOG: </p>
              <p className="kaizen_blue_text" style={{ marginLeft: 5 }}>
                {moment
                  .unix(assessmentResults?.created_at)
                  .format('DD/MM/YYYY, HH:mma')}
                &nbsp;by {assessmentResults?.created_user?.name}
              </p>
            </div>

            {assessmentResults?.reason_for_change && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <p className="kaizen_blue_text--fw600">Reason for change: </p>
                <p className="kaizen_blue_text" style={{ marginLeft: 5 }}>
                  {assessmentResults?.reason_for_change}
                </p>
              </div>
            )}
          </>
        )}

        {!isCaseArchived && !isCaseAborted && userAccessible && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {isCaseCompleted && (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<PrintOutlinedIcon />}
                onClick={() => handlePrint()}
                className="result_button"
              >
                Print
              </Button>
            )}

            {isCaseCompleted && (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<GetAppOutlinedIcon />}
                className="result_button"
                onClick={() =>
                  downloadFile({ filename: `${caseId}.xlsx`, id: caseId })
                }
              >
                Download
              </Button>
            )}

            {(isCasePendingReview || isCaseCompleted) && (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<HistoryOutlinedIcon />}
                className="result_button"
                onClick={handleViewActivity}
              >
                View Activity
              </Button>
            )}
          </div>
        )}

        <div className="results_risk_assessment">
          <p className="kaizen_blue_text--fw600 results_details_title">
            Details
          </p>
          {assessmentResults?.target_type === ASSESSMENT_CATEGORY.CORPORATE ? (
            <div className="results_details">
              <DetailAssessmentItem
                label={
                  corporateLabelSetting?.is_company_incorporated ||
                  'Is this company incorporated?'
                }
                content={
                  assessmentResults?.corporate_assessment
                    ?.is_company_incorporated
                    ? 'Yes'
                    : 'No'
                }
              />

              <DetailAssessmentItem
                label={
                  corporateLabelSetting?.corporate_name || 'Corporation Name'
                }
                content={assessmentResults?.corporate_assessment?.company_name}
              />

              <DetailAssessmentItem
                label={
                  corporateLabelSetting?.corporate_number ||
                  'Corporation Number'
                }
                content={
                  assessmentResults?.corporate_assessment?.company_number
                }
              />

              {assessmentResults?.corporate_assessment?.incorporation_country
                .length > 0 && (
                <DetailAssessmentItem
                  label={
                    corporateLabelSetting?.country_of_incorporation ||
                    'Country of Incorporation'
                  }
                  content={assessmentResults?.corporate_assessment?.incorporation_country?.map(
                    (item) => item.name
                  )}
                />
              )}

              <DetailAssessmentItem
                label={
                  corporateLabelSetting?.date_of_incorporation ||
                  'Date of Incorporation'
                }
                content={moment
                  .unix(
                    assessmentResults?.corporate_assessment?.incorporation_date
                  )
                  .format('L')}
              />

              {assessmentResults?.corporate_assessment?.bvd_number && (
                <DetailAssessmentItem
                  label={corporateLabelSetting?.bvd_number || 'BVD Number'}
                  content={assessmentResults?.corporate_assessment?.bvd_number}
                />
              )}

              {assessmentResults?.corporate_assessment?.operation_country
                .length > 0 && (
                <DetailAssessmentItem
                  label={
                    corporateLabelSetting?.country_of_operation ||
                    'Country of Operation'
                  }
                  content={assessmentResults?.corporate_assessment?.operation_country
                    ?.map((item) => item.name)
                    .join(', ')}
                />
              )}

              {assessmentResults?.corporate_assessment?.corporate_status
                ?.value && (
                <DetailAssessmentItem
                  label={
                    corporateLabelSetting?.corporate_status ||
                    'Corporate Status'
                  }
                  content={
                    assessmentResults?.corporate_assessment?.corporate_status
                      ?.label
                  }
                />
              )}

              {assessmentResults?.corporate_assessment?.internal_id && (
                <DetailAssessmentItem
                  label={corporateLabelSetting?.internal_id || 'Internal ID'}
                  content={assessmentResults?.corporate_assessment?.internal_id}
                />
              )}

              {assessmentResults?.corporate_assessment?.is_listed && (
                <DetailAssessmentItem
                  label={corporateLabelSetting?.listed || 'Listed'}
                  content={
                    assessmentResults?.corporate_assessment?.is_listed
                      ? 'Yes'
                      : 'No'
                  }
                />
              )}

              {assessmentResults?.corporate_assessment?.incorporation_date && (
                <DetailAssessmentItem
                  label={corporateLabelSetting?.company_age || 'Company Age'}
                  content={convertTimestamp(
                    assessmentResults?.corporate_assessment?.incorporation_date
                  )}
                />
              )}

              {assessmentResults?.corporate_assessment?.regulatory_id && (
                <DetailAssessmentItem
                  label={
                    corporateLabelSetting?.regulatory_id || 'Regulatory ID'
                  }
                  content={
                    assessmentResults?.corporate_assessment?.regulatory_id
                  }
                />
              )}

              {assessmentResults?.corporate_assessment?.legal_type && (
                <DetailAssessmentItem
                  label={
                    corporateLabelSetting?.legal_type ||
                    'Type of Legal Advice or Service'
                  }
                  content={
                    assessmentResults?.corporate_assessment?.legal_type?.label
                  }
                />
              )}

              {assessmentResults?.client_type && (
                <DetailAssessmentItem
                  label={corporateLabelSetting.client_type || 'Client Type'}
                  content={assessmentResults?.client_type}
                />
              )}
            </div>
          ) : (
            <div className="results_details">
              {assessmentResults?.individual_assessment?.legal_name && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.individualName || 'Full Legal Name'
                  }
                  content={assessmentResults?.individual_assessment?.legal_name}
                />
              )}

              {assessmentResults?.individual_assessment?.birth_country && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.countryOfBirth || 'Country of Birth'
                  }
                  content={
                    assessmentResults?.individual_assessment?.birth_country
                      ?.name
                  }
                />
              )}

              {assessmentResults?.individual_assessment?.date_of_birth && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.date_of_birth || 'Date of Birth'
                  }
                  content={moment
                    .unix(
                      assessmentResults?.individual_assessment?.date_of_birth
                    )
                    .format('L')}
                />
              )}

              {assessmentResults?.individual_assessment?.known_as_name && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.known_as_name || 'Known as Name'
                  }
                  content={
                    assessmentResults?.individual_assessment?.known_as_name
                  }
                />
              )}

              {assessmentResults?.individual_assessment?.residency_country && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.country_of_residence ||
                    'Country of Residency'
                  }
                  content={
                    assessmentResults?.individual_assessment?.residency_country
                      ?.name
                  }
                />
              )}

              {assessmentResults?.individual_assessment?.title && (
                <DetailAssessmentItem
                  label={individualLabelSetting?.tile_role || 'Title/ Role'}
                  content={assessmentResults?.individual_assessment?.title}
                />
              )}

              {assessmentResults?.individual_assessment?.sector && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.individual_sector ||
                    'Individuals Profession / Sector'
                  }
                  content={assessmentResults?.individual_assessment?.sector}
                />
              )}

              {assessmentResults?.individual_assessment
                ?.dual_nationality_country.length > 0 && (
                <DetailAssessmentItem
                  label={individualLabelSetting?.nationality || 'Nationality'}
                  content={assessmentResults?.individual_assessment?.dual_nationality_country
                    .map((item) => item.name)
                    .join(', ')}
                />
              )}

              {assessmentResults?.individual_assessment
                ?.dual_nationality_country.length > 0 && (
                <DetailAssessmentItem
                  label={
                    individualLabelSetting?.legal_type ||
                    'Type of Legal Advice or Service'
                  }
                  content={
                    assessmentResults?.individual_assessment?.typeOfLegalAdvice
                  }
                />
              )}
            </div>
          )}
        </div>

        {!isCaseAborted && assessmentResults?.assessment_indicators.length > 0 && (
          <div className="results_indicators">
            <p className="results_indicators_title">Key Risk Indicators</p>
            <div>
              {specialKRIWarnings?.map((item) => {
                return (
                  <div key={item.indicator_id} className="results_key_risk">
                    <Tooltip title={item?.indicator_name}>
                      <Typography className="results_key_risk_name">
                        {item.indicator_name}
                      </Typography>
                    </Tooltip>
                    <div className="results_key_risk_options">
                      <div className="results_key_risk_option">
                        <Tooltip
                          title={getIndicatorOptionShortDescription(item)}
                        >
                          <Typography className="results_key_risk_option_description">
                            {getIndicatorOptionShortDescription(item)}
                          </Typography>
                        </Tooltip>
                      </div>
                    </div>
                    <div
                      className={`results_${hookConvertRiskScoreToRating(
                        getIndicatorOptionRiskScore(item)
                      )
                        ?.split('/')
                        .join('')}`}
                    >
                      {hookConvertRiskScoreToRating(
                        getIndicatorOptionRiskScore(item)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="key_risk_indicators_action">
        {!isCaseArchived &&
          isCasePendingReview &&
          assessmentResults?.reviewer_user_id === accountInfo?.id && (
            <>
              <Button
                color="primary"
                variant="outlined"
                className="result_button"
                onClick={() => handleUpdateCase()}
              >
                Update
              </Button>

              <Button
                color="primary"
                variant="contained"
                className="result_button"
                onClick={() => handleApprove()}
              >
                Approve
              </Button>
            </>
          )}
      </div>

      {!isCaseArchived &&
        userAccessible &&
        (isCaseCompleted || isCasePendingReview || isCaseAborted) && (
          <form>
            <Comment>
              <Typography className="comment_title">
                Comments ({assessmentsComments.length})
              </Typography>
              <div className="comment">
                <Avatar className="comment_avatar">
                  {getShortcutName(accountInfo?.name)}
                </Avatar>
                <div className="comment_container">
                  <div className="comment_content">
                    <Controller
                      control={form.control}
                      name="content"
                      render={({ field: { onChange, value } }) => (
                        <CommentsField
                          onChange={onChange}
                          value={value}
                          placeholder="Type your comment here"
                          onFocus={() =>
                            setStatePlaceholderRendered(!isPlaceholderRendered)
                          }
                          onBlur={() =>
                            setStatePlaceholderRendered(!isPlaceholderRendered)
                          }
                        />
                      )}
                    />
                    {isPlaceholderRendered && (
                      <Typography className="comment_placeholder">
                        Minimum 50 characters
                      </Typography>
                    )}
                  </div>
                  <FormHelperText error>
                    {form.formState.errors.content?.message}
                  </FormHelperText>
                </div>
              </div>
            </Comment>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={form.handleSubmit(handleSubmitComment)}
                className="result_button"
              >
                Add
              </Button>
            </div>
          </form>
        )}

      {(isCasePendingReview || isCaseCompleted || isCaseAborted) &&
        assessmentsComments.map((item) => (
          <Comments key={item.id}>
            <Avatar className="comments_avatar">
              {getShortcutName(item.user_name)}
            </Avatar>
            <div>
              <Typography component="span" className="comments_user_name">
                {handleInfoCharactersLength(item.user_name)}
              </Typography>
              <Typography component="span" className="comments_updated">
                {moment.unix(item.created_at).format('DD/MM/YYYY, h:mm A')}
              </Typography>
              <Typography className="comment">{item.content}</Typography>
            </div>
          </Comments>
        ))}

      <Dialog
        maxWidth="sm"
        isOpenDialog={isOpenDialogActivity}
        handleCloseDialog={() => setOpenDialogActivity(false)}
      >
        <LoadingOverlay active={isActiveLoading} spinner>
          <NavTabs value={isTabValue} onChange={handleChangeTabs}>
            {tabTitle.map((items) => (
              <NavTab
                textColor="primary"
                disableRipple
                focusRipple
                disableFocusRipple={false}
                key={items.value}
                label={items.title}
                selected
              />
            ))}
          </NavTabs>

          <TabPanel value={isTabValue} index={0}>
            <VersionHistoryContainer>
              {assessmentsHistoriesVersion.map((item, index) => (
                <div
                  key={item.assessment_id}
                  className={`version_history_item ${
                    (assessmentResults?.individual_assessment
                      .assessment_history_id === item.id ||
                      assessmentResults?.corporate_assessment
                        .assessment_history_id === item.id) &&
                    'bg_active'
                  }`}
                >
                  <Avatar className="version_history_avatar">
                    {`V ${assessmentsHistoriesVersionTotal - index}`}
                  </Avatar>
                  <div className="version_history_content">
                    <p className="version_history_title">{`Version ${
                      assessmentsHistoriesVersionTotal - index
                    } by ${item.created_user.name}`}</p>
                    <p className="version_history_subtitle">{`On ${moment
                      .unix(item.created_at)
                      .format('DD/MM/YYYY, h:mm A')}`}</p>
                  </div>
                  {!(
                    assessmentResults?.individual_assessment
                      ?.assessment_history_id === item.id ||
                    assessmentResults?.corporate_assessment
                      ?.assessment_history_id === item.id
                  ) && (
                    <Button
                      className="version_history_button"
                      color="primary"
                      variant="text"
                      onClick={() => handleResultHistoryView(item.id)}
                    >
                      View
                    </Button>
                  )}
                </div>
              ))}
            </VersionHistoryContainer>
          </TabPanel>
          <TabPanel value={isTabValue} index={1}>
            <TableContainer>
              <ActivityLogsContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow className="activity_log_header">
                      {columns?.map((column) => (
                        <TableCell align={column?.align} key={column.id}>
                          <Typography className="table_text_header">
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {assessmentsActivityLogs?.map((row) => {
                      return <ActivityLogsRows key={row.id} row={row} />;
                    })}
                  </TableBody>
                </Table>
              </ActivityLogsContainer>
            </TableContainer>
          </TabPanel>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpenDialogActivity(false)}
            >
              Close
            </Button>
          </div>
        </LoadingOverlay>
      </Dialog>
    </>
  );
};

LoadingOverlay.propTypes = undefined;
export default RiskResultDetail;
