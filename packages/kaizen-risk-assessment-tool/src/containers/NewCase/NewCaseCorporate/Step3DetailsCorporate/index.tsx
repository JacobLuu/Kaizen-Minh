import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Grid,
  Tooltip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useWatch } from 'react-hook-form';
import InputSelectKRI from '../../../../components/InputSelectKRI';
import InputSelect from '../../../../components/InputSelect';
import InputField from '../../../../components/InputField';
import CancelButton from '../../components/CancelButton';

import InputMultiSelectCountries from '../../../../components/InputMultiSelectCountries';
import { CORPORATE_INPUT_NAME } from '../../formInputNames';

import {
  CLIENT_IS_NOT_LISTED_ID,
  CORPORATE_CLIENT_TYPE_ID,
  CORPORATE_LISTED_STATUS_ID,
  JURISDICTION_INCORPORATION_ID,
  JURISDICTION_OPERATION_ID,
  NOT_APPLICABLE,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../../../constants/common';

import {
  selectNewCaseCorporateStore,
  setInputClientType,
  setCorporateIsListedTrue,
  setCorporateIsListedFalse,
  setJurisdictionIncorporation,
  setJurisdictionOperation,
  setDefaultValueSelectCorporateStatuses,
  setDefaultValueSelectLegalTypes,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { Wrapper, CompanyIncorporatedOption } from './styles';
import { Help } from '../../styles';

const Step3DetailsCorporate = ({
  form,
  formStep4,
  handleBackStep,
  handleNextStep,
  handleOpenSaveDraftDialog,
  corporateAssessmentCaseData,
}: any) => {
  const {
    corporationFieldName,
    corporateClientTypes,
    corporateStatuses,
    settingCountries,
    countryOfOperationSettings,
    legalTypes,
    corporateGeneralSettings,
  } = useSelector(selectNewCaseCorporateStore);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const { postNewCaseDataStatus, updateNewCaseDataStatus } =
    useSelector(selectNewCaseStore);

  const dispatch = useDispatch();

  const handleChangeRadioBvD = () => {
    if (form.getValues(CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS)) {
      form.setValue(CORPORATE_INPUT_NAME.BVD_NUMBER, '', {
        shouldValidate: true,
      });
      form.setValue(CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS, true, {
        shouldValidate: true,
      });
    } else {
      form.setValue(CORPORATE_INPUT_NAME.BVD_NUMBER, NOT_APPLICABLE, {
        shouldValidate: true,
      });
      form.setValue(CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS, false, {
        shouldValidate: true,
      });
    }
  };

  useEffect(() => {
    if (!corporateGeneralSettings?.is_include_bvd_number) {
      form.setValue(CORPORATE_INPUT_NAME.BVD_NUMBER, NOT_APPLICABLE, {
        shouldValidate: true,
      });
      form.setValue(CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS, false, {
        shouldValidate: true,
      });
    }
  }, [corporateGeneralSettings]);

  const isListed = useWatch({
    control: form.control,
    name: 'is_listed',
  });

  useEffect(() => {
    if (isListed) {
      formStep4.clearErrors(`${CORPORATE_LISTED_STATUS_ID}`);
      dispatch(
        setCorporateIsListedTrue({ indicator_id: CORPORATE_LISTED_STATUS_ID })
      );
    } else {
      formStep4.clearErrors(`${CORPORATE_LISTED_STATUS_ID}`);
      dispatch(setCorporateIsListedFalse({ id: CLIENT_IS_NOT_LISTED_ID }));
    }
  }, [isListed]);

  useEffect(() => {
    setIsLoadingPage(
      updateNewCaseDataStatus === REQUEST_STATUS.REQUESTING ||
        postNewCaseDataStatus === REQUEST_STATUS.REQUESTING
    );
  }, [postNewCaseDataStatus, updateNewCaseDataStatus]);

  return (
    <Wrapper>
      <LoadingOverlay active={isLoadingPage} spinner>
        <Typography className="title">
          Please enter additional information on the Client
        </Typography>
        <Box className="container">
          <form noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  <Tooltip title={corporationFieldName.clientType}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.clientType} *
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>

                <InputSelectKRI
                  name={CORPORATE_INPUT_NAME.CORPORATE_CLIENT_TYPE}
                  data={corporateClientTypes}
                  form={form}
                  optionName="short_description"
                  selectedIndicator={(selectedValue: any) => {
                    const indicatorOptions = JSON.parse(selectedValue);
                    formStep4.clearErrors(CORPORATE_CLIENT_TYPE_ID);
                    dispatch(setInputClientType(indicatorOptions));
                  }}
                />
              </Grid>
              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  <Tooltip title={corporationFieldName.corporateStatus}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.corporateStatus} *
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Place/standing in group" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>
                <InputSelect
                  name={CORPORATE_INPUT_NAME.CORPORATE_STATUS}
                  data={corporateStatuses}
                  form={form}
                  onChange={() => {
                    dispatch(setDefaultValueSelectCorporateStatuses());
                  }}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  <Tooltip title={corporationFieldName.countryOfIncorporation}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.countryOfIncorporation} *
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>
                <InputMultiSelectCountries
                  name={CORPORATE_INPUT_NAME.COUNTRY_OF_INCORPORATION}
                  form={form}
                  data={settingCountries}
                  optionName="name"
                  selectedIndicator={(selectedValues: any) => {
                    formStep4.clearErrors(JURISDICTION_INCORPORATION_ID);
                    dispatch(
                      setJurisdictionIncorporation({
                        indicator_id: JURISDICTION_INCORPORATION_ID,
                        indicatorOptions: [selectedValues],
                      })
                    );
                  }}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  <Tooltip title={corporationFieldName.countryOfOperation}>
                    <Typography className="wrapper_content_detail_title">
                      {corporationFieldName?.countryOfOperation} *
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>

                <InputMultiSelectCountries
                  name={CORPORATE_INPUT_NAME.COUNTRY_OF_OPERATION}
                  form={form}
                  optionName="name"
                  hasMultiple
                  data={countryOfOperationSettings}
                  selectedIndicator={(selectedValues: any) => {
                    formStep4.clearErrors(JURISDICTION_OPERATION_ID);
                    dispatch(
                      setJurisdictionOperation({
                        indicator_id: JURISDICTION_OPERATION_ID,
                        indicatorOptions: selectedValues,
                      })
                    );
                  }}
                />
              </Grid>

              {corporateGeneralSettings?.is_include_bvd_number && (
                <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                  <div className="wrapper_corporation_title">
                    <Typography
                      className="wrapper_content_title_input"
                      style={{ width: '50%' }}
                    >
                      <Tooltip title={corporationFieldName.bvdNumber}>
                        <Typography className="wrapper_content_detail_title">
                          {corporationFieldName?.bvdNumber} *
                        </Typography>
                      </Tooltip>
                      <Tooltip
                        title="Should the company have a profile on BvD tools, please provide"
                        placement="right"
                      >
                        <Help />
                      </Tooltip>
                    </Typography>
                    <CompanyIncorporatedOption>
                      <Controller
                        control={form.control}
                        name={CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS}
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            value={value ? 'true' : 'false'}
                            onChange={(e) => {
                              onChange(e.target.value === 'true');
                              handleChangeRadioBvD();
                            }}
                            className="radio_group"
                          >
                            <FormControlLabel
                              control={<Radio />}
                              value="true"
                              label="Yes"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              value="false"
                              label="No"
                            />
                          </RadioGroup>
                        )}
                      />
                    </CompanyIncorporatedOption>
                  </div>
                  <InputField
                    disabled={
                      !form.getValues(
                        CORPORATE_INPUT_NAME.CORPORATE_BVD_NUMBER_STATUS
                      )
                    }
                    name={CORPORATE_INPUT_NAME.BVD_NUMBER}
                    margincustom="0px"
                    form={form}
                  />
                </Grid>
              )}

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  {corporationFieldName?.internalId}
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>
                <InputField
                  name={CORPORATE_INPUT_NAME.INTERNAL_ID}
                  margincustom="0px"
                  form={form}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <Typography className="wrapper_content_title_input">
                  {corporationFieldName?.regulatoryId}
                  <Tooltip title="Client file reference ID" placement="right">
                    <Help />
                  </Tooltip>
                </Typography>
                <InputField
                  name={CORPORATE_INPUT_NAME.REGULATORY_ID}
                  margincustom="0px"
                  form={form}
                />
              </Grid>
              {form.getValues('corporate_industry_status') && (
                <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                  <Typography className="wrapper_content_title_input">
                    {corporationFieldName?.legalType} *
                    <Tooltip title="" placement="right">
                      <Help />
                    </Tooltip>
                  </Typography>

                  <InputSelect
                    name={CORPORATE_INPUT_NAME.TYPE_OF_LEGAL_ADVICE_OR_SERVICE}
                    data={legalTypes}
                    form={form}
                    onChange={() => {
                      dispatch(setDefaultValueSelectLegalTypes());
                    }}
                  />
                </Grid>
              )}
              <Grid
                className="wrapper_content_listed"
                item
                xs={12}
                sm={12}
                md={6}
              >
                <div className="wrapper_corporation_title">
                  <Typography className="wrapper_content_title_input">
                    {corporationFieldName?.listed} *
                    <Tooltip
                      title="If you select “No”, the corresponding value in 3. Key Risk Indicators will be “Client is not listed from an equivalent region” and non-editable"
                      placement="right"
                    >
                      <Help />
                    </Tooltip>
                  </Typography>
                </div>
                <CompanyIncorporatedOption>
                  <Controller
                    control={form.control}
                    name={CORPORATE_INPUT_NAME.LISTED}
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
                          value="true"
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="false"
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </CompanyIncorporatedOption>
              </Grid>
            </Grid>

            <Box className="wrapper_button">
              <CancelButton assessmentCaseData={corporateAssessmentCaseData} />

              {corporateAssessmentCaseData?.status !==
                ASSESSMENT_STATUS.PENDING_REVIEW && (
                <Button
                  color="primary"
                  variant="text"
                  style={{ marginRight: '15px' }}
                  onClick={handleOpenSaveDraftDialog}
                >
                  Save Draft
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

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={form.handleSubmit(handleNextStep)}
              >
                Next
              </Button>
            </Box>
          </form>
        </Box>
      </LoadingOverlay>
    </Wrapper>
  );
};

export default Step3DetailsCorporate;
