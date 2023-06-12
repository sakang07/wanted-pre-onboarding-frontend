import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  height?: string;
  bgImg?: string | undefined;
  [rest: string]: unknown;
}

const ContainedButton = styled.button<{ $height: string; $bgImg: string }>`
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
  background-image: ${props => props.$bgImg};
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 20px;
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
  const {
    children,
    height = 'auto',
    bgImg = 'linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%)',
    ...rest
  } = props;

  return (
    <ContainedButton $height={height} $bgImg={bgImg} {...rest}>
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
