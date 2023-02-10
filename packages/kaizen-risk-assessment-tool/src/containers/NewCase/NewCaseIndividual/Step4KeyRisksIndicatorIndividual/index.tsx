import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Tooltip } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import InputSelectKRI from '../../../../components/InputSelectKRI';
import CancelButton from '../../components/CancelButton';
import InputMultiSelectCountries from '../../../../components/InputMultiSelectCountries';

import {
  NOT_APPLICABLE,
  OPTION_DATATYPE,
  REQUEST_STATUS,
  ASSESSMENT_STATUS,
} from '../../../../constants/common';

import {
  setSelectedIndividualPrimary,
  setSelectedIndividualSecondary,
  selectNewCaseIndividualStore,
  setMultiSelectedIndividualPrimary,
  setMultiSelectedIndividualSecondary,
} from '../reducer';

import { selectNewCaseStore } from '../../reducer';

import { Wrapper } from './styles';
import { Help, RickIndicator, KeyRiskTitle } from '../../styles';

const Step4KeyRisksIndicatorIndividual = ({
  form,
  handleBackStep,
  handleNextStep,
  legalName,
  handleOpenSaveDraftDialog,
  individualAssessmentsCaseData,
}: any) => {
  const {
    individualGeneralSettings,
    indicatorSettingsIndividualPrimary,
    indicatorSettingsIndividualSecondary,
    professionSector,
    countryOfResidence,
    isIndividualProhibitedClientFlagStatus,
  } = useSelector(selectNewCaseIndividualStore);

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
        <Typography className="title">
          Please select answers from dropdown options
        </Typography>
        <form>
          <div>
            {indicatorSettingsIndividualPrimary?.map((item) => (
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
                          ? professionSector
                          : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                          ? countryOfResidence
                          : item?.options
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
                          setMultiSelectedIndividualPrimary({
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
                        ? professionSector
                        : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? countryOfResidence
                        : item?.options
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
                      dispatch(setSelectedIndividualPrimary(indicatorOptions));
                    }}
                  />
                )}
                {individualGeneralSettings?.is_show_risk_ratings && (
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

            {indicatorSettingsIndividualSecondary?.map((item) => (
              <RickIndicator description={item?.description} key={item?.id}>
                <KeyRiskTitle description={item?.description}>
                  <Typography>{item?.name}</Typography>
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
                          ? professionSector
                          : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                          ? countryOfResidence
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
                          setMultiSelectedIndividualSecondary({
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
                        ? professionSector
                        : item?.option_data_type === OPTION_DATATYPE.COUNTRY
                        ? countryOfResidence
                        : item?.options
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
                      dispatch(
                        setSelectedIndividualSecondary(indicatorOptions)
                      );
                    }}
                  />
                )}

                {individualGeneralSettings?.is_show_risk_ratings && (
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
            <CancelButton assessmentCaseData={individualAssessmentsCaseData} />

            {individualAssessmentsCaseData?.status !==
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
              type="submit"
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

export default Step4KeyRisksIndicatorIndividual;
