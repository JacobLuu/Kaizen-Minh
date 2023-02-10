import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { defaultFunction } from '../../utils';
import { Form } from './styles';

interface IInputSelect {
  form: any;
  label: string;
  name: string;
  disabled: boolean;
  data: object;
  onChange?: Function;
}

const InputSelect = (props: IInputSelect) => {
  const {
    form,
    name,
    label,
    disabled,
    data,
    onChange: handleChange,
  } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  const inputRef = React.useRef();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Form>
          <Select
            inputProps={{
              ref: (e) => {
                ref(e);
                inputRef.current = e;
              },
            }}
            fullWidth
            variant="outlined"
            disabled={disabled}
            label={label}
            value={value}
            onBlur={onBlur}
            autoComplete="off"
            onChange={(e) => {
              onChange(e);
              handleChange(e);
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
            {data.map((item) => (
              <MenuItem
                key={item.label + name}
                value={item.value}
                disabled={item?.disabled}
                style={{ display: !item.value && 'none' }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {formState.errors[name]?.message}
          </FormHelperText>
        </Form>
      )}
    />
  );
};

InputSelect.defaultProps = {
  onChange: defaultFunction,
};

export default InputSelect;
