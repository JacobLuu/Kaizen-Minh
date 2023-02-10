import React from 'react';
import { Controller } from 'react-hook-form';
import { FormCheckBox, Checked, Error, Wrapper } from './styles';
import { defaultFunction } from '../../utils';

export interface IInputCheckbox {
  form?: any;
  label: string;
  name: string;
  isDisabled: boolean;
  margin: string;
  padding: string;
  isChecked: boolean;
  minHeight: string;
  onClick?: Function;
}

const InputCheckbox = (props: IInputCheckbox) => {
  const {
    form,
    name,
    label,
    isDisabled,
    margin,
    padding,
    isChecked,
    minHeight,
    onClick,
  } = props;
  const { formState } = form;
  // const hasError = formState.errors[name];

  return (
    <FormCheckBox
      checked={isChecked}
      minheight={minHeight}
      m={margin}
      p={padding}
      label={label}
      onClick={onClick}
      disabled={isDisabled}
      control={
        <Controller
          name={name}
          control={form.control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Wrapper>
              <Checked
                disabled={isDisabled}
                disableRipple
                color="primary"
                checked={value}
                name={name}
                onChange={onChange}
              />

              <Error className="errorStyle" error>
                {formState?.errors[name]?.message}
              </Error>
            </Wrapper>
          )}
        />
      }
    />
  );
};

InputCheckbox.defaultProps = {
  onClick: defaultFunction,
};

export default InputCheckbox;
