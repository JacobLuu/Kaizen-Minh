import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { isAccountingOrganization } from '../../../utils/roles';
import {
  saveRiskAssessmentSetupRequest,
  selectRiskSetupSlice,
} from '../reducer';
import InputField from '../../../components/InputField';
import { LabelCustomizationContainer } from './styles';
import { getTrimmedObject } from '../../../utils';

function LabelCustomization({
  form,
  isCorporate,
  restoreCorporateFormDefault,
  restoreIndividualFormDefault,
}: any) {
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

  const handleSubmitLabelCustomizationForm = (data) => {
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
      corporate_label_setting: data.corporate_label_setting
        ? getTrimmedObject(data.corporate_label_setting)
        : corporateLabelSetting,
      individual_label_setting: data.individual_label_setting
        ? getTrimmedObject(data.individual_label_setting)
        : individualLabelSetting,
      corporate_recommendation_setting: corporateRecommendationSetting,
      individual_recommendation_setting: individualRecommendationSetting,
    };

    dispatch(saveRiskAssessmentSetupRequest(mapData));
  };

  return (
    <LabelCustomizationContainer>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmitLabelCustomizationForm)}
      >
        <Grid container spacing={2} alignItems="center">
          {isCorporate ? (
            <>
              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_title">
                  Default Label Names
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <Typography className="label_customization_title">
                    New Label Names
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Is this company incorporated?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.is_company_incorporated"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Corporation Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.corporate_name"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Corporation Number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.corporate_number"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Date of Incorporation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.date_of_incorporation"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Company Age
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.company_age"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Client Type
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.client_type"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Corporate Status
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.corporate_status"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Country of Incorporation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.country_of_incorporation"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Country of Operation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.country_of_operation"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  BvD Number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.bvd_number"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Internal ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.internal_id"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Regulatory ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.regulatory_id"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Listed
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="corporate_label_setting.listed"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              {!isAccountingOrganization() && (
                <>
                  <Grid item xs={12} sm={12} md={3}>
                    <Typography className="label_customization_text">
                      Type of Legal Advice or Service
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
                    <Box className="Input_field">
                      <InputField
                        name="corporate_label_setting.legal_type"
                        form={form}
                        paddingcustom="14px"
                        margincustom="0px"
                      />
                    </Box>
                  </Grid>
                </>
              )}
              <Grid item xs={6} sm={6} md={6} style={{ marginTop: '60px' }}>
                <Typography
                  className="link"
                  onClick={restoreCorporateFormDefault}
                >
                  Restore to Default Label Names
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '60px',
                  }}
                >
                  <Button color="primary" variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_title">
                  Default Label Names
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="input_field">
                  <Typography className="label_customization_title">
                    New Label Names
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Full Legal Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.full_legal_name"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Country of Birth
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.country_of_birth"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Date of Birth
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.date_of_birth"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Known as Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.known_as_name"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Country of Residence
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.country_of_residence"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Title/Role
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.tile_role"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Individuals Profession / Sector
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.individual_sector"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Nationality
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.nationality"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>

              {!isAccountingOrganization() && (
                <>
              <Grid item xs={12} sm={12} md={3}>
                <Typography className="label_customization_text">
                  Type of Legal Advice or Service
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box className="Input_field">
                  <InputField
                    name="individual_label_setting.legal_type"
                    form={form}
                    paddingcustom="14px"
                    margincustom="0px"
                  />
                </Box>
              </Grid>
              </>)}

              <Grid item xs={6} sm={6} md={6} style={{ marginTop: '60px' }}>
                <Typography
                  className="link"
                  onClick={restoreIndividualFormDefault}
                >
                  Restore to Default Label Names
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '60px',
                  }}
                >
                  <Button color="primary" variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </LabelCustomizationContainer>
  );
}

export default LabelCustomization;
