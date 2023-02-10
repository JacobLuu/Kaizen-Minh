import React from 'react';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import InputField from '../../../components/InputField';
import TimePicker from '../../../components/TimePicker';
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
}: any) {
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
              <Typography className="labelField">Company Name:</Typography>
              <InputField
                InputProps={{
                  readOnly: isDialogDelete,
                }}
                name="company_name"
                form={form}
                margincustom="0px"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography className="labelField">Company Number:</Typography>
              <InputField
                InputProps={{
                  readOnly: isDialogDelete,
                }}
                name="company_number"
                form={form}
                margincustom="0px"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography className="labelField">
                Date of Incorporation:
              </Typography>
              <TimePicker
                readOnly={isDialogDelete}
                placeholder="DD/MM/YYYY"
                name="date_of_incorporation"
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
