import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Tooltip } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import InputSelectKRI from '../../../../components/InputSelectKRI';
import InputMultiSelectCountries from '../../../../components/InputMultiSelectCountries';
import CancelButton from '../../components/CancelButton';

import {
  NOT_APPLICABLE,
  OPTION_DATATYPE,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../../../constants/common';

import {
  selectNewCaseCorporateStore,
  setSelectedCorporatePrimary,
  setSelectedCorporateSecondary,
  setMultiSelectedCorporatePrimary,
  setMultiSelectedCorporateSecondary,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { Wrapper } from './styles';
import { Help, RickIndicator, KeyRiskTitle } from '../../styles';

const Step4KeyRisksIndicatorCorporate = ({
  form,
  handleBackStep,
  handleNextStep,
  handleOpenSaveDraftDialog,
  companyName,
  corporateAssessmentCaseData,
}: any) => {
  const {
    individualSector,
    corporateGeneralSettings,
    countryOfOperationSettings,
    indicatorSettingsCorporatePrimary,
    indicatorSettingsCorporateSecondary,
    isCorporateProhibitedClientFlagStatus,
  } = useSelector(selectNewCaseCorporateStore);

  const { postNewCaseDataStatus, updateNewCaseDataStatus } =
    useSelector(selectNewCaseStore);

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingPage(
      updateNewCaseDataStatus === REQUEST_STATUS.REQUESTING ||
        postNewCaseDataStatus === REQUEST_STATUS.REQUESTING
    );
  }, [postNewCaseDataStatus, updateNewCaseDataStatus]);

  return (
    <Wrapper>
      <LoadingOverlay active={isLoadingPage} spinner>
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
        <Typography className="title">
          Please select answers from dropdown options
        </Typography>
        <form>
          <div>
            {indicatorSettingsCorporatePrimary?.map((item) => (
              <RickIndicator description={item?.description} key={item?.id}>
                <KeyRiskTitle description={item?.description}>
                  <Typography>{item?.name}</Typography>
                  {item?.tooltip && (
                    <Tooltip
                      className="margin_right_tooltip"
                      title={item?.tooltip}
                      placement="right"
                    >
                      <Help />
                    </Tooltip>
                  )}
                </KeyRiskTitle>

                {item?.is_multiple_select ? (
                  <Box style={{ width: '100%' }}>
                    <InputMultiSelectCountries
                      name={`${item?.id}`}
                      form={form}
                      hasMultiple
                      optionName={
                        item?.options?.length > 1 ? 'short_description' : 'name'
                      }
                      disabled={item?.disabledInput}
                      data={
                        item?.option_data_type === OPTION_DATATYPE.PROFESSION
                          ? individualSector
                          : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                          ? countryOfOperationSettings
                          : item?.options
                      }
                      placeholder={
                        item?.selectedOption?.indicatorOptions?.length > 0
                          ? null
                          : 'Please select an answer'
                      }
                      description={item?.description}
                      selectedOption={item?.selectedOption?.indicatorOptions}
                      selectedIndicator={(selectedValue: any) => {
                        dispatch(
                          setMultiSelectedCorporatePrimary({
                            indicator_id: item?.id,
                            indicatorOptions: selectedValue,
                          })
                        );
                      }}
                    />
                  </Box>
                ) : (
                  <InputSelectKRI
                    name={`${item?.id}`}
                    data={
                      item?.option_data_type === OPTION_DATATYPE.PROFESSION
                        ? individualSector
                        : item.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? countryOfOperationSettings
                        : item.options
                    }
                    optionName={
                      item?.option_data_type === OPTION_DATATYPE.PROFESSION
                        ? 'short_description'
                        : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? 'name'
                        : 'short_description'
                    }
                    form={form}
                    description={item?.description}
                    disabled={item?.disabledInput}
                    selectedOption={item?.selectedOption?.id}
                    selectedIndicator={(selectedValue: any) => {
                      const indicatorOptions = JSON.parse(selectedValue);
                      dispatch(setSelectedCorporatePrimary(indicatorOptions));
                    }}
                  />
                )}

                {corporateGeneralSettings?.is_show_risk_ratings && (
                  <div>
                    <div
                      className={`risk_rating_${
                        item.selectedOption?.risk_rating?.toLocaleUpperCase() !==
                          NOT_APPLICABLE && item.selectedOption?.risk_rating
                      }`.toLowerCase()}
                    >
                      {item.selectedOption?.risk_rating}
                    </div>
                    {!item.selectedOption?.risk_rating && (
                      <div className="empty">
                        {form.formState.errors[item?.id] && <WarningIcon />}
                      </div>
                    )}
                  </div>
                )}
              </RickIndicator>
            ))}

            {indicatorSettingsCorporateSecondary?.map((item) => (
              <RickIndicator description={item?.description} key={item?.id}>
                <KeyRiskTitle description={item.description}>
                  <Typography>{item.name}</Typography>
                  {item?.tooltip && (
                    <Tooltip title={item?.tooltip} placement="right">
                      <Help />
                    </Tooltip>
                  )}
                </KeyRiskTitle>

                {item?.is_multiple_select ? (
                  <Box style={{ width: '100%' }}>
                    <InputMultiSelectCountries
                      name={`${item?.id}`}
                      form={form}
                      hasMultiple
                      optionName={
                        item?.options?.length > 1 ? 'short_description' : 'name'
                      }
                      disabled={item?.disabledInput}
                      data={
                        item?.option_data_type === OPTION_DATATYPE.PROFESSION
                          ? individualSector
                          : item.option_data_type === OPTION_DATATYPE.COUNTRY
                          ? countryOfOperationSettings
                          : item.options
                      }
                      description={item?.description}
                      placeholder={
                        item?.selectedOption?.indicatorOptions?.length > 0
                          ? null
                          : 'Please select an answer'
                      }
                      selectedOption={item?.selectedOption?.indicatorOptions}
                      selectedIndicator={(selectedValue: any) => {
                        dispatch(
                          setMultiSelectedCorporateSecondary({
                            indicator_id: item?.id,
                            indicatorOptions: selectedValue,
                          })
                        );
                      }}
                    />
                  </Box>
                ) : (
                  <InputSelectKRI
                    name={`${item?.id}`}
                    data={
                      item?.option_data_type === OPTION_DATATYPE.PROFESSION
                        ? individualSector
                        : item.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? countryOfOperationSettings
                        : item.options
                    }
                    optionName={
                      item?.option_data_type === OPTION_DATATYPE.PROFESSION
                        ? 'short_description'
                        : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? 'name'
                        : 'short_description'
                    }
                    selectedOption={item?.selectedOption?.id}
                    form={form}
                    description={item?.description}
                    disabled={item?.disabledInput}
                    selectedIndicator={(selectedValue: any) => {
                      const indicatorOptions = JSON.parse(selectedValue);
                      dispatch(setSelectedCorporateSecondary(indicatorOptions));
                    }}
                  />
                )}

                {corporateGeneralSettings?.is_show_risk_ratings && (
                  <div>
                    <div
                      className={`risk_rating_${
                        item.selectedOption?.risk_rating?.toLocaleUpperCase() !==
                          NOT_APPLICABLE && item.selectedOption?.risk_rating
                      }`.toLowerCase()}
                    >
                      {item.selectedOption?.risk_rating}
                    </div>
                    {!item.selectedOption?.risk_rating && (
                      <div className="empty">
                        {form.formState.errors[item?.id] && <WarningIcon />}
                      </div>
                    )}
                  </div>
                )}
              </RickIndicator>
            ))}
          </div>

          <Box className="wrapper_button">
            <CancelButton assessmentCaseData={corporateAssessmentCaseData} />

            {corporateAssessmentCaseData?.status !==
              ASSESSMENT_STATUS.PENDING_REVIEW && (
              <Button
                color="primary"
                variant="text"
                onClick={handleOpenSaveDraftDialog}
                style={{ marginRight: '15px' }}
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
              onClick={form.handleSubmit(handleNextStep)}
            >
              Next
            </Button>
          </Box>
        </form>
      </LoadingOverlay>
    </Wrapper>
  );
};

export default Step4KeyRisksIndicatorCorporate;
