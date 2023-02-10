import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WarningIcon from '@material-ui/icons/Warning';
import { useSelector, useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import LoadingOverlay from 'react-loading-overlay';
import { INPUT_NAME } from '../../formInputNames';
import {
  ROLES,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../../../constants/common';
import CancelButton from '../../components/CancelButton';
import CalculateRickScore from '../../../../components/CalculateRickScore';
import { selectUsersList } from '../../../UsersList/reducer';
import ResultsProgress from '../../../../components/ResultsProgress';
import RiskRatingRecommendation from '../../../../components/RiskRatingRecommendation';
import PreviewResultCorporate from '../PreviewResultCorporate';
import Dialog from '../../../../components/Dialog';
import { ACCOUNT_INFO } from '../../../../constants/localStorage';
import { Wrapper, ReasonForChange } from './styles';

import {
  selectNewCaseCorporateStore,
  getRiskAssessmentResults,
} from '../reducer';
import { selectNewCaseStore } from '../../reducer';

const Step5AggregateRiskRatingCorporate = ({
  form,
  handleBackStep,
  handleSubmitFormCorporate,
  handleUpdateFormCorporatePendingReview,
  handleUpdateFormCorporateInProgress,
  corporateAssessmentCaseData,
  handleClosePopupPreviewCase,
  handleCorporatePreviewCase,
  isOpenPreviewResult,
  companyName,
}: any) => {
  const {
    corporateGeneralSettings,
    averageScore,
    isAssessmentRatingHigh,
    isCorporateProhibitedClientFlagStatus,
    corporateRecommendationSetting,
  } = useSelector(selectNewCaseCorporateStore);

  const dispatch = useDispatch();
  const { messagesFail, postNewCaseDataStatus } =
    useSelector(selectNewCaseStore);

  const dataUsersActive = useSelector(selectUsersList);
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));

  const reviewerUserData =
    corporateAssessmentCaseData?.status === ASSESSMENT_STATUS.PENDING_REVIEW
      ? dataUsersActive?.list.filter(
          (user) =>
            !user.roles.includes(ROLES.USER) &&
            user.id !== corporateAssessmentCaseData.assigned_user_id
        )
      : dataUsersActive?.list.filter(
          (user) =>
            !user.roles.includes(ROLES.USER) && user.id !== accountInfo.id
        );

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const riskRating = form.getValues('risk_rating');

  useEffect(() => {
    dispatch(getRiskAssessmentResults());
  }, []);

  useEffect(() => {
    setIsLoadingPage(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
  }, [postNewCaseDataStatus]);

  return (
    <LoadingOverlay active={isLoadingPage} spinner>
      <Wrapper>
        <Typography
          className={`${
            isCorporateProhibitedClientFlagStatus ? 'is_prohibited_client' : ''
          } title_prohibited_client`}
        >
          {companyName}
        </Typography>
        {isCorporateProhibitedClientFlagStatus && (
          <Typography className="subtitle_prohibited_client">
            <WarningIcon />
            Prohibited Client
          </Typography>
        )}
        <Typography className="title">Risk Assessment Results</Typography>

        <CalculateRickScore
          generalSettings={corporateGeneralSettings}
          averageScore={averageScore}
          isAssessmentRatingHigh={isAssessmentRatingHigh}
          form={form}
        />

        <ResultsProgress dataResult={{ riskScore: averageScore }} />

        <RiskRatingRecommendation
          riskRating={riskRating}
          recommendationSetting={corporateRecommendationSetting}
        />

        <Typography className="wrapper_content_title_reviewer">
          Reviewer*
        </Typography>

        <Controller
          name={INPUT_NAME.REVIEWER_USER}
          control={form.control}
          render={({ field, field: { value } }) => {
            return (
              <Autocomplete
                style={{ width: '300px' }}
                options={reviewerUserData}
                disabled={!corporateGeneralSettings?.is_require_manager_review}
                getOptionLabel={(option) => option?.name}
                value={value}
                onChange={(_event, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={Boolean(form.formState.errors?.reviewer_user_id)}
                  />
                )}
              />
            );
          }}
        />
        <FormHelperText error>
          {form.formState.errors?.reviewer_user_id?.message}
        </FormHelperText>

        {corporateAssessmentCaseData?.status ===
          ASSESSMENT_STATUS.PENDING_REVIEW && (
          <>
            <Typography className="wrapper_content_title_reviewer">
              Reason for change*
            </Typography>

            <ReasonForChange>
              <div>
                <Controller
                  control={form.control}
                  name={INPUT_NAME.REASON_FOR_CHANGE}
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      className="reason_field"
                      onChange={onChange}
                      value={value}
                      placeholder="Type the reason here"
                    />
                  )}
                />
              </div>
              <FormHelperText error>
                {form.formState.errors.reason_for_change?.message}
              </FormHelperText>
            </ReasonForChange>
          </>
        )}

        <FormHelperText error>{messagesFail}</FormHelperText>

        <form>
          <Box className="wrapper_button">
            <CancelButton assessmentCaseData={corporateAssessmentCaseData} />

            {corporateAssessmentCaseData?.status !==
              ASSESSMENT_STATUS.PENDING_REVIEW && (
              <Button
                color="primary"
                variant="text"
                onClick={handleCorporatePreviewCase}
                style={{ marginRight: '15px' }}
              >
                Preview
              </Button>
            )}
            <Button
              color="primary"
              variant="outlined"
              onClick={handleBackStep}
              style={{ marginRight: '15px' }}
            >
              Previous
            </Button>
            {corporateAssessmentCaseData?.status ? (
              corporateAssessmentCaseData?.status ===
              ASSESSMENT_STATUS.IN_PROGRESS ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={form.handleSubmit(
                    handleUpdateFormCorporateInProgress
                  )}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={form.handleSubmit(
                    handleUpdateFormCorporatePendingReview
                  )}
                >
                  Update
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={form.handleSubmit(handleSubmitFormCorporate)}
              >
                Submit
              </Button>
            )}
          </Box>
        </form>

        <Dialog
          maxWidth="xl"
          isOpenDialog={isOpenPreviewResult}
          handleCloseDialog={handleClosePopupPreviewCase}
        >
          <PreviewResultCorporate
            isProhibitedClient={isCorporateProhibitedClientFlagStatus}
            onClose={handleClosePopupPreviewCase}
          />
        </Dialog>
      </Wrapper>
    </LoadingOverlay>
  );
};

export default Step5AggregateRiskRatingCorporate;
