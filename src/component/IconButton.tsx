import styled from 'styled-components';

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 8px;
  background-color: transparent;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

export default IconButton;
