import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Sort } from './styles';

interface IFormInputs {
  directionDescendent: boolean,
  onClick: React.EventHandler<any>,
}

const InputField = ({ onClick, directionDescendent }:IFormInputs) => {
  return (
    <Sort onClick={onClick}>
      {directionDescendent ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
    </Sort>
  );
};

export default InputField;
