import React, { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN, URL } from '@/constant';
import Button from '@/component/Button';
import styled from 'styled-components';
import TextField from '@/component/TextField';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 500px;
  margin: 100px auto 0;
  padding: 80px 60px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Login = () => {
  const { isLogin, getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      navigate(URL.TODOLIST);
    }
  }, [isLogin]);

  const handleLogin = () => {
    console.log('click login');
    window.localStorage.setItem(LOGIN_TOKEN, LOGIN_TOKEN);
    getToken?.();
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>

      <div>
        <TextField id={'userId'} label={'ID'} />
        <TextField id={'userPw'} label={'Password'} />
      </div>

      <Button height="44px" onClick={handleLogin}>
        login
      </Button>
    </LoginWrapper>
  );
};

export default Login;
