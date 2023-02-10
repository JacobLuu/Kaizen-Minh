import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputCheckbox from '../../components/InputCheckbox';
import { ASSESSMENT_CATEGORY } from '../../constants/common';

const GeneralSettings = ({ form, client }: any) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Typography className="wrapper_option_title">Include:</Typography>
      </Grid>

      {client === ASSESSMENT_CATEGORY.CORPORATE && (
        <Grid item xs={12} sm={12} md={6}>
          <InputCheckbox
            form={form}
            name={`${client}_general_setting.is_include_bvd_number`}
            label="BvD Number"
            minHeight="55px"
          />
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={6}>
        <InputCheckbox
          form={form}
          name={`${client}_general_setting.is_require_manager_review`}
          label="Manager Review"
          minHeight="55px"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Typography className="wrapper_option_title">
          Allow Everyone to View:
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <InputCheckbox
          form={form}
          name={`${client}_general_setting.is_show_risk_ratings`}
          label="Risk Ratings"
          minHeight="55px"
          margin="0"
        />
      </Grid>
    </Grid>
  );
};

export default GeneralSettings;
