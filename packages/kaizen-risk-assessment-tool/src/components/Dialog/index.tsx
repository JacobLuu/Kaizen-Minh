import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Container } from './styles';

interface IDialog {
  title?: string;
  description?: string;
  maxWidth?: any;
  handleCloseDialog?: (data: any) => void;
  isOpenDialog?: boolean;
  children?: React.ReactNode;
}

const Dialog = ({
  title,
  description,
  isOpenDialog,
  maxWidth,
  handleCloseDialog,
  children,
}: IDialog) => {
  return (
    <Container fullWidth maxWidth={maxWidth} open={isOpenDialog} onClose={handleCloseDialog}>
      <Box className="content">
        {title && <Typography className="title">{title}</Typography>}
        {description && (
          <div className="description">{description}</div>
        )}
        {children}
      </Box>
    </Container>
  );
};

export default Dialog;
