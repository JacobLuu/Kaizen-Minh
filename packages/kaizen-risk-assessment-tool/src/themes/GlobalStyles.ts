import { createGlobalStyle } from 'styled-components';
import 'moment/locale/en-gb';
import {
  KAIZEN_RATING_LOW,
  KAIZEN_RATING_HIGH,
  KAIZEN_WHITE,
  KAIZEN_DARK_BLUE,
  KAIZEN_LOADING_COLOR,
} from './colors';
import { POPPINS } from './fonts';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${POPPINS};
  }

  body {
    font-size: 14px;
    font-weight: 400;
    font-family: ${POPPINS};
    background-color: #e0eaf5;
  }

  #root-admin{
    width: 100%;
    height:100%;
  }

  ._loading_overlay_overlay {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }

  ._loading_overlay_spinner {
    svg circle {
      stroke: ${KAIZEN_LOADING_COLOR};
    }
  }

  .Toastify__toast{
    display: flex;
    align-items: center;
    min-height: 50px
  }

  .Toastify__toast--error {
    color: ${KAIZEN_WHITE};
    border-radius: 4px;
    background-color: ${KAIZEN_RATING_HIGH};
  }

  .Toastify__toast--success {
    color: ${KAIZEN_WHITE};
    border-radius: 4px;
    background: ${KAIZEN_RATING_LOW};
  }

  .Toastify__toast--info {
    color: ${KAIZEN_DARK_BLUE};
    border-radius: 4px;
    background: #C8E7FF;
  }

  .Toastify__toast-body {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
`;

export default GlobalStyles;
