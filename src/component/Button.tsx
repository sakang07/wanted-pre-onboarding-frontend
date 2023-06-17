import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  $height?: string;
  $color?: string;
}

const Button = styled.button<ButtonProps>`
  height: ${props => props.$height ?? 'auto'};
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 4px;
  border-style: none;
  font-weight: bold;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  text-transform: uppercase;
  color: #ffffff;
  background-color: ${props => props.$color ?? '#4682b4'};
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
      <TextButton type="button" onClick={onClick}>
        {children}
      </TextButton>
    </LabelButtonWrapper>
  );
};

interface RoundButtonProps {
  $primary?: boolean;
  $color?: string;
}

export const RoundButton = styled.button<RoundButtonProps>`
  flex-shrink: 0;
  height: 34px;
  padding: 8px 16px;
  border-radius: 100px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.$color ?? '#4682b4'};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background-color: #fff;
  color: ${props => props.$color ?? '#4682b4'};
  cursor: pointer;
  ${props =>
    props.$primary && {
      borderStyle: 'none',
      color: '#fff',
      backgroundColor: props.$color ?? '#4682b4',
    }}
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
