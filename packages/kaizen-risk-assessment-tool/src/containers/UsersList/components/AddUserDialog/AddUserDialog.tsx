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
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  EMAIL_VALIDATION_RULES,
  REQUIRED_VALIDATION_RULES,
} from '../../../../utils/formValidator';
import ShowErrorMessage from '../../../../components/ErrorsMessage';
import { addUserRequest } from '../../reducer';
import { Container } from './styles';
import { isSuperAdmin } from '../../../../utils/roles';

const EMAIL_NAME_MAX_LENGTH = 255;
export interface IAddUser {
  isOpen: boolean;
  handleClose: (boolean) => void;
  organizations: [
    {
      id: number;
      orgName: string;
    }
  ];
  roles: any[];
}

const AddUserDialog = (props: IAddUser) => {
  const { isOpen, handleClose, organizations, roles } = props;
  const defaultValuesObject = isSuperAdmin()
    ? {
        email: '',
        role: null,
        organization: '',
      }
    : {
        email: '',
        role: null,
      };
  const dispatch = useDispatch();
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
  }, [isOpen]);

  const send = ({ email, role, organization }, event) => {
    event.preventDefault();
    dispatch(
      addUserRequest(
        isSuperAdmin()
          ? {
              email,
              role,
              organization_id: organization.id,
            }
          : {
              email,
              role,
            }
      )
    );
    handleClose(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={isSuperAdmin() ? 'md' : 'sm'}
    >
      <Container style={{ minWidth: isSuperAdmin() ? '800px' : '100px' }}>
        <Typography className="title">ADD USER</Typography>
        <form onSubmit={handleSubmit(send)}>
          <Box className="fields-wrapper">
            <Controller
              name="email"
              control={control}
              rules={EMAIL_VALIDATION_RULES}
              render={({ field, fieldState }) => {
                return (
                  <Box
                    className="field-container"
                    style={{ width: isSuperAdmin() ? '30%' : '45%' }}
                  >
                    <FormLabel className="form-label">Email Address</FormLabel>
                    <TextField
                      type="email"
                      placeholder="Insert email address"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      name="email"
                      id="email"
                      error={fieldState.invalid}
                    />
                    <ShowErrorMessage
                      typeValidate={fieldState.error?.type}
                      maxLength={EMAIL_NAME_MAX_LENGTH}
                      name="Email"
                    />
                  </Box>
                );
              }}
            />
            <Controller
              control={control}
              name="role"
              rules={REQUIRED_VALIDATION_RULES}
              render={({ field, fieldState }) => (
                <Box
                  className="field-container"
                  style={{ width: isSuperAdmin() ? '30%' : '45%' }}
                >
                  <FormLabel className="form-label">Role</FormLabel>
                  <Autocomplete
                    onChange={(event, item) => {
                      field.onChange(item);
                    }}
                    value={field.value}
                    options={roles}
                    getOptionLabel={(option) =>
                      option.charAt(0).toUpperCase() + option.slice(1)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select Role"
                        error={!!errors.role}
                      />
                    )}
                  />
                  <ShowErrorMessage typeValidate={fieldState.error?.type} />
                </Box>
              )}
            />
            {isSuperAdmin() && (
              <Controller
                control={control}
                name="organization"
                rules={REQUIRED_VALIDATION_RULES}
                render={({ field, fieldState }) => (
                  <Box className="field-container">
                    <FormLabel className="form-label">Organisation</FormLabel>
                    <Autocomplete
                      onChange={(event, item) => {
                        field.onChange(item);
                      }}
                      value={field.value}
                      options={organizations}
                      getOptionLabel={(option) => option?.orgName}
                      getOptionSelected={(option) => option?.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select Organisation"
                          error={!!errors.organization}
                        />
                      )}
                    />
                    <ShowErrorMessage typeValidate={fieldState.error?.type} />
                  </Box>
                )}
              />
            )}
          </Box>
          <Box className="action">
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="save-button"
              type="submit"
            >
              Invite
            </Button>
          </Box>
        </form>
      </Container>
    </Dialog>
  );
};

export default AddUserDialog;
