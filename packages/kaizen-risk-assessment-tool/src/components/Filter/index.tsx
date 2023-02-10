import React from 'react';
import Images from '../../assets/images';
import { FilterStyles } from './styles';

interface IFormInputs {
  onClick: React.EventHandler<any>,
}


const Filter = ({ onClick }:IFormInputs) => {
  return (
    <FilterStyles onClick={onClick}>
      <img src={Images.svg_filter} alt="logo" width="10" />
    </FilterStyles>
  );
};

export default Filter;
