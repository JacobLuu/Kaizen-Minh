import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as ThemeProviderMui } from '@material-ui/core/styles';
import MuiTheme from './MuiTheme';

const ThemeProvider = ({ children }) => {
  return (
    <ThemeProviderMui theme={MuiTheme}>
      {children}
    </ThemeProviderMui>
  );
};

export default ThemeProvider;

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
