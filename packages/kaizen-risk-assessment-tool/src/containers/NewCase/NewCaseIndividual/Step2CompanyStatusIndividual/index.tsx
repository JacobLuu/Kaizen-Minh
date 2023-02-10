import React, { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useWatch } from 'react-hook-form';
import LoadingOverlay from 'react-loading-overlay';
import InputField from '../../../../components/InputField';
import TimePicker from '../../../../components/TimePicker';
import Dialog from '../../../../components/Dialog';
import CancelButton from '../../components/CancelButton';
import InputSelectCountries from '../../../../components/InputSelectCountries';
import useValidationResolver from '../../../../utils/hookValidationResolver';
import getReviewerUser from '../../../../utils/hookGetReviewerUser';
import { ACCOUNT_INFO } from '../../../../constants/localStorage';
import { INPUT_NAME, INDIVIDUAL_INPUT_NAME } from '../../formInputNames';
import {
  selectNewCaseIndividualStore,
  setDefaultValueSelectCountriesOfBirthDisable,
  checkIndividualProhibitedClientsRequest,
  clearIndividualProhibitedData,
  setIndividualProhibitedClientFlag,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { selectUsersList } from '../../../UsersList/reducer';
import { convertTimeToStartOfDay } from '../../../../utils/momentHelpers';
import {
  REQUEST_STATUS,
  ROLES,
  ASSESSMENT_STATUS,
  INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID,
} from '../../../../constants/common';
import { Wrapper, DialogContainer, CompanyIncorporatedOption } from './styles';
import { Help } from '../../styles';

const Step2CompanyStatusIndividual = ({
  form,
  handleBackStep,
  handleNextStep,
  step5IndividualForm,
  individualGeneralSettings,
  individualAssessmentsCaseData,
  handleSaveAbortIndividual,
  handleSubmitFormIndividualAssignee,
  handleUpdateFormIndividualAssignee,
}: any) => {
  const [
    isOpenDialogPotentialProhibitedClientDetected,
    setOpenDialogPotentialProhibitedClientDetected,
  ] = useState(false);

  const [
    isOpenDialogProhibitedClientDetected,
    setOpenDialogProhibitedClientDetected,
  ] = useState(false);
  const {
    individualFieldName,
    countriesOfBirth,
    dataPotentialIndividualProhibitedClients,
    checkIndividualProhibitedClientsStatus,
    indicatorSettingsIndividualSecondary,
  } = useSelector(selectNewCaseIndividualStore);

  const { postNewCaseDataStatus } = useSelector(selectNewCaseStore);

  const dispatch = useDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingDialog, setIsLoadingDialog] = useState(false);

  const accountInfo = JSON.parse(localStorage.getItem(ACCOUNT_INFO));
  const isPendingReview =
    individualAssessmentsCaseData.status === ASSESSMENT_STATUS.PENDING_REVIEW;
  const prohibitedSchemaObj = Yup.object().shape({
    potential_individual_prohibited: Yup.string(),
  });
  const dataUsersActive = useSelector(selectUsersList);

  const prohibitedClientSelected = useMemo(() => {
    return indicatorSettingsIndividualSecondary.findIndex(
      (item) => item.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
    );
  }, [indicatorSettingsIndividualSecondary]);

  const assignedUser = useWatch({
    control: form.control,
    name: INPUT_NAME.ASSIGNED_USER,
  });

  const prohibitedForm = useForm({
    defaultValues: {
      potential_individual_prohibited: '',
    },
    resolver: useValidationResolver(prohibitedSchemaObj),
  });

  const handleIndividualAssignee = () => {
    if (Object.keys(individualAssessmentsCaseData)?.length > 0) {
      return handleUpdateFormIndividualAssignee();
    }
    return handleSubmitFormIndividualAssignee();
  };

  const handleCheckPotentialProhibitedClientDetected = (data) => {
    if (prohibitedClientSelected >= 0) {
      const prohibitedClientDetectedForm = {
        full_name: data?.legal_name,
        country_id: data?.birth_country_id,
        date_of_birth: convertTimeToStartOfDay(data?.date_of_birth),
      };

      dispatch(
        checkIndividualProhibitedClientsRequest(prohibitedClientDetectedForm)
      );

      dispatch(
        setIndividualProhibitedClientFlag({
          isProhibitedClientFlag: false,
        })
      );
    } else if (accountInfo?.id === assignedUser?.id) {
      handleNextStep();
    } else {
      handleIndividualAssignee();
    }
  };

  const isCountriesOfBirthId = useWatch({
    control: form.control,
    name: INDIVIDUAL_INPUT_NAME.COUNTRY_OF_BIRTH,
  });

  const countryInfo = useMemo(() => {
    return countriesOfBirth?.find(
      (country) => country.id === parseInt(isCountriesOfBirthId, 10)
    );
  }, [isCountriesOfBirthId]);

  const handleSubmitProhibitedClientDetectedForm = () => {
    const prohibitedClientList = prohibitedForm.getValues(
      INDIVIDUAL_INPUT_NAME.POTENTIAL_INDIVIDUAL_PROHIBITED
    );

    const splitData = prohibitedClientList?.split('-');
    const inputFullName = splitData?.[0]?.trim();
    const inputCountryName = splitData?.[1]?.trim();
    const inputDateOfBirth = splitData?.[2]?.trim();

    const inputCountryInfo = countriesOfBirth?.find(
      (country) => country.name === inputCountryName
    );

    const splitDateOfBirth = inputDateOfBirth?.split('/');

    const year = splitDateOfBirth?.[2];
    const month = parseInt(splitDateOfBirth?.[1], 10);
    const day = splitDateOfBirth?.[0];

    const incorporationDate = new Date(
      year,
      month > 0 ? month - 1 : month,
      day
    );

    form.reset({
      legal_name: inputFullName,
      birth_country_id: inputCountryInfo?.id,
      date_of_birth: incorporationDate,
      assigned_user_id: assignedUser,
    });
    setOpenDialogProhibitedClientDetected(true);
    setOpenDialogPotentialProhibitedClientDetected(false);
  };

  const handleSubmitProhibitedConfirmed = () => {
    handleSaveAbortIndividual();
    setOpenDialogProhibitedClientDetected(true);
  };

  useEffect(() => {
    if (checkIndividualProhibitedClientsStatus === REQUEST_STATUS.SUCCESS) {
      if (prohibitedClientSelected >= 0) {
        if (dataPotentialIndividualProhibitedClients.length > 0) {
          const prohibitedClientMatched =
            dataPotentialIndividualProhibitedClients.find(
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
        dispatch(clearIndividualProhibitedData());
      } else {
        handleIndividualAssignee();
      }

      dispatch(clearIndividualProhibitedData());
    }
  }, [dataPotentialIndividualProhibitedClients]);

  useEffect(() => {
    step5IndividualForm.reset({
      is_update_case:
        !Object.keys(individualAssessmentsCaseData)?.length ||
        individualAssessmentsCaseData.status === ASSESSMENT_STATUS.IN_PROGRESS,
      reviewer_user_id: getReviewerUser({
        assessmentCaseData: individualAssessmentsCaseData,
        generalSettings: individualGeneralSettings,
        assignedUserId: assignedUser,
      }),
      risk_rating: individualAssessmentsCaseData?.risk_rating,
      risk_score: individualAssessmentsCaseData?.risk_score,
    });
  }, [assignedUser, individualAssessmentsCaseData, individualGeneralSettings]);

  useEffect(() => {
    setIsLoadingPage(
      checkIndividualProhibitedClientsStatus === REQUEST_STATUS.REQUESTING
    );
  }, [checkIndividualProhibitedClientsStatus]);

  useEffect(() => {
    setIsLoadingDialog(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
    setIsLoadingPage(postNewCaseDataStatus === REQUEST_STATUS.REQUESTING);
  }, [postNewCaseDataStatus]);

  return (
    <Wrapper>
      <LoadingOverlay active={isLoadingPage} spinner>
        <Typography className="title">
          Please enter the following client information
        </Typography>
        <form autoComplete="off">
          <Box className="container">
            <Grid container spacing={4}>
              <Grid className="wrapper_content" item xs={12} sm={12} md={12}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.individualName}>
                    <Typography className="wrapper_content_detail_title">
                      {`${individualFieldName?.individualName} *`}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </div>
                <InputField
                  name={INDIVIDUAL_INPUT_NAME.FULL_LEGAL_NAME}
                  margincustom="0px"
                  disabled={isPendingReview}
                  form={form}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={12}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.countryOfBirth}>
                    <Typography className="wrapper_content_detail_title">
                      {`${individualFieldName?.countryOfBirth} *`}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="This is the country in which the individual was born "
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </div>
                <InputSelectCountries
                  name={INDIVIDUAL_INPUT_NAME.COUNTRY_OF_BIRTH}
                  data={countriesOfBirth}
                  disabled={isPendingReview}
                  form={form}
                  selectedIndicator={() => {
                    dispatch(setDefaultValueSelectCountriesOfBirthDisable());
                  }}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={12}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.dateOfBirth}>
                    <Typography className="wrapper_content_detail_title">
                      {`${individualFieldName?.dateOfBirth} *`}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </div>
                <TimePicker
                  placeholder="DD/MM/YYYY"
                  disabled={isPendingReview}
                  name={INDIVIDUAL_INPUT_NAME.DATE_OF_BIRTH}
                  form={form}
                />
              </Grid>
            </Grid>
          </Box>

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
                      accountInfo?.roles.includes(ROLES.USER) || isPendingReview
                    }
                    getOptionLabel={(option) => option?.name}
                    value={value}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(_event, option) => {
                      field.onChange(option);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={Boolean(form.formState.errors?.assigned_user_id)}
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
            <CancelButton assessmentCaseData={individualAssessmentsCaseData} />

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
              onClick={
                !Object.keys(individualAssessmentsCaseData)?.length ||
                individualAssessmentsCaseData.status ===
                  ASSESSMENT_STATUS.IN_PROGRESS
                  ? form.handleSubmit(
                      handleCheckPotentialProhibitedClientDetected
                    )
                  : () => handleNextStep()
              }
            >
              {accountInfo?.id === assignedUser?.id ||
              individualAssessmentsCaseData.status ===
                ASSESSMENT_STATUS.PENDING_REVIEW
                ? 'Next'
                : 'Delegate'}
            </Button>
          </Box>

          <Dialog
            title="POTENTIAL PROHIBITED CLIENT DETECTED"
            description="We detected the following individuals with similar information in the Prohibited Client List"
            isOpenDialog={isOpenDialogPotentialProhibitedClientDetected}
          >
            <DialogContainer>
              <Typography>Inputted information:</Typography>
              <Box className="inputted_information">
                <Typography component="span">
                  {form.getValues(INDIVIDUAL_INPUT_NAME.FULL_LEGAL_NAME)} -{' '}
                </Typography>
                <Typography component="span">{countryInfo?.name} - </Typography>
                <Typography component="span">
                  {moment(
                    form.getValues(INDIVIDUAL_INPUT_NAME.DATE_OF_BIRTH)
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
                  name={INDIVIDUAL_INPUT_NAME.POTENTIAL_INDIVIDUAL_PROHIBITED}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    >
                      {dataPotentialIndividualProhibitedClients.map((item) => (
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
                    dispatch(clearIndividualProhibitedData());
                    if (prohibitedClientSelected >= 0) {
                      dispatch(
                        setIndividualProhibitedClientFlag({
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
                  onClick={handleIndividualAssignee}
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
                  {form.getValues(INDIVIDUAL_INPUT_NAME.FULL_LEGAL_NAME)} -{' '}
                </Typography>
                <Typography component="span">{countryInfo?.name}- </Typography>
                <Typography component="span">
                  {moment(
                    form.getValues(INDIVIDUAL_INPUT_NAME.DATE_OF_BIRTH)
                  ).format('DD/MM/YYYY')}
                </Typography>
                <Button
                  className="button"
                  variant="contained"
                  color="primary"
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
                      dispatch(clearIndividualProhibitedData());
                      if (prohibitedClientSelected >= 0) {
                        dispatch(
                          setIndividualProhibitedClientFlag({
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
                    onClick={handleIndividualAssignee}
                  >
                    Prohibited client, continue with risk assessment
                  </Button>
                )}
              </LoadingOverlay>
            </DialogContainer>
          </Dialog>
        </form>
      </LoadingOverlay>
    </Wrapper>
  );
};

export default Step2CompanyStatusIndividual;
