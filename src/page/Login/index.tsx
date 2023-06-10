import React, { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN, URL } from '@/constant';
import Button from '@/component/Button';

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
    <div>
      <h2>Login</h2>
      <Button onClick={handleLogin}>click</Button>
    </div>
  );
};

export default Login;
