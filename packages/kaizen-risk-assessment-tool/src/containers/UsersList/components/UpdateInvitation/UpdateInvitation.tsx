import React, { useEffect } from 'react';
import { Dialog, TextField, Button, Typography, FormLabel, Box } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Container } from './styles';
import { updateInvitationRequested } from '../../reducer' ;

export interface IUpdate {
  isOpenEdit: boolean;
  handleClose: (boolean) => void;
  email: string;
  organization: {
    id: number;
    industry: string;
    name: string;
  };
  rolesList: string[];
}

const UpdateInvitation = (props: IUpdate) => {
  const dispatch = useDispatch();
  const { isOpenEdit, handleClose, email, organization, rolesList } = props;
  const defaultValuesObject = {
    role: '',
    organizationId: organization.id
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValuesObject,
    mode: 'onChange',
  });

  const send = ({role, organizationId},event) => {
    event.preventDefault();
    dispatch(updateInvitationRequested({
      'role': role,
      'organization_id': organizationId.id
    }));
    handleClose(false);
  };

  useEffect(() => {
    return () => {
      reset();
    }
  },[isOpenEdit])


  return (
    <Dialog open={isOpenEdit} onClose={handleClose} fullWidth maxWidth="md">
      <Container>
        <Typography className="title">UPDATE INVITATION</Typography>
        <Box className="fields-wrapper">
        <Box className="field-container-outside">
          <FormLabel className="form-label">Email Address:</FormLabel>
          <TextField
            disabled
            type="email"
            variant="outlined"
            value={email}
            name="email"
            id="email"
          />
        </Box>
        <Box className='form-container'>
        <form onSubmit={handleSubmit(send)}>
          <Box className="fields-wrapper-internal">
            <Controller
              control={control}
              name="role"
              rules={{ required: true }}
              render={({ field }) => (
                <Box className="field-container">
                  <FormLabel className="form-label">Role:</FormLabel>
                  <Autocomplete
                    onChange={(event, item) => {
                      field.onChange(item);
                    }}
                    value={field.value}
                    options={rolesList}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option) => option.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select Role"
                        error={!!errors.role}
                        helperText={errors.role && 'This field is required, please fill in'}
                      />
                    )}
                  />
                </Box>
              )}
            />
            <Controller
              name="organizationId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Box className="field-container">
                    <FormLabel className="form-label">Organisation:</FormLabel>
                    <TextField
                      variant="outlined"
                      value={organization.name}
                      onChange={(e) => field.onChange(e.target.value)}
                      name="organization"
                      id="organization"
                      disabled
                    />
                  </Box>
                );
              }}
            />
          </Box>
          <Box className="action">
            <Button color='primary' variant='outlined' onClick={handleClose}>CANCEL</Button>
            <Button color='primary' variant='contained' className="save-button" type="submit">DONE</Button>
          </Box>
        </form>
        </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default UpdateInvitation;