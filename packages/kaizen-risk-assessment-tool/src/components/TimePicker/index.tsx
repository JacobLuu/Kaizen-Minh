import React from 'react';
import { Controller } from 'react-hook-form';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Wrapper } from './styles';

interface ITimePicker {
  form: any;
  name?: string;
  disabled: boolean;
  readOnly?: boolean;
  placeholder: any;
}

const TimePicker = (props: ITimePicker) => {
  const { form, name, disabled, readOnly, placeholder } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  const today = moment().endOf('day');
  const inputRef = React.useRef();

  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={null}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <Wrapper>
            <KeyboardDatePicker
              autoOk
              fullWidth
              disabled={disabled}
              variant="inline"
              inputVariant="outlined"
              placeholder={placeholder}
              format="DD/MM/YYYY"
              maxDate={today}
              onBlur={onBlur}
              onChange={onChange}
              readOnly={readOnly}
              value={value}
              InputAdornmentProps={{ position: 'end' }}
              error={Boolean(hasError)}
              inputProps={{
                readOnly,
                ref: (e) => {
                  ref(e);
                  inputRef.current = e;
                },
              }}
              helperText={formState.errors[name]?.message}
            />
          </Wrapper>
        </MuiPickersUtilsProvider>
      )}
    />
  );
};

export default TimePicker;
