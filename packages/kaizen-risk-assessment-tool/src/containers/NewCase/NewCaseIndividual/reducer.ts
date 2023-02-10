import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  REQUEST_STATUS,
  DEFAULT_VALUE,
  COUNTRY_OF_RESIDENCE_ID,
  PROFESSION_OF_SECTOR_ID,
  INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID,
  INDIVIDUAL_PC_PROHIBITED_CLIENT_NOT_APPLICABLE,
  INDIVIDUAL_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED,
} from '../../../constants/common';
import hookConvertRiskScoreToRating from '../../../utils/hookConvertRiskScoreToRating';
import hookCheckAssessmentIndicatorsDuplicate from '../../../utils/hookCheckAssessmentIndicatorsDuplicate';
import {
  getAverageIndicatorOptionRiskScore,
  getAverageIndicatorOptions,
} from '../../../utils/getAverageIndicatorOptionRiskScore';

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

export const defaultValueSelectClientTypes = {
  full_description: '',
  id: DEFAULT_VALUE,
  is_high_risk: false,
  order: 1,
  risk_rating: '',
  risk_score: 0,
  short_description: '',
  disabled: false,
};

export const defaultValueSelectCountries = {
  cpi_score: 0,
  id: DEFAULT_VALUE,
  name: '',
  order: 0,
  risk_rating: '',
  risk_score: 0,
  disabled: false,
};

