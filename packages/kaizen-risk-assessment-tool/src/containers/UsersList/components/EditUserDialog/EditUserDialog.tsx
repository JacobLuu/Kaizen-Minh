import React, { useEffect } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Typography,
  FormLabel,
  Box,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { isSuperAdmin } from '../../../../utils/roles';
import Container from './styles';
import { editUserRequest } from '../../reducer';
import { REQUIRED_VALIDATION_RULES } from '../../../../utils/formValidator';
import ShowErrorMessage from '../../../../components/ErrorsMessage';

export interface IEditUser {
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

const EditUserDialog = (props: IEditUser) => {
  const dispatch = useDispatch();
  const { isOpenEdit, handleClose, email, organization, rolesList } = props;
  const defaultValuesObject = {
    role: '',
    organizationId: organization.id,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValuesObject,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpenEdit]);

  const send = ({ role, organizationId }, event) => {
    event.preventDefault();
    dispatch(
      editUserRequest({
        role,
        organization_id: organizationId.id,
      })
    );
    handleClose(false);
  };

  return (
    <Dialog
      open={isOpenEdit}
      onClose={handleClose}
      fullWidth
      maxWidth={isSuperAdmin() ? 'md' : 'sm'}
    >
      <Container>
        <Typography className="title">EDIT USER</Typography>
        <Box className="fields-wrapper">
          <Box
            className="field-container-outside"
          >
            <FormLabel className="form-label">Email Address</FormLabel>
            <TextField
              disabled
              type="email"
              variant="outlined"
              value={email}
              name="email"
              id="email"
            />
          </Box>
          <Box className="form-container">
            <form onSubmit={handleSubmit(send)}>
              <Box className="fields-wrapper-internal">
                <Controller
                  control={control}
                  name="role"
                  rules={REQUIRED_VALIDATION_RULES}
                  render={({ field, fieldState }) => (
                    <Box
                      className="field-container"
                    >
                      <FormLabel className="form-label">Role</FormLabel>
                      <Autocomplete
                        onChange={(event, item) => {
                          field.onChange(item);
                        }}
                        value={field.value}
                        options={rolesList}
                        getOptionLabel={(option) =>
                          option.charAt(0).toUpperCase() + option.slice(1)
                        }
                        getOptionSelected={(option) => option.id}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            error={!!errors.role}
                            placeholder="Select role"
                          />
                        )}
                      />
                      <ShowErrorMessage typeValidate={fieldState.error?.type} />
                    </Box>
                  )}
                />
                {isSuperAdmin() && (
                  <Controller
                    name="organizationId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <Box className="field-container">
                          <FormLabel className="form-label">
                            Organisation
                          </FormLabel>
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
                )}
              </Box>
              <Box className="action">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className="save-button"
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default EditUserDialog;
