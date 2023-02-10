import React from 'react';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import InputField from '../../../components/InputField';
import TimePicker from '../../../components/TimePicker';
import InputSelectCountries from '../../../components/InputSelectCountries';
import { DialogCompanySpecial } from '../styles';

function DialogProhibitedClientList({
  title,
  description,
  isOpenDialog,
  handleCloseDialog,
  ifFormDirty,
  form,
  handleSubmit,
  isDialogDelete,
  countriesOfBirth,
  setDefaultValueSelectCountriesOfBirthDisable,
}: any) {
  const dispatch = useDispatch();
  return (
    <DialogCompanySpecial
      maxWidth={false}
      open={isOpenDialog}
      onClose={handleCloseDialog}
    >
      <Box className="content">
        <Typography className="title">{title}</Typography>
        <Typography className="description">{description}</Typography>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography className="labelField">Full Name*</Typography>
              <InputField
                InputProps={{
                  readOnly: isDialogDelete,
                }}
                name="full_name"
                form={form}
                margincustom="0px"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography className="labelField">Country of Birth*</Typography>
              <InputSelectCountries
                name="country_id"
                data={countriesOfBirth}
                form={form}
                disabled={isDialogDelete}
                selectedIndicator={() => {
                  dispatch(setDefaultValueSelectCountriesOfBirthDisable());
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography className="labelField">Date of Birth*</Typography>
              <TimePicker
                readOnly={isDialogDelete}
                placeholder="DD/MM/YYYY"
                name="date_of_birth"
                form={form}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => handleCloseDialog()}
                  style={{ marginRight: '50px' }}
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  disabled={!ifFormDirty}
                  type="submit"
                >
                  {isDialogDelete ? 'Delete' : 'Done'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </DialogCompanySpecial>
  );
}

export default DialogProhibitedClientList;
