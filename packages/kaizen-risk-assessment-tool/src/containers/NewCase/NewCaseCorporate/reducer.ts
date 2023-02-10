import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import corporate from '../../../translations/corporate';
import hookConvertRiskScoreToRating from '../../../utils/hookConvertRiskScoreToRating';
import hookCheckAssessmentIndicatorsDuplicate from '../../../utils/hookCheckAssessmentIndicatorsDuplicate';
import {
  getAverageIndicatorOptionRiskScore,
  getAverageIndicatorOptions,
} from '../../../utils/getAverageIndicatorOptionRiskScore';
import {
  REQUEST_STATUS,
  DEFAULT_VALUE,
  CORPORATE_CLIENT_TYPE_ID,
  CORPORATE_LISTED_STATUS_ID,
  JURISDICTION_INCORPORATION_ID,
  JURISDICTION_OPERATION_ID,
  CORPORATE_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED,
  CORPORATE_PC_PROHIBITED_CLIENT_NOT_APPLICABLE,
  INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID,
} from '../../../constants/common';

export const defaultValueSelect = {
  full_description: '',
  id: DEFAULT_VALUE,
  is_high_risk: false,
  is_make_assessment_rating_high: false,
  order: 1,
  risk_rating: '',
  risk_score: DEFAULT_VALUE,
  short_description: 'Please select an answer',
  disabled: false,
};

export const defaultValueSelectCountries = {
  cpi_score: DEFAULT_VALUE,
  id: undefined,
  name: '',
  order: DEFAULT_VALUE,
  risk_rating: '',
  risk_score: DEFAULT_VALUE,
  disabled: false,
};

export const defaultValueCorporateStatuses = {
  label: '',
  value: '',
  disabled: false,
};

