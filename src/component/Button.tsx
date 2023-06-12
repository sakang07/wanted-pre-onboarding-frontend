import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  height?: string;
  [rest: string]: unknown;
}

const StyledButton = styled.button<{ height: string }>`
  height: ${props => props.height};
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 4px;
  border-style: none;
  font-weight: bold;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  text-transform: uppercase;
  color: #ffffff;
  background-image: linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%);
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
    transition-duration: 0.1s;
  }
`;

const Button: React.FC<ButtonProps> = props => {
  const { children, height = 'auto', ...rest } = props;

  return (
    <StyledButton type="button" height={height} {...rest}>
      {children}
    </StyledButton>
  );
};
export default Button;
