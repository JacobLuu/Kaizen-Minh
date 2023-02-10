import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'riskSetupSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    riskSetupStatus: REQUEST_STATUS.IDLE,
    updateRiskSetupStatus: REQUEST_STATUS.IDLE,
    assessmentSettingsData: [],

    /* Corporate */
    generalCorporateSettings: {},
    generalDefaultCorporateSettings: {},
    corporatePrimary: [],
    corporateSecondary: [],
    defaultValuesCorporatePrimary: [],
    defaultValuesCorporateSecondary: [],
    corporateLabelSetting: {},
    corporateRecommendationSetting: {},
    /* Individual */
    generalIndividualSettings: {},
    generalDefaultIndividualSettings: {},
    individualPrimary: [],
    individualSecondary: [],
    defaultValuesIndividualPrimary: [],
    defaultValuesIndividualSecondary: [],
    individualLabelSetting: {},
    individualRecommendationSetting: {},
  },

  reducers: {
    getRiskAssessmentSetupRequest: (state) => {
      state.riskSetupStatus = REQUEST_STATUS.REQUESTING;
      state.updateRiskSetupStatus = REQUEST_STATUS.IDLE;
    },
    getRiskAssessmentSetupSuccess: (state, { payload }) => {
      state.riskSetupStatus = REQUEST_STATUS.SUCCESS;

      if (payload) {
        state.assessmentSettingsData = payload;
      }

      /* Corporate */
      if (payload.general_settings?.corporate) {
        state.generalCorporateSettings = payload.general_settings.corporate;
      }

      if (payload.default_general_setting?.corporate) {
        state.generalDefaultCorporateSettings =
          payload.default_general_setting.corporate;
      }

      if (payload.indicator_settings?.corporate?.primary) {
        state.corporatePrimary = payload.indicator_settings.corporate.primary;

        state.defaultValuesCorporatePrimary =
          payload.indicator_settings.corporate.primary.map((item) => {
            return {
              id: item.id,
              is_enabled: item.is_enabled,
            };
          });
      }

      if (payload.indicator_settings?.corporate?.secondary) {
        state.corporateSecondary =
          payload.indicator_settings.corporate.secondary;

        state.defaultValuesCorporateSecondary =
          payload.indicator_settings.corporate.secondary.map((item) => {
            return {
              id: item.id,
              is_enabled: item.is_enabled,
            };
          });
      }

      if (payload.corporate_label_setting) {
        state.corporateLabelSetting = payload.corporate_label_setting;
      }

      if (payload.corporate_recommendation_setting) {
        state.corporateRecommendationSetting =
          payload.corporate_recommendation_setting;
      }

      /* Individual */
      if (payload.general_settings?.individual)
        state.generalIndividualSettings = payload.general_settings.individual;

      if (payload.default_general_setting?.individual)
        state.generalDefaultIndividualSettings =
          payload.default_general_setting.individual;

      if (payload.indicator_settings?.individual?.primary) {
        state.individualPrimary = payload.indicator_settings.individual.primary;

        state.defaultValuesIndividualPrimary =
          payload.indicator_settings.individual.primary.map((item) => {
            return {
              id: item.id,
              is_enabled: item.is_enabled,
            };
          });
      }

      if (payload.indicator_settings?.individual?.secondary) {
        state.individualSecondary =
          payload.indicator_settings.individual.secondary;

        state.defaultValuesIndividualSecondary =
          payload.indicator_settings.individual.secondary.map((item) => {
            return {
              id: item.id,
              is_enabled: item.is_enabled,
            };
          });
      }

      if (payload.individual_label_setting)
        state.individualLabelSetting = payload.individual_label_setting;

      if (payload.individual_recommendation_setting)
        state.individualRecommendationSetting =
          payload.individual_recommendation_setting;
    },
    getRiskAssessmentSetupFail: (state) => {
      state.riskSetupStatus = REQUEST_STATUS.ERROR;
    },

    saveRiskAssessmentSetupRequest: (state) => {
      state.updateRiskSetupStatus = REQUEST_STATUS.REQUESTING;
    },
    saveRiskAssessmentSetupSuccess: (state) => {
      state.updateRiskSetupStatus = REQUEST_STATUS.SUCCESS;
    },
    saveRiskAssessmentSetupFail: (state) => {
      state.updateRiskSetupStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  getRiskAssessmentSetupRequest,
  getRiskAssessmentSetupSuccess,
  getRiskAssessmentSetupFail,

  saveRiskAssessmentSetupRequest,
  saveRiskAssessmentSetupSuccess,
  saveRiskAssessmentSetupFail,
} = slice.actions;

export const selectRiskSetupSlice = (state: any) => state[sliceName];

export default slice.reducer;
