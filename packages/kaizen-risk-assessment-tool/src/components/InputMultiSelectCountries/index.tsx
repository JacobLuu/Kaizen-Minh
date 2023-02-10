import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';
import { defaultFunction } from '../../utils';
import { Container } from './styles';

interface IInputMultiSelectCountries {
  form: any;
  label?: string;
  name: string;
  description?: string;
  disabled?: boolean;
  hasMultiple: boolean;
  data: any;
  selectedOption?: any;
  optionName: string;
  placeholder?: string;
  numberSelectedOptionLimit?: number;
  selectedIndicator?: (data: any) => void;
}

const InputMultiSelectCountries = (props: IInputMultiSelectCountries) => {
  const {
    form,
    name,
    disabled,
    hasMultiple,
    selectedOption,
    data,
    description,
    optionName,
    placeholder,
    numberSelectedOptionLimit,
    selectedIndicator,
  } = props;

  const { formState } = form;
  const hasError = formState.errors[name];

  React.useEffect(() => {
    if (selectedOption) {
      form.setValue(name, selectedOption);
    }
  }, [selectedOption]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <Autocomplete
            multiple={hasMultiple}
            fullWidth
            limitTags={2}
            disableCloseOnSelect={hasMultiple}
            value={value}
            openOnFocus
            className="option"
            getOptionLabel={(option) =>
              option[optionName] ? option[optionName] : ''
            }
            getOptionDisabled={(option) =>
              option.disabled ||
              (numberSelectedOptionLimit &&
                value?.length >= numberSelectedOptionLimit)
            }
            getOptionSelected={(option, value) =>
              value === undefined || value === '' || option.id === value.id
            }
            options={data}
            disabled={disabled}
            disablePortal
            defaultValue={selectedOption}
            onChange={(_event, option) => {
              onChange(option);
              selectedIndicator(option);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option.id}
                  label={option[optionName]}
                  size="small"
                  deleteIcon={<CloseIcon />}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <Container>
                <TextField
                  {...params}
                  inputRef={ref}
                  variant="outlined"
                  error={Boolean(hasError)}
                  helperText={hasError?.message}
                  placeholder={placeholder}
                />
                <FormHelperText className="description">
                  {description}
                </FormHelperText>
              </Container>
            )}
          />
        );
      }}
    />
  );
};

InputMultiSelectCountries.defaultProps = {
  selectedIndicator: defaultFunction,
};

export default InputMultiSelectCountries;
