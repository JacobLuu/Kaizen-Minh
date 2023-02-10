import React from 'react';
import { StyledButton } from './styles';
import { defaultFunction } from '../../utils';

interface IButton {
  text: string;
  padding: string;
  margin: string;
  color: string;
  type: string;
  link:string;
  disabled:boolean;
  right: string;
  onClick?: any;
}

function Button({
  padding,
  margin,
  color,
  text,
  type,
  link,
  disabled,
  right,
  onClick,
}: IButton) {
  return (
    <StyledButton
      disableRipple={Boolean(link)}
      right={right}
      type={type}
      disabled={disabled}
      padding={padding}
      margin={margin}
      color={color}
      link={link}
      onClick={() => { onClick(); }}
    >
      {text}
    </StyledButton>
  );
}

Button.defaultProps = {
  onClick: defaultFunction,
};

export default Button;
