import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  saveRiskAssessmentSetupRequest,
  selectRiskSetupSlice,
} from '../reducer';
import { RecommendationsCustomizationContainer, Textarea } from './styles';
import { getTrimmedObject } from '../../../utils/index';

function RecommendationsCustomization({ form, isCorporate }: any) {
  const { control } = form;
  const dispatch = useDispatch();
  const {
    assessmentSettingsData,
    corporateLabelSetting,
    corporateRecommendationSetting,
    defaultValuesCorporatePrimary,
    defaultValuesCorporateSecondary,
    /* INDIVIDUAL */
    individualLabelSetting,
    individualRecommendationSetting,
    defaultValuesIndividualPrimary,
    defaultValuesIndividualSecondary,
  } = useSelector(selectRiskSetupSlice);

  const handleSubmitRecommendationsCustomizationForm = (data) => {
    const mapData = {
      corporate_general_setting:
        assessmentSettingsData.general_settings.corporate,
      individual_general_setting:
        assessmentSettingsData.general_settings.individual,
      corporate_indicator_setting: {
        primary: defaultValuesCorporatePrimary,
        secondary: defaultValuesCorporateSecondary,
      },
      individual_indicator_setting: {
        primary: defaultValuesIndividualPrimary,
        secondary: defaultValuesIndividualSecondary,
      },
      corporate_label_setting: corporateLabelSetting,
      individual_label_setting: individualLabelSetting,
      corporate_recommendation_setting: data.corporate_recommendation_setting
        ? getTrimmedObject(data.corporate_recommendation_setting)
        : corporateRecommendationSetting,
      individual_recommendation_setting: data.individual_recommendation_setting
        ? getTrimmedObject(data.individual_recommendation_setting)
        : individualRecommendationSetting,
    };

    dispatch(saveRiskAssessmentSetupRequest(mapData));
  };

  const recommendationSetting = isCorporate
    ? 'corporate_recommendation_setting'
    : 'individual_recommendation_setting';

  return (
    <RecommendationsCustomizationContainer>
      <form
        noValidate
        onSubmit={form.handleSubmit(
          handleSubmitRecommendationsCustomizationForm
        )}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography className="recommendations_customization_title">
              High Risk Recommendations:
            </Typography>

            <Controller
              name={`${recommendationSetting}.high_risk_recommendation`}
              control={control}
              render={({ field, fieldState, formState }) => {
                return (
                  <>
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      name={field.name}
                      id={field.name}
                      className={classNames('', {
                        field_error: fieldState.invalid,
                      })}
                    />
                    <Typography className="text_error">
                      {
                        formState.errors?.recommendationSetting
                          ?.high_risk_recommendation.message
                      }
                    </Typography>
                  </>
                );
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography className="recommendations_customization_title">
              Medium Risk Recommendations:
            </Typography>
            <Controller
              name={`${recommendationSetting}.medium_risk_recommendation`}
              control={control}
              render={({ field, fieldState, formState }) => {
                return (
                  <>
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      name={field.name}
                      id={field.name}
                      className={classNames('', {
                        field_error: fieldState.invalid,
                      })}
                    />
                    <Typography className="text_error">
                      {
                        formState.errors?.recommendationSetting
                          ?.medium_risk_recommendation?.message
                      }
                    </Typography>
                  </>
                );
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography className="recommendations_customization_title">
              Low Risk Recommendations:
            </Typography>
            <Controller
              name={`${recommendationSetting}.low_risk_recommendation`}
              control={control}
              render={({ field, fieldState, formState }) => {
                return (
                  <>
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      name={field.name}
                      id={field.name}
                      className={classNames('', {
                        field_error: fieldState.invalid,
                      })}
                    />
                    <Typography className="text_error">
                      {
                        formState.errors?.recommendationSetting
                          ?.low_risk_recommendation?.message
                      }
                    </Typography>
                  </>
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </RecommendationsCustomizationContainer>
  );
}

export default RecommendationsCustomization;
