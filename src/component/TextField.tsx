import React from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  id: string;
  label: string;
  error?: string | undefined;
  [rest: string]: unknown;
}

const Wrapper = styled.div<{ $isError: boolean }>`
  display: flex;
  gap: 20px;

  & > label {
    min-width: 80px;
    padding: 8px 0;
    font-size: 14px;
    font-weight: bold;
  }

  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;

    & > input {
      flex: 1;
      padding: 8px 16px;
      border: 1px solid #ccc;
      outline-color: ${props => props.$isError && '#de3163'};
      border-color: ${props => props.$isError && '#de3163'};
      border-radius: 4px;
      font-size: 14px;
      background-color: ${props => props.$isError && '#fff5ee'};

      &::placeholder {
        font-size: 13px;
        color: #bbb;
      }
    }

    & > p {
      font-size: 12px;
      color: #de3163;
    }
  }
`;

const TextField: React.FC<TextFieldProps> = props => {
  const { id, label, error, ...rest } = props;

  return (
    <Wrapper $isError={Boolean(error)}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input id={id} {...rest} />
        {error && <p>{error}</p>}
      </div>
    </Wrapper>
  );
};
export default TextField;
