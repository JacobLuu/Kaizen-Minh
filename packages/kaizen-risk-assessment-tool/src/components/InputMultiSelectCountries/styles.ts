import styled from 'styled-components';
import { KAIZEN_LIGHT_GRAY, KAIZEN_BACKGROUND_COLOR, KAIZEN_BLUE, KAIZEN_PRIMARY_COLOR } from '../../themes/colors';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  .MuiAutocomplete-tag {
    margin: 3px;
  }


  .MuiOutlinedInput-root {
    height: auto;
    min-height: 48px;
  }

  .MuiAutocomplete-inputRoot .MuiAutocomplete-input {
    width: 0px;
    min-width: 0px;
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0px 9px;
  }

  .MuiChip-root {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    height: 27px;
    border-radius: 4px;
    color: ${KAIZEN_BLUE};
    background-color: ${KAIZEN_BACKGROUND_COLOR};
  }

  .MuiChip-deleteIcon{
    color: ${KAIZEN_PRIMARY_COLOR};
  }

  .description {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${KAIZEN_LIGHT_GRAY};
  }

  .MuiAutocomplete-input::placeholder {
    color: ${KAIZEN_BLUE};
    opacity: 1;
  }

`;
