import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { KAIZEN_RED } from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Input = styled(TextField)`
  && {
    margin: ${(props) => props.margincustom || '0 0 30px 0'};
  }

  .MuiOutlinedInput-input {
    padding:  ${(props) => props.paddingcustom};;
  }

  .MuiFormLabel-root {
    color: rgba(0, 0, 0, 0.6);
  }

  .MuiFormLabel-root.Mui-error {
    color: ${KAIZEN_RED};
  }

  .MuiFormHelperText-root.Mui-error {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
  }
`;
