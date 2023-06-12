import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  height?: string;
  [rest: string]: unknown;
}

const ContainedButton = styled.button<{ $height: string }>`
  height: ${props => props.$height};
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

  &:disabled {
    box-shadow: none;
    background-image: none;
    text-shadow: none;
    background-color: #cfcfcf;
  }
`;

const Button: React.FC<ButtonProps> = props => {
  const { children, height = 'auto', ...rest } = props;

  return (
    <ContainedButton $height={height} {...rest}>
      {children}
    </ContainedButton>
  );
};
export default Button;

export const TextButton = styled.button`
  display: inline-block;
  border: 0;
  font-size: 14px;
  color: #555;
  text-decoration: underline;
  background-color: transparent;
`;

const LabelButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LabelButtonProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const LabelButton = (props: LabelButtonProps) => {
  const { children, label, onClick } = props;
  return (
    <LabelButtonWrapper>
      <p>{label}</p>
      <TextButton onClick={onClick}>{children}</TextButton>
    </LabelButtonWrapper>
  );
};
