import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { defaultFunction } from '../../utils';
import { Container } from './styles';

interface IInputSelect {
  form: any;
  name: string;
  disabled: boolean;
  description: string;
  data: any;
  selectedIndicator?: (data: any) => void;
  selectedOption: number;
  optionName: string;
}

const InputSelectKRI = (props: IInputSelect) => {
  const {
    form,
    name,
    disabled,
    description,
    data,
    optionName,
    selectedIndicator,
    selectedOption,
  } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  const inputRef = React.useRef();

  React.useEffect(() => {
    if(selectedOption){
      form.setValue(name, selectedOption);
    }
  }, [selectedOption]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value, ref } }) => (
        <Container fullWidth variant="outlined">
          <Select
            disabled={disabled}
            value={value}
            autoComplete="off"
            error={Boolean(hasError)}
            defaultValue={selectedOption}
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
            onChange={(e) => {
              const { selectedValue } = e.currentTarget.dataset;
              onChange(e);
              selectedIndicator(selectedValue);
            }}
          >
            {data.map((item) => (
              <MenuItem
                key={item?.id + name}
                value={item?.id}
                data-selected-value={JSON.stringify(item)}
                disabled={item?.disabled}
                style={{ display: !item?.id && 'none' }}
              >
                {item?.[optionName]}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText className="description">{description}</FormHelperText>
          <FormHelperText error>
            {formState.errors[name]?.message}
          </FormHelperText>
        </Container>
      )}
    />
  );
};

InputSelectKRI.defaultProps = {
  selectedIndicator: defaultFunction,
};

export default InputSelectKRI;
