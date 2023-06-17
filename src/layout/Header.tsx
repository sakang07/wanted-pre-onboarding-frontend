import React, { useContext } from 'react';
import { SIGNIN_TOKEN, URL } from '@/constant';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '@/context/AuthContext';
import AlertContext from '@/context/AlertContext';

interface HeaderProps {
  height: number;
}

const HeaderWrapper = styled.header<{ $height: number }>`
  position: fixed;
  z-index: 1000;
  width: 100%;
  min-width: 360px;
  height: ${props => props.$height + 'px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 30px;
  border-bottom: 1px solid #cfcfcf;
  background-color: #fff;

  h1 {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: #4682b4;
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  padding: 0;
  border-radius: 4px;
  border-style: none;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #36454f;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: #4682b4;
  }
`;

const Header: React.FC<HeaderProps> = ({ height }) => {
  const { getToken } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.removeItem(SIGNIN_TOKEN);
    getToken?.();
    navigate(URL.SIGNIN);
  };
  const handleLogout = () => {
    showAlert({
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      onClick: () => removeToken(),
    });
  };

  return (
    <HeaderWrapper $height={height}>
      <RouterLink to={URL.TODO}>
        <h1>To do List</h1>
      </RouterLink>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </HeaderWrapper>
  );
};

export default Header;
