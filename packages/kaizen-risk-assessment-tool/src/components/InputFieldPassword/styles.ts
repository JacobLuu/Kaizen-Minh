import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { KAIZEN_RED } from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const InputPass = styled(TextField)`
  && {
    margin: ${({ margincustom }) => margincustom || '0 0 30px 0'};
    padding: ${({ padding }) => padding || 'none'};
  }
  white-space: pre-line;

  .MuiFormLabel-root{
    color: rgba(0, 0, 0, 0.6);
  }

  .MuiFormHelperText-root{
    line-height: 1;
  }

  &&:focus .MuiFormLabel-root.Mui-error{
    color: ${KAIZEN_RED};
  }

  .MuiOutlinedInput-adornedEnd {
    padding-right: 0;
  }

  .MuiInputAdornment-positionEnd {
    position: absolute;
    right: 14px;
  }

  .MuiFormHelperText-root.Mui-error {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
  }
`;
