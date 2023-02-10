import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { KAIZEN_GREY, KAIZEN_BLACK } from '../../themes/colors';

export const FormCheckBox = styled(FormControlLabel)`
  && {
    display: flex;
    align-items: center;
    width: fit-content;
    min-height: ${(props) => props.minHeight || ''};
    margin: ${(props) => props.m || '0 0 20px 0'};
    padding: ${(props) => props.p};
  }

  .MuiFormControlLabel-label {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${KAIZEN_BLACK};
  }

  .MuiButtonBase-root {
    padding: 0 5px 0 0;
  }

  .MuiFormControlLabel-label.Mui-disabled {
    color: ${KAIZEN_GREY};
  }
`;

export const Error = styled(FormHelperText)`
  padding-left: 30px;
`;

export const Checked = styled(Checkbox)``;

export const Wrapper = styled.div`
  /* margin-bottom: 15px; */
`;