export const slice = createSlice({
  name: 'newCaseIndividualStore',
  initialState: {
    individualGeneralSettings: {},
    postIndividualDataStatus: REQUEST_STATUS.IDLE,
    checkIndividualProhibitedClientsStatus: REQUEST_STATUS.IDLE,
    indicatorSettingsIndividualPrimary: [],
    indicatorSettingsIndividualSecondary: [],
    dataPotentialIndividualProhibitedClients: [],
    allDataOptions: [],
    averageScore: 0,
    assessmentIndicators: [],
    individualAssessmentsCaseData: {},
    isAssessmentRatingHigh: false,
    getDataIndicatorSettingsIndividualStatus: REQUEST_STATUS.IDLE,
    getSettingStatus: REQUEST_STATUS.IDLE,
    professionSector: [],
    countriesOfBirth: [],
    dualNationality: [],
    countryOfResidence: [],
    previewResultData: {},
    keyRiskIndicators: [],
    legalTypes: [],
    isIndividualProhibitedClientFlagStatus: false,
    assessmentIndicatorsData: [],
    individualRecommendationSetting: {},
    individualFieldName: {
      individualName: 'Full Legal Name',
      knownAsName: 'Known as name',
      countryOfBirth: 'Country of Birth',
      dateOfBirth: 'Date of Birth',
      dualNationality: 'Nationality',
      countryOfResidence: 'Country of Residence',
      tileRole: 'Title/Role',
      individualSector: 'Individuals Profession / Sector',
      typeOfLegalAdvice: 'Type of Legal Advice or Service',
    },
  },
  reducers: {
    checkIndividualProhibitedClientsRequest: (state) => {
      state.checkIndividualProhibitedClientsStatus = REQUEST_STATUS.REQUESTING;
    },
    checkIndividualProhibitedClientsSuccess: (state, { payload }) => {
      state.dataPotentialIndividualProhibitedClients = payload.data.sort(
        (a, b) => b.score - a.score
      );
      state.checkIndividualProhibitedClientsStatus = REQUEST_STATUS.SUCCESS;
    },
    checkIndividualProhibitedClientsFail: (state) => {
      state.checkIndividualProhibitedClientsStatus = REQUEST_STATUS.ERROR;
    },

    getDataNewCaseSettingsIndividualRequest: (state, action) => {
      if (action) state.getSettingStatus = REQUEST_STATUS.REQUESTING;
    },
    getDataNewCaseSettingsIndividualSuccess: (state, { payload }) => {
      state.getSettingStatus = REQUEST_STATUS.SUCCESS;
      state.legalTypes = [defaultValueSelect, ...payload.legal_types];
      state.professionSector = [...payload.individual_sector];

      state.dualNationality = [...payload.countries];
      state.countriesOfBirth = [
        defaultValueSelectCountries,
        ...payload.countries,
      ];
      state.countryOfResidence = [...payload.countries];
    },
    getDataNewCaseSettingsIndividualFail: (state, action) => {
      if (action) state.getSettingStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsSettingsIndividualRequest: (state, action) => {
      if (action) {
        state.getDataIndicatorSettingsIndividualStatus =
          REQUEST_STATUS.REQUESTING;
      }
    },
    getDataAssessmentsSettingsIndividualSuccess: (state, { payload }) => {
      state.getDataIndicatorSettingsIndividualStatus = REQUEST_STATUS.SUCCESS;
      state.individualRecommendationSetting =
        payload.individual_recommendation_setting;

      const newIndividualFieldName = {
        individualName: payload?.individual_label_setting?.full_legal_name
          ? payload?.individual_label_setting?.full_legal_name
          : state.individualFieldName.individualName,
        countryOfBirth: payload?.individual_label_setting?.country_of_birth
          ? payload?.individual_label_setting?.country_of_birth
          : state.individualFieldName.countryOfBirth,
        dateOfBirth: payload?.individual_label_setting?.date_of_birth
          ? payload?.individual_label_setting?.date_of_birth
          : state.individualFieldName.dateOfBirth,
        knownAsName: payload?.individual_label_setting?.known_as_name
          ? payload?.individual_label_setting?.known_as_name
          : state.individualFieldName.knownAsName,
        countryOfResidence: payload?.individual_label_setting
          ?.country_of_residence
          ? payload?.individual_label_setting?.country_of_residence
          : state.individualFieldName.countryOfResidence,
        tileRole: payload?.individual_label_setting?.tile_role
          ? payload?.individual_label_setting?.tile_role
          : state.individualFieldName.tileRole,
        individualSector: payload?.individual_label_setting?.individual_sector
          ? payload?.individual_label_setting?.individual_sector
          : state.individualFieldName.individualSector,
        dualNationality: payload?.individual_label_setting?.nationality
          ? payload?.individual_label_setting?.nationality
          : state.individualFieldName.dualNationality,
        typeOfLegalAdvice: payload?.individual_label_setting?.legal_type
          ? payload?.individual_label_setting?.legal_type
          : state.individualFieldName.typeOfLegalAdvice,
      };

      if (payload?.individual_label_setting) {
        state.individualFieldName = newIndividualFieldName;
      }

      if (payload.general_settings?.individual) {
        state.individualGeneralSettings = payload.general_settings?.individual;
      }

      if (payload.indicator_settings?.individual?.primary) {
        state.indicatorSettingsIndividualPrimary =
          payload.indicator_settings.individual.primary.map((e) => {
            return {
              ...e,
              selectedOption: defaultValueSelect,
              disabledInput:
                e?.id === COUNTRY_OF_RESIDENCE_ID ||
                e?.id === PROFESSION_OF_SECTOR_ID,
              description:
                (e?.id === PROFESSION_OF_SECTOR_ID ||
                  e?.id === COUNTRY_OF_RESIDENCE_ID) &&
                'You have selected this value in 2. Individual Details',
            };
          });
      }

      state.indicatorSettingsIndividualPrimary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      if (payload.indicator_settings?.individual?.secondary) {
        state.indicatorSettingsIndividualSecondary =
          payload.indicator_settings.individual.secondary.map((e) => {
            return {
              ...e,
              selectedOption: defaultValueSelect,
              disabledInput:
                e?.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID,
            };
          });
      }

      state.indicatorSettingsIndividualSecondary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      // concat data Individual Primary && Individual Secondary
      if (
        state.indicatorSettingsIndividualPrimary &&
        state.indicatorSettingsIndividualSecondary
      ) {
        state.allDataOptions = state.indicatorSettingsIndividualPrimary.concat(
          state.indicatorSettingsIndividualSecondary
        );
      }
    },

    getDataAssessmentsSettingsIndividualFail: (state, action) => {
      if (action)
        state.getDataIndicatorSettingsIndividualStatus = REQUEST_STATUS.ERROR;
    },

    getDataAssessmentsCaseIndividualSuccess: (state, { payload }) => {
      state.getDataIndicatorSettingsIndividualStatus = REQUEST_STATUS.SUCCESS;
      state.individualAssessmentsCaseData = payload;

      if (payload.assessment_setting?.general_settings?.individual) {
        state.individualGeneralSettings =
          payload.assessment_setting?.general_settings?.individual;
      }

      if (payload.assessment_setting?.individual_recommendation_setting) {
        state.individualRecommendationSetting =
          payload.assessment_setting?.individual_recommendation_setting;
      }

      const newIndividualFieldName = {
        individualName: payload?.assessment_setting?.individual_label_setting
          ?.full_legal_name
          ? payload?.assessment_setting?.individual_label_setting
              ?.full_legal_name
          : state.individualFieldName.individualName,
        countryOfBirth: payload?.assessment_setting?.individual_label_setting
          ?.country_of_birth
          ? payload?.assessment_setting?.individual_label_setting
              ?.country_of_birth
          : state.individualFieldName.countryOfBirth,
        dateOfBirth: payload?.assessment_setting?.individual_label_setting
          ?.date_of_birth
          ? payload?.assessment_setting?.individual_label_setting?.date_of_birth
          : state.individualFieldName.dateOfBirth,
        knownAsName: payload?.assessment_setting?.individual_label_setting
          ?.known_as_name
          ? payload?.assessment_setting?.individual_label_setting?.known_as_name
          : state.individualFieldName.knownAsName,
        countryOfResidence: payload?.assessment_setting
          ?.individual_label_setting?.country_of_residence
          ? payload?.assessment_setting?.individual_label_setting
              ?.country_of_residence
          : state.individualFieldName.countryOfResidence,
        tileRole: payload?.assessment_setting?.individual_label_setting
          ?.tile_role
          ? payload?.assessment_setting?.individual_label_setting?.tile_role
          : state.individualFieldName.tileRole,
        individualSector: payload?.assessment_setting?.individual_label_setting
          ?.individual_sector
          ? payload?.assessment_setting?.individual_label_setting
              ?.individual_sector
          : state.individualFieldName.individualSector,
        dualNationality: payload?.assessment_setting?.individual_label_setting
          ?.nationality
          ? payload?.assessment_setting?.individual_label_setting?.nationality
          : state.individualFieldName.dualNationality,
        typeOfLegalAdvice: payload?.assessment_setting?.individual_label_setting
          ?.legal_type
          ? payload?.assessment_setting?.individual_label_setting?.legal_type
          : state.individualFieldName.typeOfLegalAdvice,
      };

      if (payload?.assessment_setting?.individual_label_setting) {
        state.individualFieldName = newIndividualFieldName;
      }

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

      if (
        payload?.assessment_setting?.indicator_settings?.individual?.primary
      ) {
        state.indicatorSettingsIndividualPrimary =
          payload.assessment_setting.indicator_settings.individual.primary.map(
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
                      is_make_assessment_rating_high:
                        item?.is_make_assessment_rating_high,
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
                selectedOption: e.is_multiple_select
                  ? {
                      indicatorOptions: assessmentIndicatorPrimary || {id: DEFAULT_VALUE},
                      risk_score: averageIndicatorOptionsRiskCore,
                      risk_rating: hookConvertRiskScoreToRating(
                        parseFloat(averageIndicatorOptionsRiskCore.toFixed(2))
                      ),
                    }
                  : assessmentIndicatorPrimary?.[0] || {id: DEFAULT_VALUE},
                disabledInput:
                  e?.id === COUNTRY_OF_RESIDENCE_ID ||
                  e?.id === PROFESSION_OF_SECTOR_ID,
                description:
                  (e?.id === PROFESSION_OF_SECTOR_ID ||
                    e?.id === COUNTRY_OF_RESIDENCE_ID) &&
                  'You have selected this value in 2. Individual Details',
              };
            }
          );
      }

      state.indicatorSettingsIndividualPrimary.map(
        (item) =>
          !item?.is_multiple_select &&
          item.options.unshift({
            indicator_id: item?.id,
            ...defaultValueSelect,
          })
      );

      if (payload.assessment_setting.indicator_settings.individual.secondary) {
        state.indicatorSettingsIndividualSecondary =
          payload.assessment_setting.indicator_settings.individual.secondary.map(
            (e) => {
              const assessmentIndicatorSecondary = [
                ...payload.assessment_indicators,
              ]
                .map((item) => {
                  if (e?.id === item?.indicator_id) {
                    return {
                      full_description: item.indicator_name,
                      id: item.indicator_option_id,
                      indicator_id: item.indicator_id,
                      risk_rating: item.indicator_option_risk_rating,
                      risk_score: item.indicator_option_risk_score,
                      short_description:
                        item.indicator_option_short_description,
                      name: item.indicator_option_short_description,
                      is_make_assessment_rating_high:
                        item?.is_make_assessment_rating_high,
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
                  e?.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID,
              };
            }
          );
      }

      state.indicatorSettingsIndividualSecondary.map(
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

    setSelectedIndividualPrimary: (state, { payload }) => {
      state.indicatorSettingsIndividualPrimary =
        state.indicatorSettingsIndividualPrimary.map((e) => {
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

    setSelectedIndividualSecondary: (state, { payload }) => {
      state.indicatorSettingsIndividualSecondary =
        state.indicatorSettingsIndividualSecondary.map((e) => {
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

    setMultiSelectedIndividualPrimary: (state, { payload }) => {
      const averageIndicatorOptionsRiskCore =
        getAverageIndicatorOptionRiskScore(payload.indicatorOptions);

      state.indicatorSettingsIndividualPrimary =
        state.indicatorSettingsIndividualPrimary.map((e) => {
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

    setMultiSelectedIndividualSecondary: (state, { payload }) => {
      const averageIndicatorOptionsRiskCore =
        getAverageIndicatorOptionRiskScore(payload.indicatorOptions);

      state.indicatorSettingsIndividualSecondary =
        state.indicatorSettingsIndividualSecondary.map((e) => {
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
      const concatData = state.indicatorSettingsIndividualPrimary.concat(
        state.indicatorSettingsIndividualSecondary
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

    // Country Of Residence
    setCountryOfResidence: (state, { payload }) => {
      state.indicatorSettingsIndividualPrimary =
        state.indicatorSettingsIndividualPrimary.map((e) => {
          if (e.id === COUNTRY_OF_RESIDENCE_ID) {
            return {
              ...e,
              options: [{ short_description: payload.indicatorOptions?.name }],
              selectedOption: {
                ...payload.indicatorOptions,
                indicator_id: payload.indicator_id,
                short_description: payload.indicatorOptions?.name,
              },
              disabledInput: true,
            };
          }
          return e;
        });

      const indicator = state.assessmentIndicators.find(
        (item) => item.indicator_id === payload.indicator_id
      );

      if (indicator) {
        indicator.indicator_options = indicator.indicator_options.map(
          (element) => {
            if (element.indicator_option_id !== payload.indicatorOptions.id) {
              return {
                indicator_option_id: payload.indicatorOptions.id,
                indicator_option_risk_score:
                  payload.indicatorOptions.risk_score,
                indicator_option_risk_rating:
                  payload.indicatorOptions.risk_rating.toLowerCase(),
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
              indicator_option_id: payload.indicatorOptions.id,
              indicator_option_risk_score: payload.indicatorOptions.risk_score,
              indicator_option_risk_rating:
                payload.indicatorOptions.risk_rating.toLowerCase(),
            },
          ],
        });
      }
    },

    // Individuals Profession / Sector
    setIndividualSector: (state, { payload }) => {
      state.indicatorSettingsIndividualPrimary =
        state.indicatorSettingsIndividualPrimary.map((e) => {
          if (e.id === payload?.indicator_id) {
            return {
              ...e,
              options: [
                {
                  short_description:
                    payload.indicatorOptions?.short_description,
                },
              ],
              selectedOption: {
                ...payload.indicatorOptions,
                indicator_id: payload.indicator_id,
                short_description: payload.indicatorOptions?.short_description,
              },
              disabledInput: true,
            };
          }
          return e;
        });

      const indicator = state.assessmentIndicators.find(
        (item) => item.indicator_id === payload.indicator_id
      );

      if (indicator) {
        indicator.indicator_options = indicator.indicator_options.map(
          (element) => {
            if (element.indicator_option_id !== payload.indicatorOptions.id) {
              return {
                indicator_option_id: payload.indicatorOptions.id,
                indicator_option_risk_score:
                  payload.indicatorOptions?.risk_score || 0,
                indicator_option_risk_rating:
                  payload.indicatorOptions?.risk_rating?.toLowerCase() || 0,
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
              indicator_option_id: payload.indicatorOptions.id,
              indicator_option_risk_score:
                payload.indicatorOptions?.risk_score || 0,
              indicator_option_risk_rating:
                payload.indicatorOptions?.risk_rating?.toLowerCase() || 0,
            },
          ],
        });
      }
    },

    setDefaultValueSelectLegalTypesDisable: (state) => {
      state.legalTypes = state.legalTypes.map((item, index) => {
        if (index === 0) {
          return { ...item, disabled: true };
        }
        return item;
      });
    },

    setDefaultValueSelectCountriesOfBirthDisable: (state) => {
      state.countriesOfBirth = state.countriesOfBirth.map((item, index) => {
        if (index === 0) {
          return { ...item, disabled: true };
        }
        return item;
      });
    },

    postIndividualDataRequest: (state, action) => {
      if (action) state.postIndividualDataStatus = REQUEST_STATUS.REQUESTING;
    },
    postIndividualDataSuccess: (state, action) => {
      if (action) state.postIndividualDataStatus = REQUEST_STATUS.SUCCESS;
    },
    postIndividualDataFail: (state, action) => {
      if (action) state.postIndividualDataStatus = REQUEST_STATUS.ERROR;
    },

    clearIndividualData: (state) => {
      state.indicatorSettingsIndividualPrimary = [];
      state.indicatorSettingsIndividualSecondary = [];
      state.postIndividualDataStatus = REQUEST_STATUS.IDLE;
      state.checkIndividualProhibitedClientsStatus = REQUEST_STATUS.IDLE;
      state.getDataIndicatorSettingsIndividualStatus = REQUEST_STATUS.IDLE;
      state.getSettingStatus = REQUEST_STATUS.IDLE;
      state.individualAssessmentsCaseData = {};
      state.individualGeneralSettings = {};
      state.dataPotentialIndividualProhibitedClients = [];
      state.isIndividualProhibitedClientFlagStatus = false;
      state.individualFieldName = {
        individualName: 'Full Legal Name',
        knownAsName: 'Known as name',
        countryOfBirth: 'Country of Birth',
        dateOfBirth: 'Date of Birth',
        dualNationality: 'Nationality',
        countryOfResidence: 'Country of Residence',
        tileRole: 'Title/Role',
        individualSector: 'Individuals Profession / Sector',
        typeOfLegalAdvice: 'Type of Legal Advice or Service',
      };
      state.assessmentIndicators = [];
      state.averageScore = 0;
      state.isAssessmentRatingHigh = false;
    },

    clearIndividualProhibitedData: (state) => {
      state.checkIndividualProhibitedClientsStatus = REQUEST_STATUS.IDLE;
      state.dataPotentialIndividualProhibitedClients = [];
    },

    setIndividualPreviewResultData: (state, { payload }) => {
      const concatData = state.indicatorSettingsIndividualPrimary.concat(
        state.indicatorSettingsIndividualSecondary
      );

      state.previewResultData = payload;

      const dataAssessmentIndicators = state.assessmentIndicators.map((e) => {
        const individualIndicator = concatData.find(
          (individualItem) => individualItem.id === e.indicator_id
        );
        return {
          ...e,
          indicator_name: individualIndicator?.name,
          category: individualIndicator?.category,
          indicator_option_risk_rating:
            individualIndicator?.selectedOption?.risk_rating,
          indicator_selected_option: individualIndicator?.selectedOption,
          is_high_risk: individualIndicator?.is_high_risk,
          is_make_assessment_rating_high:
            individualIndicator?.is_make_assessment_rating_high,
        };
      });

      state.keyRiskIndicators = dataAssessmentIndicators;
    },

    setIndividualProhibitedClientFlag: (state, { payload }) => {
      const { isProhibitedClientFlag } = payload;
      state.isIndividualProhibitedClientFlagStatus = isProhibitedClientFlag;

      const prohibitedClientSelected =
        state.indicatorSettingsIndividualSecondary.findIndex(
          (item) => item.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
        );

      if (prohibitedClientSelected >= 0) {
        const indicatorObject = state.indicatorSettingsIndividualSecondary.find(
          (item) => item.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
        );

        const indicatorOptionSelected = indicatorObject.options.find(
          (element) =>
            element.id ===
            (isProhibitedClientFlag
              ? INDIVIDUAL_PC_PROHIBITED_CLIENT_IS_ON_PROHIBITED
              : INDIVIDUAL_PC_PROHIBITED_CLIENT_NOT_APPLICABLE)
        );

        state.indicatorSettingsIndividualSecondary =
          state.indicatorSettingsIndividualSecondary.map((e) => {
            if (e.id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID) {
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
            item.indicator_id === INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
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

    removeIndividualProhibitedClientFlag: (state) => {
      state.assessmentIndicators = state.assessmentIndicators.filter(
        (item) =>
          item.indicator_id !== INDICATOR_INDIVIDUAL_PC_PROHIBITED_CLIENT_ID
      );
    },
  },
});

export const {
  checkIndividualProhibitedClientsRequest,
  checkIndividualProhibitedClientsSuccess,
  checkIndividualProhibitedClientsFail,

  getDataNewCaseSettingsIndividualRequest,
  getDataNewCaseSettingsIndividualSuccess,
  getDataNewCaseSettingsIndividualFail,

  getDataAssessmentsSettingsIndividualRequest,
  getDataAssessmentsSettingsIndividualSuccess,
  getDataAssessmentsSettingsIndividualFail,

  getDataAssessmentsCaseIndividualSuccess,

  postIndividualDataRequest,
  postIndividualDataSuccess,
  postIndividualDataFail,

  setIndividualSector,
  setSelectedIndividualPrimary,
  setSelectedIndividualSecondary,
  setCountryOfResidence,
  setMultiSelectedIndividualPrimary,
  setMultiSelectedIndividualSecondary,
  setDefaultValueSelectCountriesOfBirthDisable,
  setDefaultValueSelectLegalTypesDisable,
  getRiskAssessmentResults,
  setIndividualPreviewResultData,
  setIndividualProhibitedClientFlag,
  removeIndividualProhibitedClientFlag,
  clearIndividualData,
  clearIndividualProhibitedData,
} = slice.actions;

export const selectNewCaseIndividualStore = (state: any) =>
  state.newCaseIndividualStore;

export default slice.reducer;
