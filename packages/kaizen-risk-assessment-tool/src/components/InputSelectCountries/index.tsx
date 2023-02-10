import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { defaultFunction } from '../../utils';

interface IInputSelect {
  form: any;
  label: string;
  name: string;
  disabled: boolean;
  data: any;
  selectedIndicator?: (data: any) => void;
}

const InputSelectCountries = (props: IInputSelect) => {
  const { form, name, label, disabled, data, selectedIndicator } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  const inputRef = React.useRef();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FormControl fullWidth variant="outlined">
          <InputLabel>{label}</InputLabel>
          <Select
            disabled={disabled}
            label={label}
            value={value}
            onBlur={onBlur}
            autoComplete="off"
            onChange={(e) => {
              const { selectedValue } = e.currentTarget.dataset;
              onChange(e);
              selectedIndicator(selectedValue);
            }}
            inputProps={{
              ref: (e) => {
                ref(e);
                inputRef.current = e;
              },
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            error={Boolean(hasError)}
          >
            {data?.map((item) => (
              <MenuItem
                key={item.id + name}
                value={item.id}
                disabled={item.disabled}
                data-selected-value={JSON.stringify(item)}
                style={{ display: !item?.id && 'none' }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {formState.errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

InputSelectCountries.defaultProps = {
  selectedIndicator: defaultFunction,
};

export default InputSelectCountries;
