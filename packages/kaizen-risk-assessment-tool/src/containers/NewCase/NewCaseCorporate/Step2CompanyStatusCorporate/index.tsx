import React, { useEffect, useState, useMemo } from 'react';
import {
  Typography,
  Button,
  Box,
  Grid,
  FormHelperText,
  TextField,
  Tooltip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useWatch } from 'react-hook-form';
import moment from 'moment';
import CancelButton from '../../components/CancelButton';
import { ACCOUNT_INFO } from '../../../../constants/localStorage';
import {
  ROLES,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
  INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID,
} from '../../../../constants/common';

import convertTimestamp from '../../../../utils/convertTimestamp';
import InputField from '../../../../components/InputField';
import TimePicker from '../../../../components/TimePicker';
import Dialog from '../../../../components/Dialog';
import { INPUT_NAME, CORPORATE_INPUT_NAME } from '../../formInputNames';
import useValidationResolver from '../../../../utils/hookValidationResolver';
import { convertTimeToStartOfDay } from '../../../../utils/momentHelpers';

import {
  selectNewCaseCorporateStore,
  checkCorporateProhibitedClientsRequest,
  clearCorporateProhibitedData,
  setCorporateProhibitedClientFlag,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { selectUsersList } from '../../../UsersList/reducer';
import { Wrapper, CompanyIncorporatedOption, DialogContainer } from './styles';
import getReviewerUser from '../../../../utils/hookGetReviewerUser';
import { Help } from '../../styles';

const Step2CompanyStatusCorporate = ({
  form,
  corporateAssessmentCaseData,
  handleBackStep,
  handleNextStep,
  handleSubmitFormCorporateAssignee,
  handleUpdateFormCorporateAssignee,
  handleSaveAbortCorporate,
  step5CorporateForm,
  corporateGeneralSettings,
}: any) => {
  const [
    isOpenDialogPotentialProhibitedClientDetected,
    setOpenDialogPotentialProhibitedClientDetected,
  ] = useState(false);

  const [
    isOpenDialogProhibitedClientDetected,
    setOpenDialogProhibitedClientDetected,
  ] = useState(false);

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingDialog, setIsLoadingDialog] = useState(false);

  const isPendingReview =
    corporateAssessmentCaseData.status === ASSESSMENT_STATUS.PENDING_REVIEW;
  const prohibitedSchemaObj = Yup.object().shape({
    potential_corporate_prohibited: Yup.string(),
  });

  const prohibitedForm = useForm({
    defaultValues: {
      potential_corporate_prohibited: '',
    },
    resolver: useValidationResolver(prohibitedSchemaObj),
  });

  const {
    corporationFieldName,
    dataPotentialCorporateProhibitedClients,
    checkCorporateProhibitedClientsStatus,
    indicatorSettingsCorporateSecondary,
  } = useSelector(selectNewCaseCorporateStore);
  const { postNewCaseDataStatus } = useSelector(selectNewCaseStore);

  const prohibitedClientSelected = useMemo(() => {
    return indicatorSettingsCorporateSecondary.findIndex(
      (item) => item.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
    );
  }, [indicatorSettingsCorporateSecondary]);

  const dispatch = useDispatch();
  const dataUsersActive = useSelector(selectUsersList);
  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));

  const dateTimeCorporateDob = useWatch({
    control: form.control,
    name: CORPORATE_INPUT_NAME.DATE_OF_INCORPORATION,
  });

  const isCompanyIncorporatedStatus = useWatch({
    control: form.control,
    name: CORPORATE_INPUT_NAME.COMPANY_INCORPORATED,
  });

  const assignedUser = useWatch({
    control: form.control,
    name: INPUT_NAME.ASSIGNED_USER,
  });

  const handleSubmitProhibitedClientDetectedForm = () => {
    const prohibitedClientList = prohibitedForm.getValues(
      CORPORATE_INPUT_NAME.POTENTIAL_CORPORATE_PROHIBITED
    );
    const splitData = prohibitedClientList?.split('-');
    const inputCompanyName = splitData?.[0]?.trim();
    const inputCompanyNumber = splitData?.[1]?.trim();
    const inputDateOfIncorporation = isCompanyIncorporatedStatus
      ? splitData?.[2]?.trim()
      : splitData?.[1]?.trim();

    const splitDateOfIncorporation = inputDateOfIncorporation?.split('/');

    const year = splitDateOfIncorporation?.[2];
    const month = parseInt(splitDateOfIncorporation?.[1], 10);
    const day = splitDateOfIncorporation?.[0];

    const incorporationDate = new Date(
      year,
      month > 0 ? month - 1 : month,
      day
    );

    form.reset({
      company_name: inputCompanyName,
      company_number: isCompanyIncorporatedStatus ? inputCompanyNumber : '0',
      incorporation_date: moment(incorporationDate),
      is_company_incorporated: isCompanyIncorporatedStatus,
      assigned_user_id: assignedUser,
    });

    setOpenDialogProhibitedClientDetected(true);
    setOpenDialogPotentialProhibitedClientDetected(false);
  };

  const handleSubmitProhibitedConfirmed = () => {
    handleSaveAbortCorporate();
    setOpenDialogProhibitedClientDetected(true);
  };

  const handleCorporateAssignee = () => {
    if (Object.keys(corporateAssessmentCaseData)?.length > 0) {
      return handleUpdateFormCorporateAssignee();
    }
    return handleSubmitFormCorporateAssignee();
  };

  const handleCheckPotentialProhibitedClientDetected = async (data) => {
    if (prohibitedClientSelected >= 0) {
      const prohibitedClientDetectedForm = {
        company_name: data?.company_name,
        company_number: data?.company_number || '0',
        date_of_incorporation: convertTimeToStartOfDay(
          data?.incorporation_date
        ),
        is_company_incorporated: data?.is_company_incorporated,
      };

      dispatch(
        checkCorporateProhibitedClientsRequest(prohibitedClientDetectedForm)
      );

      dispatch(
        setCorporateProhibitedClientFlag({
          isProhibitedClientFlag: false,
        })
      );
    } else if (accountInfo?.id === assignedUser?.id) {
      handleNextStep();
    } else {
      handleCorporateAssignee();
    }
  };

  useEffect(() => {
    step5CorporateForm.reset({
      is_update_case:
        !Object.keys(corporateAssessmentCaseData)?.length ||
        corporateAssessmentCaseData.status === ASSESSMENT_STATUS.IN_PROGRESS,
      reviewer_user_id: getReviewerUser({
        assessmentCaseData: corporateAssessmentCaseData,
        generalSettings: corporateGeneralSettings,
        assignedUserId: assignedUser,
      }),
      risk_rating: corporateAssessmentCaseData?.risk_rating,
      risk_score: corporateAssessmentCaseData?.risk_score,
    });
  }, [assignedUser, corporateAssessmentCaseData, corporateGeneralSettings]);

  useEffect(() => {
    if (checkCorporateProhibitedClientsStatus === REQUEST_STATUS.SUCCESS) {
      if (prohibitedClientSelected >= 0) {
        if (dataPotentialCorporateProhibitedClients.length > 0) {
          const prohibitedClientMatched =
            dataPotentialCorporateProhibitedClients.find(
              (element) => element.score === 100
            );

          if (prohibitedClientMatched) {
            return setOpenDialogProhibitedClientDetected(true);
          }
          return setOpenDialogPotentialProhibitedClientDetected(true);
        }
      }
      if (accountInfo?.id === assignedUser?.id) {
        handleNextStep();
        dispatch(clearCorporateProhibitedData());
      } else {
        handleCorporateAssignee();
      }
      dispatch(clearCorporateProhibitedData());
    }
  }, [dataPotentialCorporateProhibitedClients]);

  useEffect(() => {
    setIsLoadingPage(
      checkCorporateProhibitedClientsStatus === REQUEST_STATUS.REQUESTING
    );
  }, [checkCorporateProhibitedClientsStatus]);

  useEffect(() => {
    setIsLoadingDialog(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
    setIsLoadingPage(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
  }, [postNewCaseDataStatus]);

  return (
    <Wrapper>
      <LoadingOverlay active={isLoadingPage} spinner>
        <Typography component="div" className="title">
          Please enter the following company information
        </Typography>
        <Box className="container">
          <form autoComplete="off">
            <CompanyIncorporatedOption>
              <Typography component="div" className="label">
                {corporationFieldName?.isCompanyIncorporated}
              </Typography>
              <Box className="option">
                <Controller
                  control={form.control}
                  name={CORPORATE_INPUT_NAME.COMPANY_INCORPORATED}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      value={value ? 'true' : 'false'}
                      onChange={(e) => {
                        onChange(e.target.value === 'true');
                      }}
                      className="radio_group_listed"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isPendingReview}
                        value="true"
                        label="Yes"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isPendingReview}
                        value="false"
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>
              <FormHelperText error>
                {form.formState.errors?.is_company_incorporated?.message}
              </FormHelperText>
            </CompanyIncorporatedOption>

            <Grid container spacing={4}>
              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography
                  component="div"
                  className="wrapper_content_title_input"
                >
                  <Tooltip title={corporationFieldName.corporationName}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.corporationName}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="Full registered legal name as per company registration"
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </Typography>
                <InputField
                  margincustom="0px"
                  name={CORPORATE_INPUT_NAME.COMPANY_NAME}
                  form={form}
                  disabled={isPendingReview}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography
                  component="div"
                  className="wrapper_content_title_input"
                >
                  <Tooltip title={corporationFieldName.corporationNumber}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.corporationNumber}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="Official company registration number"
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </Typography>
                <InputField
                  disabled={!isCompanyIncorporatedStatus || isPendingReview}
                  name={CORPORATE_INPUT_NAME.COMPANY_NUMBER}
                  margincustom="0px"
                  form={form}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography
                  component="div"
                  className="wrapper_content_title_input"
                >
                  <Tooltip title={corporationFieldName.dateOfIncorporation}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.dateOfIncorporation}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="Date company was officially registered"
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </Typography>
                <TimePicker
                  placeholder="DD/MM/YYYY"
                  name={CORPORATE_INPUT_NAME.DATE_OF_INCORPORATION}
                  form={form}
                  disabled={isPendingReview}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography
                  component="div"
                  className="wrapper_content_title_input"
                >
                  <Tooltip title={corporationFieldName.companyAge}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.companyAge}
                    </Typography>
                  </Tooltip>
                </Typography>
                <Typography
                  component="div"
                  className="wrapper_content_company_age"
                >
                  {convertTimestamp(moment(dateTimeCorporateDob).unix())}
                </Typography>
              </Grid>
            </Grid>

            <CompanyIncorporatedOption>
              <Typography component="div" className="label_warning">
                Please review your answers, you will not be able to edit the
                details once you progress!
              </Typography>

              <Typography component="div" className="label_assignee">
                Assignee*
              </Typography>

              <Controller
                name={INPUT_NAME.ASSIGNED_USER}
                control={form.control}
                render={({ field, field: { value } }) => {
                  return (
                    <Autocomplete
                      className="option"
                      options={dataUsersActive?.list}
                      disabled={
                        accountInfo?.roles.includes(ROLES.USER) ||
                        isPendingReview
                      }
                      getOptionLabel={(option) => option?.name}
                      value={value}
                      onChange={(_event, option) => {
                        field.onChange(option);
                      }}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          error={Boolean(
                            form.formState.errors?.assigned_user_id
                          )}
                          helperText={
                            form.formState.errors?.assigned_user_id?.message
                          }
                        />
                      )}
                    />
                  );
                }}
              />
            </CompanyIncorporatedOption>

            <Box className="wrapper_button">
              <CancelButton assessmentCaseData={corporateAssessmentCaseData} />
              <Button
                color="primary"
                variant="outlined"
                onClick={handleBackStep}
                style={{ marginRight: '15px' }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={
                  !Object.keys(corporateAssessmentCaseData)?.length ||
                  corporateAssessmentCaseData.status ===
                    ASSESSMENT_STATUS.IN_PROGRESS
                    ? form.handleSubmit(
                        handleCheckPotentialProhibitedClientDetected
                      )
                    : () => handleNextStep()
                }
              >
                {accountInfo?.id === assignedUser?.id ||
                corporateAssessmentCaseData.status ===
                  ASSESSMENT_STATUS.PENDING_REVIEW
                  ? 'Next'
                  : 'Delegate'}
              </Button>
            </Box>
            <Dialog
              title="POTENTIAL PROHIBITED CLIENT DETECTED"
              description="We detected the following companies with similar information in the Prohibited Client List "
              isOpenDialog={isOpenDialogPotentialProhibitedClientDetected}
            >
              <DialogContainer>
                <Typography>Inputted information:</Typography>
                <Box className="inputted_information">
                  <Typography component="span">
                    {form.getValues(CORPORATE_INPUT_NAME.COMPANY_NAME)} -{' '}
                  </Typography>
                  {isCompanyIncorporatedStatus && (
                    <Typography component="span">
                      {form.getValues(CORPORATE_INPUT_NAME.COMPANY_NUMBER)} -{' '}
                    </Typography>
                  )}
                  <Typography component="span">
                    {moment(
                      form.getValues(CORPORATE_INPUT_NAME.DATE_OF_INCORPORATION)
                    ).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
                <Box className="client_list">
                  <Box className="client_list_bar">
                    <Typography>Prohibited Client List:</Typography>
                    <Typography>Matched</Typography>
                  </Box>
                  <Controller
                    control={prohibitedForm.control}
                    name={CORPORATE_INPUT_NAME.POTENTIAL_CORPORATE_PROHIBITED}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                      >
                        {dataPotentialCorporateProhibitedClients.map((item) => (
                          <Box key={item.check_string} className="list_item">
                            <FormControlLabel
                              value={item.check_string}
                              control={<Radio />}
                              className="list_label"
                              label={item.check_string}
                            />
                            <Typography className="text_percent">
                              {item.score}%
                            </Typography>
                          </Box>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </Box>
                <Button
                  className="button"
                  variant="contained"
                  color="primary"
                  disabled={!prohibitedForm.formState.isDirty}
                  type="submit"
                  onClick={prohibitedForm.handleSubmit(
                    handleSubmitProhibitedClientDetectedForm
                  )}
                >
                  The company is a prohibited client
                </Button>
                {accountInfo?.id === assignedUser?.id ? (
                  <Button
                    className="button"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      dispatch(clearCorporateProhibitedData());
                      if (prohibitedClientSelected >= 0) {
                        dispatch(
                          setCorporateProhibitedClientFlag({
                            isProhibitedClientFlag: false,
                          })
                        );
                      }
                      handleNextStep();
                    }}
                  >
                    Not a prohibited client, continue with risk assessment
                  </Button>
                ) : (
                  <Button
                    className="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleCorporateAssignee}
                  >
                    Not a prohibited client, continue with risk assessment
                  </Button>
                )}
              </DialogContainer>
            </Dialog>

            <Dialog
              title="PROHIBITED CLIENT DETECTED"
              description="Prohibited Client Matched:"
              isOpenDialog={isOpenDialogProhibitedClientDetected}
            >
              <DialogContainer>
                <LoadingOverlay active={isLoadingDialog} spinner>
                  <Typography component="span">
                    {form.getValues(CORPORATE_INPUT_NAME.COMPANY_NAME)} -{' '}
                  </Typography>
                  {isCompanyIncorporatedStatus && (
                    <Typography component="span">
                      {form.getValues(CORPORATE_INPUT_NAME.COMPANY_NUMBER)} -{' '}
                    </Typography>
                  )}
                  <Typography component="span">
                    {moment(
                      form.getValues(CORPORATE_INPUT_NAME.DATE_OF_INCORPORATION)
                    ).format('DD/MM/YYYY')}
                  </Typography>
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={form.handleSubmit(handleSubmitProhibitedConfirmed)}
                  >
                    Abort this assessment
                  </Button>
                  {accountInfo?.id === assignedUser?.id ? (
                    <Button
                      className="button"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        dispatch(clearCorporateProhibitedData());
                        if (prohibitedClientSelected >= 0) {
                          dispatch(
                            setCorporateProhibitedClientFlag({
                              isProhibitedClientFlag: true,
                            })
                          );
                        }
                        handleNextStep();
                      }}
                    >
                      Prohibited client, continue with risk assessment
                    </Button>
                  ) : (
                    <Button
                      className="button"
                      variant="outlined"
                      color="primary"
                      onClick={handleCorporateAssignee}
                    >
                      Prohibited client, continue with risk assessment
                    </Button>
                  )}
                </LoadingOverlay>
              </DialogContainer>
            </Dialog>
          </form>
        </Box>
      </LoadingOverlay>
    </Wrapper>
  );
};

export default Step2CompanyStatusCorporate;
