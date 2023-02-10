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
import { addOrganizationRequest } from '../Organizations/reducer';
import { Container } from './styles';
import { IAddOrganization } from '../../../types/Organizations';
import {
  MAX_80_CHARACTERS_VALIDATION_RULES,
  REQUIRED_VALIDATION_RULES,
} from '../../../utils/formValidator';
import ShowErrorMessage from '../../../components/ErrorsMessage/ErrorsMessage';

const ORGANIZATION_NAME_MAX_LENGTH = 80;
export interface IAddORG {
  isOpen: boolean;
  getOrganizationsData: () => void;
  handleClose: (boolean) => void;
  org: [];
}

const AddOrganizationDialog = (props: IAddORG) => {
  const { isOpen, handleClose, org } = props;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      industry: '',
    },
    mode: 'onChange',
  });

  const send = (data: IAddOrganization, event) => {
    event.preventDefault();
    dispatch(addOrganizationRequest(data));
    handleClose(false);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Container>
        <Typography className="title">ADD ORGANIZATION</Typography>
        <form onSubmit={handleSubmit(send)}>
          <Controller
            name="name"
            control={control}
            rules={MAX_80_CHARACTERS_VALIDATION_RULES}
            render={({ field, fieldState }) => {
              return (
                <Box className="field-container">
                  <FormLabel className="form-label">
                    Organisation Name
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    name="orgName"
                    id="orgName"
                    error={fieldState.invalid}
                  />
                  <ShowErrorMessage
                    typeValidate={fieldState.error?.type}
                    maxLength={ORGANIZATION_NAME_MAX_LENGTH}
                    name="Organisation"
                  />
                  {!fieldState.error?.type && (
                    <Typography className="warning-text">
                      Maximum 80 characters
                    </Typography>
                  )}
                </Box>
              );
            }}
          />
          <Controller
            control={control}
            name="industry"
            rules={REQUIRED_VALIDATION_RULES}
            render={({ field, fieldState }) => (
              <Box className="field-container">
                <FormLabel className="form-label">Industry</FormLabel>
                <Autocomplete
                  onChange={(event, item) => {
                    field.onChange(item);
                  }}
                  value={field.value}
                  options={org}
                  getOptionLabel={(option) =>
                    option.charAt(0).toUpperCase() + option.slice(1) ||
                    field.value
                  }
                  getOptionSelected={(option) => option === field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      variant="outlined"
                      placeholder="Select Industry"
                      error={!!errors.industry}
                    />
                  )}
                />
                <ShowErrorMessage typeValidate={fieldState.error?.type} />
              </Box>
            )}
          />
          <Box className="action">
            <Button
              color="primary"
              variant="outlined"
              onClick={handleClose}
              style={{ textTransform: 'capitalize' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ textTransform: 'capitalize' }}
            >
              Done
            </Button>
          </Box>
        </form>
      </Container>
    </Dialog>
  );
};

export default AddOrganizationDialog;