export const slice = createSlice({
  name: 'newCaseCorporateStore',
  initialState: {
    getDataIndicatorSettingsCorporateStatus: REQUEST_STATUS.IDLE,
    getDataNewCaseStatus: REQUEST_STATUS.IDLE,
    checkCorporateProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    corporateGeneralSettings: {},
    corporationFieldName: {
      isCompanyIncorporated: 'Is this company incorporated?',
      corporationName: 'Company Name',
      corporationNumber: 'Company Number',
      dateOfIncorporation: 'Date of Incorporation',
      companyAge: 'Company Age',
      clientType: 'Client Type',
      corporateStatus: 'Corporate Status',
      countryOfIncorporation: 'Country of Incorporation',
      countryOfOperation: 'Country of Operation',
      bvdNumber: 'BvD Number',
      internalId: 'Internal ID',
      regulatoryId: 'Regulatory ID',
      listed: 'Listed',
      legalType: 'Type of Legal Advice or Service',
    },

    indicatorSettingsCorporatePrimary: [],
    indicatorSettingsCorporateSecondary: [],

    dataPotentialCorporateProhibitedClients: [],

    corporateAssessmentCaseData: {},
    corporateRecommendationSetting: {},
    allDataOption: [],
    averageScore: 0,
    assessmentIndicators: [],
    isAssessmentRatingHigh: false,

    keyRiskIndicators: [],
    corporateClientTypes: [],
    corporateListedTypes: [],
    corporateStatuses: [],
    settingCountries: [],
    countryOfOperationSettings: [],
    individualSector: [],
    legalTypes: [],

    previewResultData: {},
    isCorporateProhibitedClientFlagStatus: false,
  },

  reducers: {
    checkCorporateProhibitedClientsRequest: (state) => {
      state.checkCorporateProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    checkCorporateProhibitedClientsSuccess: (state, { payload }) => {
      state.dataPotentialCorporateProhibitedClients = payload.data.sort(
        (a, b) => b.score - a.score
      );
      state.checkCorporateProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    checkCorporateProhibitedClientsFail: (state) => {
      state.checkCorporateProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    getDataNewCaseSettingsCorporateRequest: (state) => {
      state.getDataNewCaseStatus = REQUEST_STATUS.REQUESTING;
    },
    getCorporateNewCaseSettingsDataSuccess: (state, { payload }) => {
      state.getDataNewCaseStatus = REQUEST_STATUS.SUCCESS;
      state.corporateClientTypes = [
        {
          indicator_id: payload.corporate_client_types?.[0]?.indicator_id,
          short_description: '',
        },
        ...payload.corporate_client_types,
      ];
      state.corporateListedTypes = [
        {
          indicator_id: payload.corporate_listed_types?.[0]?.indicator_id,
          ...defaultValueSelect,
        },
        ...payload.corporate_listed_types,
      ];
      state.corporateStatuses = [
        defaultValueCorporateStatuses,
        ...payload.corporate_statuses,
      ];
      state.settingCountries = [...payload.countries];
      state.countryOfOperationSettings = [...payload.countries];
      state.individualSector = payload.individual_sector;
      state.legalTypes = [defaultValueSelect, ...payload.legal_types];
    },
    getDataNewCaseSettingsCorporateFail: (state) => {
      state.getDataNewCaseStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsSettingsCorporateRequest: (state) => {
      state.getDataIndicatorSettingsCorporateStatus = REQUEST_STATUS.REQUESTING;
    },
    getCorporateAssessmentsSettingsDataSuccess: (state, { payload }) => {
      state.getDataIndicatorSettingsCorporateStatus = REQUEST_STATUS.SUCCESS;
      state.corporateRecommendationSetting =
        payload.corporate_recommendation_setting;

      const newCorporationFieldName = {
        isCompanyIncorporated: payload?.corporate_label_setting
          ?.is_company_incorporated
          ? payload?.corporate_label_setting?.is_company_incorporated
          : state.corporationFieldName.isCompanyIncorporated,
        corporationName: payload?.corporate_label_setting?.corporate_name
          ? payload?.corporate_label_setting?.corporate_name
          : state.corporationFieldName.corporationName,
        corporationNumber: payload?.corporate_label_setting?.corporate_number
          ? payload?.corporate_label_setting?.corporate_number
          : state.corporationFieldName.corporationNumber,
        dateOfIncorporation: payload?.corporate_label_setting
          ?.date_of_incorporation
          ? payload?.corporate_label_setting?.date_of_incorporation
          : state.corporationFieldName.dateOfIncorporation,
        companyAge: payload?.corporate_label_setting?.company_age
          ? payload?.corporate_label_setting?.company_age
          : state.corporationFieldName.dateOfIncorporation,
        clientType: payload?.corporate_label_setting?.client_type
          ? payload?.corporate_label_setting?.client_type
          : state.corporationFieldName.clientType,
        corporateStatus: payload?.corporate_label_setting?.corporate_status
          ? payload?.corporate_label_setting?.corporate_status
          : state.corporationFieldName.corporateStatus,
        countryOfIncorporation: payload?.corporate_label_setting
          ?.country_of_incorporation
          ? payload?.corporate_label_setting?.country_of_incorporation
          : state.corporationFieldName.countryOfIncorporation,
        countryOfOperation: payload?.corporate_label_setting
          ?.country_of_operation
          ? payload?.corporate_label_setting?.country_of_operation
          : state.corporationFieldName.countryOfOperation,
        bvdNumber: payload?.corporate_label_setting?.bvd_number
          ? payload?.corporate_label_setting?.bvd_number
          : state.corporationFieldName.bvdNumber,
        internalId: payload?.corporate_label_setting?.internal_id
          ? payload?.corporate_label_setting?.internal_id
          : state.corporationFieldName.internalId,
        regulatoryId: payload?.corporate_label_setting?.regulatory_id
          ? payload?.corporate_label_setting?.regulatory_id
          : state.corporationFieldName.regulatoryId,
        listed: payload?.corporate_label_setting?.listed
          ? payload?.corporate_label_setting?.listed
          : state.corporationFieldName.listed,
        legalType: payload?.corporate_label_setting?.legal_type
          ? payload?.corporate_label_setting?.legal_type
          : state.corporationFieldName.legalType,
      };

      if (payload?.corporate_label_setting) {
        state.corporationFieldName = newCorporationFieldName;
      }

      if (payload.general_settings?.corporate) {
        state.corporateGeneralSettings = payload.general_settings?.corporate;
      }

      // get data corporate primary
      if (payload?.indicator_settings?.corporate?.primary) {
        state.indicatorSettingsCorporatePrimary =
          payload.indicator_settings.corporate.primary.map((e) => {
            return {
              ...e,
              selectedOption: { indicator_id: e?.id, ...defaultValueSelect },
              disabledInput:
                e?.id === CORPORATE_CLIENT_TYPE_ID ||
                e?.id === JURISDICTION_INCORPORATION_ID ||
                e?.id === JURISDICTION_OPERATION_ID,
              description:
                (e?.id === CORPORATE_CLIENT_TYPE_ID ||
                  e?.id === JURISDICTION_INCORPORATION_ID ||
                  e?.id === JURISDICTION_OPERATION_ID) &&
                corporate.details_select_option,
              tooltip:
                e?.id === CORPORATE_LISTED_STATUS_ID &&
                corporate.tooltip_key_risk_indicators,
            };
          });
      }

      state.indicatorSettingsCorporatePrimary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      // get data corporate secondary
      if (payload?.indicator_settings?.corporate?.secondary) {
        state.indicatorSettingsCorporateSecondary =
          payload.indicator_settings?.corporate?.secondary.map((e) => {
            return {
              ...e,
              disabledInput:
                e?.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID,
              selectedOption: { indicator_id: e?.id, ...defaultValueSelect },
            };
          });
      }

      state.indicatorSettingsCorporateSecondary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      // merge data option
      state.allDataOption.concat(
        state.indicatorSettingsCorporatePrimary,
        state.indicatorSettingsCorporateSecondary
      );
    },

    getDataAssessmentsSettingsCorporateFail: (state) => {
      state.getDataIndicatorSettingsCorporateStatus = REQUEST_STATUS.ERROR;
    },

    getCorporateAssessmentCaseDataSuccess: (state, { payload }) => {
      state.getDataIndicatorSettingsCorporateStatus = REQUEST_STATUS.SUCCESS;
      state.corporateAssessmentCaseData = payload;

      const refactorDuplicateIndicator = (listOfIndicator) => {
        if (!listOfIndicator.length) return [];

        // Initial data
        const listedIndicatorId = listOfIndicator.map((v) => v.indicator_id);

        const duplicateIds = _.uniq(listedIndicatorId);
        const duplicates = listOfIndicator.filter((obj) =>
          duplicateIds.includes(obj.indicator_id)
        );

        const unDuplicates = listOfIndicator.filter(
          (obj) => !duplicateIds.includes(obj.indicator_id)
        );

        // Refactor duplicate
        const arrayDuplicate = [];
        if (duplicateIds.length) {
          let i = 0;
          while (i < duplicateIds.length) {
            const id = duplicateIds[i];
            const indicator = duplicates.filter((item) => {
              return item.indicator_id === id;
            });

            const indicatorOptions = indicator.map((item) => {
              return {
                indicator_option_id: item.indicator_option_id,
                indicator_option_risk_score: item.indicator_option_risk_score,
                indicator_option_risk_rating: item.indicator_option_risk_rating,
              };
            });

            arrayDuplicate.push({
              indicator_id: id,
              indicator_options: indicatorOptions,
            });

            // eslint-disable-next-line no-plusplus
            i++;
          }
        }

        // Refactor unduplicate
        let arrayAfter = [];
        if (unDuplicates.length) {
          arrayAfter = unDuplicates.map((item) => {
            return {
              indicator_id: item.indicator_id,
              indicator_options: [
                {
                  indicator_option_id: item.indicator_option_id,
                  indicator_option_risk_score: item.indicator_option_risk_score,
                  indicator_option_risk_rating:
                    item.indicator_option_risk_rating,
                },
              ],
            };
          });
        }

        const result = arrayAfter.concat(arrayDuplicate);
        return result;
      };

      const assessmentIndicatorsData = refactorDuplicateIndicator(
        hookCheckAssessmentIndicatorsDuplicate(payload)
      );

      state.assessmentIndicators = assessmentIndicatorsData;

      const newCorporationFieldName = {
        isCompanyIncorporated: payload?.assessment_setting
          ?.corporate_label_setting?.is_company_incorporated
          ? payload?.assessment_setting?.corporate_label_setting
              ?.is_company_incorporated
          : state.corporationFieldName.isCompanyIncorporated,
        corporationName: payload?.assessment_setting?.corporate_label_setting
          ?.corporate_name
          ? payload?.assessment_setting?.corporate_label_setting?.corporate_name
          : state.corporationFieldName.corporationName,
        corporationNumber: payload?.assessment_setting?.corporate_label_setting
          ?.corporate_number
          ? payload?.assessment_setting?.corporate_label_setting
              ?.corporate_number
          : state.corporationFieldName.corporationNumber,
        dateOfIncorporation: payload?.assessment_setting
          ?.corporate_label_setting?.date_of_incorporation
          ? payload?.assessment_setting?.corporate_label_setting
              ?.date_of_incorporation
          : state.corporationFieldName.dateOfIncorporation,
        companyAge: payload?.assessment_setting?.corporate_label_setting
          ?.company_age
          ? payload?.assessment_setting?.corporate_label_setting?.company_age
          : state.corporationFieldName.dateOfIncorporation,
        clientType: payload?.assessment_setting?.corporate_label_setting
          ?.client_type
          ? payload?.assessment_setting?.corporate_label_setting?.client_type
          : state.corporationFieldName.clientType,
        corporateStatus: payload?.assessment_setting?.corporate_label_setting
          ?.corporate_status
          ? payload?.assessment_setting?.corporate_label_setting
              ?.corporate_status
          : state.corporationFieldName.corporateStatus,
        countryOfIncorporation: payload?.assessment_setting
          ?.corporate_label_setting?.country_of_incorporation
          ? payload?.assessment_setting?.corporate_label_setting
              ?.country_of_incorporation
          : state.corporationFieldName.countryOfIncorporation,
        countryOfOperation: payload?.assessment_setting?.corporate_label_setting
          ?.country_of_operation
          ? payload?.assessment_setting?.corporate_label_setting
              ?.country_of_operation
          : state.corporationFieldName.countryOfOperation,
        bvdNumber: payload?.assessment_setting?.corporate_label_setting
          ?.bvd_number
          ? payload?.assessment_setting?.corporate_label_setting?.bvd_number
          : state.corporationFieldName.bvdNumber,
        internalId: payload?.assessment_setting?.corporate_label_setting
          ?.internal_id
          ? payload?.assessment_setting?.corporate_label_setting?.internal_id
          : state.corporationFieldName.internalId,
        regulatoryId: payload?.assessment_setting?.corporate_label_setting
          ?.regulatory_id
          ? payload?.assessment_setting?.corporate_label_setting?.regulatory_id
          : state.corporationFieldName.regulatoryId,
        listed: payload?.assessment_setting?.corporate_label_setting?.listed
          ? payload?.assessment_setting?.corporate_label_setting?.listed
          : state.corporationFieldName.listed,
        legalType: payload?.assessment_setting?.corporate_label_setting
          ?.legal_type
          ? payload?.assessment_setting?.corporate_label_setting?.legal_type
          : state.corporationFieldName.legalType,
      };

      if (payload?.assessment_setting?.corporate_label_setting) {
        state.corporationFieldName = newCorporationFieldName;
      }

      if (payload.assessment_setting?.general_settings?.corporate) {
        state.corporateGeneralSettings =
          payload.assessment_setting?.general_settings?.corporate;
      }

      if (payload.assessment_setting?.corporate_recommendation_setting) {
        state.corporateRecommendationSetting =
          payload.assessment_setting?.corporate_recommendation_setting;
      }

      if (payload?.assessment_setting?.indicator_settings?.corporate?.primary) {
        state.indicatorSettingsCorporatePrimary =
          payload?.assessment_setting?.indicator_settings?.corporate?.primary.map(
            (e) => {
              const assessmentIndicatorPrimary = [
                ...payload.assessment_indicators,
              ]
                .map((item) => {
                  if (e?.id === item?.indicator_id) {
                    return {
                      full_description: item?.indicator_name,
                      id: item?.indicator_option_id,
                      indicator_id: item?.indicator_id,
                      risk_rating: item?.indicator_option_risk_rating,
                      risk_score: item?.indicator_option_risk_score,
                      short_description:
                        item?.indicator_option_short_description,
                      name: item?.indicator_option_short_description,
                      indicator_name: item?.indicator_name,
                      is_make_assessment_rating_high:
                        item?.is_make_assessment_rating_high,
                      is_special_selection: item?.is_special_selection,
                      is_high_risk: item?.is_high_risk,
                    };
                  }
                  return undefined;
                })
                .filter((notUndefined) => notUndefined !== undefined);
              const averageIndicatorOptionsRiskCore =
                getAverageIndicatorOptions(assessmentIndicatorPrimary);

              return {
                ...e,
                selectedOption: e?.is_multiple_select
                  ? {
                      indicatorOptions: assessmentIndicatorPrimary || {id: DEFAULT_VALUE},
                      risk_score: averageIndicatorOptionsRiskCore,
                      risk_rating: hookConvertRiskScoreToRating(
                        parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                      ),
                    }
                  : assessmentIndicatorPrimary?.[0] || {id: DEFAULT_VALUE},
                disabledInput:
                  e?.id === CORPORATE_CLIENT_TYPE_ID ||
                  e?.id === JURISDICTION_INCORPORATION_ID ||
                  e?.id === JURISDICTION_OPERATION_ID,
                description:
                  (e?.id === CORPORATE_CLIENT_TYPE_ID ||
                    e?.id === JURISDICTION_INCORPORATION_ID ||
                    e?.id === JURISDICTION_OPERATION_ID) &&
                  corporate.details_select_option,
                tooltip:
                  e?.id === CORPORATE_LISTED_STATUS_ID &&
                  corporate.tooltip_key_risk_indicators,
              };
            }
          );
      }

      state.indicatorSettingsCorporatePrimary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      if (
        payload?.assessment_setting?.indicator_settings?.corporate?.secondary
      ) {
        state.indicatorSettingsCorporateSecondary =
          payload.assessment_setting.indicator_settings.corporate.secondary.map(
            (e) => {
              const assessmentIndicatorSecondary = [
                ...payload.assessment_indicators,
              ]
                .map((item) => {
                  if (e?.id === item?.indicator_id) {
                    return {
                      full_description: item?.indicator_name,
                      id: item?.indicator_option_id,
                      indicator_id: item?.indicator_id,
                      risk_rating: item?.indicator_option_risk_rating,
                      risk_score: item?.indicator_option_risk_score,
                      short_description:
                        item?.indicator_option_short_description,
                      name: item?.indicator_option_short_description,
                      indicator_name: item?.indicator_name,
                      is_make_assessment_rating_high:
                        item?.is_make_assessment_rating_high,
                      is_special_selection: item?.is_special_selection,
                      is_high_risk: item?.is_high_risk,
                    };
                  }
                  return undefined;
                })
                .filter((notUndefined) => notUndefined !== undefined);
              const averageIndicatorOptionsRiskCore =
                getAverageIndicatorOptions(assessmentIndicatorSecondary);

              return {
                ...e,
                selectedOption: e.is_multiple_select
                  ? {
                      indicatorOptions: assessmentIndicatorSecondary || {id: DEFAULT_VALUE},
                      risk_score: averageIndicatorOptionsRiskCore,
                      risk_rating: hookConvertRiskScoreToRating(
                        parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                      ),
                    }
                  : assessmentIndicatorSecondary?.[0] || {id: DEFAULT_VALUE},
                disabledInput:
                  e?.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID,
              };
            }
          );
      }

      state.indicatorSettingsCorporateSecondary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      if (payload.risk_score) {
        state.averageScore = payload.risk_score;
      }
    },

    setSelectedCorporatePrimary: (state, { payload }) => {
      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload?.indicator_id) {
            return {
              ...e,
              selectedOption: payload,
              options: e.options.map((item, index) => {
                if (index === 0) {
                  return { ...item, disabled: true };
                }
                return item;
              }),
            };
          }
          return e;
        });

      const checkedIndex = state.assessmentIndicators.findIndex(
        (item) => item?.indicator_id === payload?.indicator_id
      );

      if (checkedIndex > -1) {
        if (payload?.id !== 0) {
          state.assessmentIndicators[checkedIndex].indicator_options =
            state.assessmentIndicators[checkedIndex].indicator_options?.map(
              (element) => {
                if (element.indicator_option_id !== payload.id) {
                  return {
                    indicator_option_id: payload?.id,
                    indicator_option_risk_score: payload?.risk_score,
                    indicator_option_risk_rating:
                      payload?.risk_rating?.toLowerCase(),
                  };
                }
                return element;
              }
            );
        } else {
          state.assessmentIndicators.splice(checkedIndex, 1);
        }
      } else {
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: [
            {
              indicator_option_id: payload.id,
              indicator_option_risk_score: payload.risk_score,
              indicator_option_risk_rating: payload.risk_rating.toLowerCase(),
            },
          ],
        });
      }
    },

    setSelectedCorporateSecondary: (state, { payload }) => {
      state.indicatorSettingsCorporateSecondary =
        state.indicatorSettingsCorporateSecondary.map((e) => {
          if (e.id === payload?.indicator_id) {
            return {
              ...e,
              selectedOption: payload,
              options: e.options.map((item, index) => {
                if (index === 0) {
                  return { ...item, disabled: true };
                }
                return item;
              }),
            };
          }
          return e;
        });

      const checkedIndex = state.assessmentIndicators.findIndex(
        (item) => item?.indicator_id === payload?.indicator_id
      );

      if (checkedIndex > -1) {
        if (payload?.id !== 0) {
          state.assessmentIndicators[checkedIndex].indicator_options =
            state.assessmentIndicators[checkedIndex].indicator_options?.map(
              (element) => {
                if (element.indicator_option_id !== payload.id) {
                  return {
                    indicator_option_id: payload?.id,
                    indicator_option_risk_score: payload?.risk_score,
                    indicator_option_risk_rating:
                      payload?.risk_rating?.toLowerCase(),
                  };
                }
                return element;
              }
            );
        } else {
          state.assessmentIndicators.splice(checkedIndex, 1);
        }
      } else {
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: [
            {
              indicator_option_id: payload.id,
              indicator_option_risk_score: payload.risk_score,
              indicator_option_risk_rating: payload.risk_rating.toLowerCase(),
            },
          ],
        });
      }
    },

    setMultiSelectedCorporatePrimary: (state, { payload }) => {
      const averageIndicatorOptionsRiskCore = getAverageIndicatorOptions(
        payload.indicatorOptions
      );

      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload.indicator_id) {
            return {
              ...e,
              selectedOption: {
                indicatorOptions: payload.indicatorOptions,
                risk_score: parseFloat(
                  averageIndicatorOptionsRiskCore.toFixed(2)
                ),
                risk_rating: hookConvertRiskScoreToRating(
                  parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                ),
              },
            };
          }
          return e;
        });

      const checkedIndex = state.assessmentIndicators.findIndex(
        (item) => item?.indicator_id === payload?.indicator_id
      );

      if (checkedIndex > -1) {
        const indicatorOptionsMapData = payload?.indicatorOptions?.map((e) => {
          return {
            indicator_option_id: e?.id,
            indicator_option_risk_score: e?.risk_score,
            indicator_option_risk_rating: e?.risk_rating?.toLowerCase(),
          };
        });
        if (payload?.indicatorOptions?.length > 0) {
          state.assessmentIndicators[checkedIndex].indicator_options =
            indicatorOptionsMapData;
        } else {
          state.assessmentIndicators.splice(checkedIndex, 1);
        }
      } else {
        const indicatorOptionsMapData = payload?.indicatorOptions?.map((e) => {
          return {
            indicator_option_id: e?.id,
            indicator_option_risk_score: e?.risk_score,
            indicator_option_risk_rating: e?.risk_rating?.toLowerCase(),
          };
        });
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: indicatorOptionsMapData,
        });
      }
    },

    setMultiSelectedCorporateSecondary: (state, { payload }) => {
      const averageIndicatorOptionsRiskCore = getAverageIndicatorOptions(
        payload.indicatorOptions
      );

      state.indicatorSettingsCorporateSecondary =
        state.indicatorSettingsCorporateSecondary.map((e) => {
          if (e.id === payload.indicator_id) {
            return {
              ...e,
              selectedOption: {
                indicatorOptions: payload.indicatorOptions,
                risk_score: parseFloat(
                  averageIndicatorOptionsRiskCore.toFixed(2)
                ),
                risk_rating: hookConvertRiskScoreToRating(
                  parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                ),
              },
            };
          }
          return e;
        });

      const checkedIndex = state.assessmentIndicators.findIndex(
        (item) => item?.indicator_id === payload?.indicator_id
      );

      if (checkedIndex > -1) {
        const indicatorOptionsMapData = payload?.indicatorOptions?.map((e) => {
          return {
            indicator_option_id: e?.id,
            indicator_option_risk_score: e?.risk_score,
            indicator_option_risk_rating: e?.risk_rating?.toLowerCase(),
          };
        });
        if (payload?.indicatorOptions?.length > 0) {
          state.assessmentIndicators[checkedIndex].indicator_options =
            indicatorOptionsMapData;
        } else {
          state.assessmentIndicators.splice(checkedIndex, 1);
        }
      } else {
        const indicatorOptionsMapData = payload?.indicatorOptions?.map((e) => {
          return {
            indicator_option_id: e?.id,
            indicator_option_risk_score: e?.risk_score,
            indicator_option_risk_rating: e?.risk_rating?.toLowerCase(),
          };
        });
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: indicatorOptionsMapData,
        });
      }
    },

    getRiskAssessmentResults: (state) => {
      const averageIndicatorRiskCoreResult = getAverageIndicatorOptionRiskScore(
        state.assessmentIndicators
      );

      state.averageScore = parseFloat(
        averageIndicatorRiskCoreResult.toFixed(2)
      );
      const concatData = state.indicatorSettingsCorporatePrimary.concat(
        state.indicatorSettingsCorporateSecondary
      );

      const isMakeAssessmentRatingHigh = concatData.find(
        (item) => item.selectedOption?.is_make_assessment_rating_high === true
      );

      if (isMakeAssessmentRatingHigh) {
        state.isAssessmentRatingHigh = true;
      } else {
        state.isAssessmentRatingHigh = false;
      }
    },

    setJurisdictionIncorporation: (state, { payload }) => {
      // averaged risk score selected options
      const averageIndicatorOptionsRiskCore = getAverageIndicatorOptions(
        payload.indicatorOptions
      );

      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload.indicator_id) {
            return {
              ...e,
              selectedOption: {
                indicatorOptions: payload.indicatorOptions,
                risk_score: parseFloat(
                  averageIndicatorOptionsRiskCore.toFixed(2)
                ),
                risk_rating: hookConvertRiskScoreToRating(
                  parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                ),
              },
              disabledInput: true,
            };
          }
          return e;
        });

      const indicatorOptionsMapData = payload?.indicatorOptions?.map((e) => {
        return {
          indicator_option_id: e?.id,
          indicator_option_risk_score: e?.risk_score,
          indicator_option_risk_rating: e?.risk_rating.toLowerCase(),
        };
      });

      const indicator = state.assessmentIndicators.find(
        (item) => item.indicator_id === payload.indicator_id
      );

      if (indicator) {
        indicator.indicator_options = indicatorOptionsMapData;
      } else {
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: indicatorOptionsMapData,
        });
      }
    },

    setJurisdictionOperation: (state, { payload }) => {
      // averaged risk score selected options
      const averageIndicatorOptionsRiskCore = getAverageIndicatorOptions(
        payload.indicatorOptions
      );

      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload.indicator_id) {
            return {
              ...e,
              selectedOption: {
                indicatorOptions: payload.indicatorOptions,
                risk_score: parseFloat(
                  averageIndicatorOptionsRiskCore.toFixed(2)
                ),
                risk_rating: hookConvertRiskScoreToRating(
                  parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                ),
              },
              disabledInput: true,
            };
          }
          return e;
        });

      const indicatorOptionsMapData = payload.indicatorOptions.map((e) => {
        return {
          indicator_option_id: e.id,
          indicator_option_risk_score: e.risk_score,
          indicator_option_risk_rating: e.risk_rating.toLowerCase(),
        };
      });

      const indicator = state.assessmentIndicators?.find(
        (item) => item.indicator_id === payload.indicator_id
      );

      if (indicator) {
        indicator.indicator_options = indicatorOptionsMapData;
      } else {
        state.assessmentIndicators?.push({
          indicator_id: payload.indicator_id,
          indicator_options: indicatorOptionsMapData,
        });
      }
    },

    setDefaultValueSelectCorporateStatuses: (state) => {
      state.corporateStatuses = state.corporateStatuses.map((item, index) => {
        if (index === 0) {
          return { ...item, disabled: true };
        }
        return item;
      });
    },

    setDefaultValueSelectLegalTypes: (state) => {
      state.legalTypes = state.legalTypes.map((item, index) => {
        if (index === 0) {
          return { ...item, disabled: true };
        }
        return item;
      });
    },

    setInputClientType: (state, { payload }) => {
      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload?.indicator_id) {
            return {
              ...e,
              selectedOption: payload,
            };
          }
          return e;
        });

      state.corporateClientTypes = state.corporateClientTypes.map(
        (item, index) => {
          if (index === 0) {
            return { ...item, disabled: true };
          }
          return item;
        }
      );

      const indicator = state.assessmentIndicators?.find(
        (item) => item.indicator_id === payload.indicator_id
      );

      if (indicator) {
        indicator.indicator_options = indicator.indicator_options.map(
          (element) => {
            if (element.indicator_option_id !== payload.id) {
              return {
                indicator_option_id: payload.id,
                indicator_option_risk_score: payload.risk_score,
                indicator_option_risk_rating: payload.risk_rating.toLowerCase(),
              };
            }
            return element;
          }
        );
      } else {
        state.assessmentIndicators.push({
          indicator_id: payload.indicator_id,
          indicator_options: [
            {
              indicator_option_id: payload.id,
              indicator_option_risk_score: payload.risk_score,
              indicator_option_risk_rating: payload.risk_rating.toLowerCase(),
            },
          ],
        });
      }
    },

    setCorporateIsListedFalse: (state, { payload }) => {
      const listedTypeOption = state.corporateListedTypes.find(
        (item) => item.id === payload.id
      );

      if (listedTypeOption) {
        state.indicatorSettingsCorporatePrimary =
          state.indicatorSettingsCorporatePrimary.map((e) => {
            if (e.id === listedTypeOption?.indicator_id) {
              return {
                ...e,
                selectedOption: listedTypeOption,
                disabledInput: true,
              };
            }
            return e;
          });

        const indicator = state.assessmentIndicators.find(
          (item) => item.indicator_id === listedTypeOption.indicator_id
        );
        if (indicator) {
          indicator.indicator_options = indicator.indicator_options.map(
            (element) => {
              if (element.indicator_option_id !== listedTypeOption.id) {
                return {
                  indicator_option_id: listedTypeOption.id,
                  indicator_option_risk_score: listedTypeOption.risk_score,
                  indicator_option_risk_rating:
                    listedTypeOption.risk_rating.toLowerCase(),
                };
              }
              return element;
            }
          );
        } else {
          state.assessmentIndicators.push({
            indicator_id: listedTypeOption.indicator_id,
            indicator_options: [
              {
                indicator_option_id: listedTypeOption.id,
                indicator_option_risk_score: listedTypeOption.risk_score,
                indicator_option_risk_rating:
                  listedTypeOption.risk_rating.toLowerCase(),
              },
            ],
          });
        }
      }
    },

    setCorporateIsListedTrue: (state, { payload }) => {
      state.indicatorSettingsCorporatePrimary =
        state.indicatorSettingsCorporatePrimary.map((e) => {
          if (e.id === payload?.indicator_id) {
            return {
              ...e,
              disabledInput: false,
            };
          }
          return e;
        });
    },

    clearCorporateData: (state) => {
      state.indicatorSettingsCorporatePrimary = [];
      state.indicatorSettingsCorporateSecondary = [];
      state.assessmentIndicators = [];
      state.corporateAssessmentCaseData = {};
      state.dataPotentialCorporateProhibitedClients = [];
      state.checkCorporateProhibitedClientsStatus = REQUEST_STATUS.IDLE;
      state.getDataIndicatorSettingsCorporateStatus = REQUEST_STATUS.IDLE;
      state.getDataNewCaseStatus = REQUEST_STATUS.IDLE;
      state.settingCountries = [];
      state.corporateStatuses = [];
      state.corporateClientTypes = [];
      state.corporationFieldName = {
        isCompanyIncorporated: 'Is this company incorporated?',
        corporationName: 'Company Name',
        corporationNumber: 'Company Number',
        dateOfIncorporation: 'Date of Incorporation',
        companyAge: 'Company Age',
        clientType: 'Client Type',
        corporateStatus: 'Corporate Status',
        countryOfIncorporation: 'Country of Incorporation',
        countryOfOperation: 'Country of Operation',
        bvdNumber: 'BvD Number',
        internalId: 'Internal ID',
        regulatoryId: 'Regulatory ID',
        listed: 'Listed',
        legalType: 'Type of Legal Advice or Service',
      };
      state.isCorporateProhibitedClientFlagStatus = false;
      state.averageScore = 0;
      state.isAssessmentRatingHigh = false;
    },

    clearCorporateProhibitedData: (state) => {
      state.dataPotentialCorporateProhibitedClients = [];
      state.checkCorporateProhibitedClientsStatus = REQUEST_STATUS.IDLE;
    },

    setCorporatePreviewResultData: (state, { payload }) => {
      const concatData = state.indicatorSettingsCorporatePrimary.concat(
        state.indicatorSettingsCorporateSecondary
      );

      state.previewResultData = payload;

      const dataAssessmentIndicators = state.assessmentIndicators.map((e) => {
        const corporateIndicator = concatData.find(
          (corporateItem) => corporateItem.id === e.indicator_id
        );
        return {
          ...e,
          indicator_name: corporateIndicator?.name,
          category: corporateIndicator?.category,
          indicator_option_risk_rating:
            corporateIndicator?.selectedOption?.risk_rating,
          indicator_selected_option: corporateIndicator?.selectedOption,
        };
      });

      state.keyRiskIndicators = dataAssessmentIndicators;
    },

    setCorporateProhibitedClientFlag: (state, { payload }) => {
      const { isProhibitedClientFlag } = payload;
      state.isCorporateProhibitedClientFlagStatus = isProhibitedClientFlag;

      const prohibitedClientSelected =
        state.indicatorSettingsCorporateSecondary.findIndex(
          (item) => item.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
        );

      if (prohibitedClientSelected >= 0) {
        const indicatorObject = state.indicatorSettingsCorporateSecondary.find(
          (item) => item.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
        );

        const indicatorOptionSelected = indicatorObject.options.find(
          (element) =>
            element.id ===
            (isProhibitedClientFlag
              ? CORPORATE_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED
              : CORPORATE_PC_PROHIBITED_CLIENT_NOT_APPLICABLE)
        );

        state.indicatorSettingsCorporateSecondary =
          state.indicatorSettingsCorporateSecondary.map((e) => {
            if (e.id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID) {
              return {
                ...e,
                disabledInput: true,
                selectedOption: indicatorOptionSelected,
              };
            }
            return e;
          });

        const indicator = state.assessmentIndicators.find(
          (item) =>
            item.indicator_id === INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
        );

        if (!indicator) {
          state.assessmentIndicators.push({
            indicator_id: indicatorOptionSelected.indicator_id,
            indicator_options: [
              {
                indicator_option_id: indicatorOptionSelected.id,
                indicator_option_risk_score: indicatorOptionSelected.risk_score,
                indicator_option_risk_rating:
                  indicatorOptionSelected.risk_rating.toLowerCase(),
              },
            ],
          });
        }
      }
    },

    removeCorporateProhibitedClientFlag: (state) => {
      state.assessmentIndicators = state.assessmentIndicators.filter(
        (item) =>
          item.indicator_id !== INDICATOR_CORPORATE_PC_PROHIBITED_CLIENT_ID
      );
    },
  },
});

