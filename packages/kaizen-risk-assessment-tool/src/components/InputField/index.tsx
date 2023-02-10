import React from 'react';
import { Controller } from 'react-hook-form';
import { defaultFunction } from '../../utils';
import { Input } from './styles';

export interface IFormInputs {
  form: any;
  label: string;
  name: string;
  type: string;
  disabled: boolean;
  placeholder: string;
  margincustom: string;
  paddingcustom: string;
  onChange: Function;
}

const InputField = (props: IFormInputs) => {
  const {
    form,
    name,
    label,
    type,
    disabled,
    margincustom,
    paddingcustom,
    onChange: handleChange,
    
  } = props;
  const { formState } = form;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
        <Input
          {...props}
          margincustom={margincustom}
          paddingcustom={paddingcustom}
          fullWidth
          inputRef={ref}
          variant="outlined"
          type={type}
          label={label}
          disabled={disabled}
          onBlur={onBlur}
          autoComplete="off"
          onChange={(e) => {
            onChange(e);
            handleChange(e);
          }}
          value={value || ''}
          error={fieldState.invalid}
          helperText={formState.errors[name]?.message}
        />
      )}
    />
  );
};

InputField.defaultProps = {
  onChange: defaultFunction,
  margincustom: '',
  paddingcustom: '',
};

export default InputField;
