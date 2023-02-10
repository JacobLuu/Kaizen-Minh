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
import Dialog from '../../../../components/Dialog';
import {
  ASSESSMENT_STATUS,
  REQUEST_STATUS,
  ROLES,
} from '../../../../constants/common';
import CancelButton from '../../components/CancelButton';
import CalculateRickScore from '../../../../components/CalculateRickScore';
import { selectUsersList } from '../../../UsersList/reducer';
import ResultsProgress from '../../../../components/ResultsProgress';
import RiskRatingRecommendation from '../../../../components/RiskRatingRecommendation';
import PreviewResultIndividual from '../PreviewResultIndividual';
import { ACCOUNT_INFO } from '../../../../constants/localStorage';
import { Wrapper, ReasonForChange } from './styles';

import {
  selectNewCaseIndividualStore,
  getRiskAssessmentResults,
} from '../reducer';
import { selectNewCaseStore } from '../../reducer';

const Step5AggregateRiskRatingCorporate = ({
  form,
  handleBackStep,
  legalName,
  isOpenPreviewResult,
  handleClosePopupPreviewCase,
  handleSubmitFormIndividual,
  individualAssessmentsCaseData,
  handleIndividualPreviewCase,
  handleUpdateFormIndividualInProgress,
  handleUpdateFormIndividualPendingReview,
}: any) => {
  const {
    averageScore,
    isAssessmentRatingHigh,
    individualGeneralSettings,
    individualRecommendationSetting,
    isIndividualProhibitedClientFlagStatus,
  } = useSelector(selectNewCaseIndividualStore);
  const dispatch = useDispatch();

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { messagesFail, postNewCaseDataStatus } =
    useSelector(selectNewCaseStore);
  const dataUsersActive = useSelector(selectUsersList);
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));

  const reviewerUserData =
    individualAssessmentsCaseData?.status === ASSESSMENT_STATUS.PENDING_REVIEW
      ? dataUsersActive?.list.filter(
          (user) =>
            !user.roles.includes(ROLES.USER) &&
            user?.id !== individualAssessmentsCaseData?.assigned_user_id
        )
      : dataUsersActive?.list.filter(
          (user) =>
            !user.roles.includes(ROLES.USER) && user.id !== accountInfo.id
        );

  const riskRating = form.getValues('risk_rating');

  useEffect(() => {
    setIsLoadingPage(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
  }, [postNewCaseDataStatus]);

  useEffect(() => {
    dispatch(getRiskAssessmentResults());
  }, []);

  return (
    <LoadingOverlay active={isLoadingPage} spinner>
      <Wrapper>
        <Typography
          className={`${
            isIndividualProhibitedClientFlagStatus ? 'is_prohibited_client' : ''
          } title_prohibited_client`}
        >
          {legalName}
        </Typography>
        {isIndividualProhibitedClientFlagStatus && (
          <Typography className="subtitle_prohibited_client">
            <WarningIcon />
            Prohibited Client
          </Typography>
        )}
        <Typography className="title">Risk Assessment Results</Typography>

        <CalculateRickScore
          averageScore={averageScore}
          isAssessmentRatingHigh={isAssessmentRatingHigh}
          form={form}
        />

        <ResultsProgress dataResult={{ riskScore: averageScore }} />

        <RiskRatingRecommendation
          riskRating={riskRating}
          isAssessmentRatingHigh={isAssessmentRatingHigh}
          recommendationSetting={individualRecommendationSetting}
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
                disabled={!individualGeneralSettings?.is_require_manager_review}
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

        {individualAssessmentsCaseData?.status ===
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
            <CancelButton assessmentCaseData={individualAssessmentsCaseData} />

            {individualAssessmentsCaseData?.status !==
              ASSESSMENT_STATUS.PENDING_REVIEW && (
              <Button
                color="primary"
                variant="text"
                onClick={handleIndividualPreviewCase}
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

            {individualAssessmentsCaseData?.status ? (
              individualAssessmentsCaseData?.status ===
              ASSESSMENT_STATUS.IN_PROGRESS ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={form.handleSubmit(
                    handleUpdateFormIndividualInProgress
                  )}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={form.handleSubmit(
                    handleUpdateFormIndividualPendingReview
                  )}
                >
                  Update
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={form.handleSubmit(handleSubmitFormIndividual)}
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
          <PreviewResultIndividual
            isProhibitedClient={isIndividualProhibitedClientFlagStatus}
            onClose={handleClosePopupPreviewCase}
          />
        </Dialog>
      </Wrapper>
    </LoadingOverlay>
  );
};

export default Step5AggregateRiskRatingCorporate;