export const {
  checkCorporateProhibitedClientsRequest,
  checkCorporateProhibitedClientsSuccess,
  checkCorporateProhibitedClientsFail,

  getDataNewCaseSettingsCorporateRequest,
  getCorporateNewCaseSettingsDataSuccess,
  getDataNewCaseSettingsCorporateFail,

  getDataAssessmentsSettingsCorporateRequest,
  getCorporateAssessmentsSettingsDataSuccess,
  getDataAssessmentsSettingsCorporateFail,

  getCorporateAssessmentCaseDataSuccess,

  setJurisdictionIncorporation,
  setJurisdictionOperation,

  setDefaultValueSelectCorporateStatuses,
  setDefaultValueSelectLegalTypes,
  setSelectedCorporatePrimary,
  setSelectedCorporateSecondary,
  setMultiSelectedCorporatePrimary,
  setMultiSelectedCorporateSecondary,
  setInputClientType,
  setCorporateIsListedFalse,
  setCorporateIsListedTrue,
  setCorporatePreviewResultData,
  setCorporateProhibitedClientFlag,
  removeCorporateProhibitedClientFlag,
  getRiskAssessmentResults,
  clearCorporateData,
  clearCorporateProhibitedData,
} = slice.actions;

export const selectNewCaseCorporateStore = (state: any) =>
  state.newCaseCorporateStore;

export default slice.reducer;
