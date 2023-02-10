import React from 'react';
import NumberFormat from 'react-number-format';

const CustomFormatNumber = (props: any) => {
  const { onChange, inputRef, ...other } = props;
  const MAX_VAL = 20;
  const withValueLimit = ({ value }) => value.length <= MAX_VAL;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isAllowed={withValueLimit}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.formattedValue,
          },
        });
      }}
      displayType="input"
      prefix="£"
      fixedDecimalScale
      isNumericString
      thousandSeparator
    />
    /*
      @desc This function NumberFormat format number with commas in TextField
      input: 1233456
      output: 1,233,456
    */
  );
};

export default CustomFormatNumber;
