import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputCheckbox from '../../components/InputCheckbox';

const KeyRiskIndicators = ({
  fields,
  form,
  label,
  typeIndicator,
  typeField,
  disableCheckbox,
}: any) => {

  return (
    <div>
      <Typography className="wrapper_option_title">{label}</Typography>
      <Grid container>
        {fields.map((item, index) => (
          <Grid key={`${item.id}_field`} item xs={12} sm={12} md={6}>
            <InputCheckbox
              isDisabled={disableCheckbox}
              form={form}
              isChecked={item.is_enabled}
              name={`${typeIndicator}.${typeField}.${index}.is_enabled`}
              label={item.name}
              minHeight="55px"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KeyRiskIndicators;
