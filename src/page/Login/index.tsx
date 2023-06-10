import React, { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN, URL } from '@/constant';

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
      <button onClick={handleLogin}>click</button>
    </div>
  );
};

export default Login;
