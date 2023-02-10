/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputPass } from './styles';

interface IFormInputs {
  form: any;
  label: string;
  name: string;
  disabled: boolean;
  margin:string;
  padding:string;
  onChange: any;
  autoComplete: string;
}

const InputFieldPassword = (props:IFormInputs) => {
  const {
    form, name, label, disabled, margin, padding, onChange: handleChange, autoComplete,
  } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <InputPass
          padding={padding}
          margincustom={margin}
          fullWidth
          inputRef={ref}
          variant="outlined"
          label={label}
          name={name}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          onBlur={onBlur}
          autoComplete={autoComplete || 'off'}
          onChange={(e) => {
            onChange(e.target.value.replace(/\s+/g, ''));
            handleChange(e);
          }}
          value={value}
          error={Boolean(hasError)}
          helperText={formState.errors[name]?.message}
          InputProps={{ // <-- This is where the toggle button show password is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default InputFieldPassword;
