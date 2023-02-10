import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Controller } from 'react-hook-form';

export interface IFormInputs {
  form: any;
  options;
  name;
}

const RadioButtonGroup = (props: IFormInputs) => {
  const { form, name, options } = props;
  const { formState } = form;
  const [radioState, setRadioState] = useState();
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange } }) => (
        <FormControl>
          <RadioGroup
            onChange={(e) => {
              setRadioState(e.target.value);
              onChange(e.target.value === 'yes');
            }}
          >
            {options.map((item, index) => {
              return (
                <FormControlLabel
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  control={<Radio />}
                  label={item.option}
                  value={item.value}
                  checked={item.value === radioState}
                />
              );
            })}
          </RadioGroup>
          <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RadioButtonGroup;
