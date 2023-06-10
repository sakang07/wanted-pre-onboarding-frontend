import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  [rest: string]: unknown;
}

const StyledButton = styled('button')`
  padding: 8px 16px;
  border: 1px solid #1f2123;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

const Button: React.FC<ButtonProps> = props => {
  const { children, ...rest } = props;

  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  );
};
export default Button;
