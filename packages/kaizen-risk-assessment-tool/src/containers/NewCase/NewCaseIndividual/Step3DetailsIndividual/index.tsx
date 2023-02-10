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
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputSelect from '../../../../components/InputSelect';
import InputField from '../../../../components/InputField';
import CancelButton from '../../components/CancelButton';
import InputMultiSelectCountries from '../../../../components/InputMultiSelectCountries';
import { INDIVIDUAL_INPUT_NAME } from '../../formInputNames';

import {
  PROFESSION_OF_SECTOR_ID,
  COUNTRY_OF_RESIDENCE_ID,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../../../constants/common';

import {
  selectNewCaseIndividualStore,
  setDefaultValueSelectLegalTypesDisable,
  setIndividualSector,
  setCountryOfResidence,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { Wrapper, CompanyIncorporatedOption } from './styles';
import { Help } from '../../styles';

const NATIONALITY_LIMIT = 1;
export const DUAL_NATIONALITY_LIMIT = 2;

const Step3DetailsIndividual = ({
  form,
  handleBackStep,
  handleNextStep,
  handleOpenSaveDraftDialog,
  individualAssessmentsCaseData,
}: any) => {
  const {
    individualFieldName,
    professionSector,
    legalTypes,
    dualNationality,
    countryOfResidence,
  } = useSelector(selectNewCaseIndividualStore);

  const { postNewCaseDataStatus, updateNewCaseDataStatus } =
    useSelector(selectNewCaseStore);

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const dispatch = useDispatch();

  const handleChangeRadioDualNationality = () => {
    const dualNationality = form.getValues(
      INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY
    );
    if (form.getValues(INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS)) {
      form.setValue(INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY, dualNationality);
      form.setValue(INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS, true, {
        shouldValidate: true,
      });
    } else {
      form.setValue(
        INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY,
        dualNationality.length >= DUAL_NATIONALITY_LIMIT
          ? dualNationality.splice(0, 1)
          : dualNationality
      );
      form.setValue(INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS, false, {
        shouldValidate: true,
      });
    }
  };

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
          Please enter the following client information
        </Typography>
        <Box className="container">
          <form noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.knownAsName}>
                    <Typography className="wrapper_content_detail_title">
                      {individualFieldName?.knownAsName}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </div>
                <InputField
                  name={INDIVIDUAL_INPUT_NAME.KNOW_AS_NAME}
                  margincustom="0px"
                  form={form}
                />
              </Grid>
              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.countryOfResidence}>
                    <Typography className="wrapper_content_detail_title">
                      {individualFieldName?.countryOfResidence}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </div>
                <InputMultiSelectCountries
                  name={INDIVIDUAL_INPUT_NAME.COUNTRY_OF_RESIDENCE}
                  data={countryOfResidence}
                  form={form}
                  optionName="name"
                  selectedIndicator={(selectedValue: any) => {
                    form.clearErrors(COUNTRY_OF_RESIDENCE_ID);
                    dispatch(
                      setCountryOfResidence({
                        indicator_id: COUNTRY_OF_RESIDENCE_ID,
                        indicatorOptions: selectedValue,
                      })
                    );
                  }}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.tileRole}>
                    <Typography className="wrapper_content_detail_title">
                      {individualFieldName?.tileRole}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="Please add: Mr, Mrs, Miss, Dr, Cllr or the role held with employer"
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </div>
                <InputField
                  margincustom="0px"
                  name={INDIVIDUAL_INPUT_NAME.TITLE_ROLE}
                  form={form}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <div className="wrapper_content_title_input">
                  <Tooltip title={individualFieldName.individualSector}>
                    <Typography className="wrapper_content_detail_title">
                      {individualFieldName?.individualSector}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="" placement="right">
                    <Help />
                  </Tooltip>
                </div>
                <InputMultiSelectCountries
                  name={INDIVIDUAL_INPUT_NAME.PROFESSION_SECTOR}
                  data={professionSector}
                  form={form}
                  optionName="short_description"
                  selectedIndicator={(selectedValue: any) => {
                    form.clearErrors(PROFESSION_OF_SECTOR_ID);
                    dispatch(
                      setIndividualSector({
                        indicator_id: PROFESSION_OF_SECTOR_ID,
                        indicatorOptions: selectedValue,
                      })
                    );
                  }}
                />
              </Grid>

              <Grid className="wrapper_content" item xs={12} sm={12} md={6}>
                <div
                  className="wrapper_content_title_input"
                  style={{ marginBottom: '0px', height: '22px' }}
                >
                  <Tooltip title={individualFieldName.dualNationality}>
                    <Typography className="wrapper_content_title_input">
                      {individualFieldName?.dualNationality}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title="You may choose up to two countries"
                    placement="right"
                  >
                    <Help />
                  </Tooltip>
                </div>
                <div className="wrapper_corporation_title">
                  <Typography className="wrapper_content_subtitle">
                    Does the client have dual nationality?
                  </Typography>
                  <CompanyIncorporatedOption>
                    <Controller
                      control={form.control}
                      name={INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS}
                      render={({ field: { onChange, value } }) => (
                        <RadioGroup
                          value={value ? 'true' : 'false'}
                          onChange={(e) => {
                            onChange(e.target.value === 'true');
                            handleChangeRadioDualNationality();
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

                <InputMultiSelectCountries
                  form={form}
                  name={INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY}
                  data={dualNationality}
                  hasMultiple
                  numberSelectedOptionLimit={
                    form.getValues(
                      INDIVIDUAL_INPUT_NAME.DUAL_NATIONALITY_STATUS
                    )
                      ? DUAL_NATIONALITY_LIMIT
                      : NATIONALITY_LIMIT
                  }
                  optionName="name"
                />
              </Grid>
              {form.getValues(
                INDIVIDUAL_INPUT_NAME.INDIVIDUAL_INDUSTRY_STATUS
              ) && (
                <Grid
                  className="wrapper_content"
                  style={{ alignContent: 'end', display: 'grid' }}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <div className="wrapper_content_title_input">
                    <Tooltip title={individualFieldName.typeOfLegalAdvice}>
                      <Typography className="wrapper_content_detail_title">
                        {individualFieldName?.typeOfLegalAdvice}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title="This is the country where the individual has (or) will have lived continuously for more than 12 months"
                      placement="right"
                    >
                      <Help />
                    </Tooltip>
                  </div>

                  <InputSelect
                    name={INDIVIDUAL_INPUT_NAME.TYPE_OF_LEGAL_ADVICE_OR_SERVICE}
                    data={legalTypes}
                    form={form}
                    onChange={() => {
                      dispatch(setDefaultValueSelectLegalTypesDisable());
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Box className="wrapper_button">
              <CancelButton
                assessmentCaseData={individualAssessmentsCaseData}
              />
              {individualAssessmentsCaseData?.status !==
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

export default Step3DetailsIndividual;
