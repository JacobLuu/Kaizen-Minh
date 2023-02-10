/* eslint-disable react/prop-types */
import React from 'react';
import ErrorMessage from './styles';

const renderErrorMessage = (message) => {
  if (message === null) return null;
  return (
      <ErrorMessage>
        { message }
      </ErrorMessage>
  );
};

const getErrorMessage = (type, maxLength, name) => {
  switch (type) {
    case 'required':
      return 'This field is required. Please fill in';
    case 'validate':
      return 'This field is required. Please fill in';
    case 'maxLength':
      return  `${name} must not exceed  ${maxLength} characters`;
    case 'pattern':
      return  'Invalid email address';
    default:
      return null;
  }
};

 const ShowErrorMessage = React.memo(({typeValidate, maxLength, name}:any) => {
    return renderErrorMessage(getErrorMessage(typeValidate, maxLength, name));
});

export default ShowErrorMessage;