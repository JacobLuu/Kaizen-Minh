import { createTheme } from '@material-ui/core/styles';
import {
  KAIZEN_BLUE_LINK,
  KAIZEN_GREY,
  KAIZEN_BLACK,
  KAIZEN_WHITE,
  KAIZEN_BACKGROUND_COLOR,
  KAIZEN_RED,
  KAIZEN_GRAY
} from './colors';

export const defaultFontFamily = 'Poppins';

const MuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [defaultFontFamily, 'sans-serif'].join(','),
    allVariants: {
      color: KAIZEN_BLACK,
    },
  },
  palette: {
    primary: {
      main: KAIZEN_BLUE_LINK,
    },
    secondary: {
      main: KAIZEN_RED,
      light: KAIZEN_WHITE,
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        height: '48px',
      },
    },

    MuiInputLabel: {
      root: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
      },
      shrink: {
        transform: 'translate(14px, -9px) scale(0.75) !important',
      },
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
      },
    },

    MuiAutocomplete: {
      option: {
        paddingTop: '5px',
        paddingBottom: '5px',
        fontSize: 14,
        wordBreak: 'break-word',
        minHeight: '50px',
        '&[aria-selected="true"]': {
          backgroundColor: KAIZEN_BACKGROUND_COLOR,
        },
        '&:hover': {
          backgroundColor: KAIZEN_BACKGROUND_COLOR,
        },
        '@media (min-width:600px)': {
          minHeight: '50px',
        },
      },
      inputRoot: {
        '&&[class*="MuiOutlinedInput-root"] $input': {
          padding: '0px',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        height: '48px',
        '& $input': {
          padding: '14px',
        },
        '& $notchedOutline': {
          borderColor: KAIZEN_GREY,
        },
        '&:hover $notchedOutline': {
          borderColor: KAIZEN_BLUE_LINK,
        },
        '&$focused $notchedOutline': {
          borderColor: KAIZEN_BLUE_LINK,
        },
      },
    },
    MuiButton: {
      root: {
        minWidth: 'none',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        borderRadius: 8,
        height: 45,
        textTransform: 'capitalize',
      },
      contained: {
        padding: '0 50px',
        color: KAIZEN_WHITE,
      },
      outlined: {
        padding: '0 50px',
      },
      outlinedPrimary: {
        border: `2px solid ${KAIZEN_BLUE_LINK}`,
        '&:hover': {
          border: `2px solid ${KAIZEN_BLUE_LINK}`,
        },
      },
      text: {
        padding: '0px',
      },
      textPrimary: {
        '&:hover': {
          'background-color': 'inherit',
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          'background-color': 'inherit',
        },
      },
      colorPrimary: {
        '&:hover': {
          'background-color': 'inherit',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: KAIZEN_BACKGROUND_COLOR,
        color: KAIZEN_BLACK,
        maxWidth: 220,
        fontSize: 12,
        padding: 15,
        fontWeight: 'normal',
        border: `1px solid ${KAIZEN_GRAY}`,
      },
    },
    MuiRadio: {
      root: {
        color: KAIZEN_GREY,
      },
      colorSecondary: {
        '&$checked': {
          color: KAIZEN_BLUE_LINK,
        },
      },
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          marginLeft: '0px',
        },
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        color: KAIZEN_GREY,
        '&$checked': {
          color: KAIZEN_BLUE_LINK,
        },
        '&$disabled': {
          color: KAIZEN_GREY,
        },
      },
    },
  },
});

export default MuiTheme;
