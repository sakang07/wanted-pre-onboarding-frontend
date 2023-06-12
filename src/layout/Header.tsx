import React, { useContext } from 'react';
import Button from '@/component/Button';
import { LOGIN_TOKEN, URL } from '@/constant';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '@/context/AuthContext';

interface HeaderProps {
  height: number;
}

const HeaderWrapper = styled.header<{ height: number }>`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: ${props => props.height + 'px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  border-bottom: 1px solid #cfcfcf;
  backdrop-filter: blur(5px) saturate(1.8);
  background-color: rgba(255, 255, 255, 0.7);

  h1 {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const Header: React.FC<HeaderProps> = ({ height }) => {
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem(LOGIN_TOKEN);
    getToken?.();
    navigate(URL.LOGIN);
  };

  return (
    <HeaderWrapper height={height}>
      <h1>To do List</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </HeaderWrapper>
  );
};

export default Header;
