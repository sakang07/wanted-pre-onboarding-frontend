import React from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  id: string;
  label: string;
  [rest: string]: unknown;
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled.label`
  min-width: 80px;
  padding: 8px 0;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
`;

const TextField: React.FC<TextFieldProps> = props => {
  const { id, label, ...rest } = props;

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
    </Wrapper>
  );
};
export default TextField;
