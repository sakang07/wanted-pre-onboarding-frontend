import React, { createContext, useMemo, useState } from 'react';
import { LOGIN_TOKEN } from '@/constant';

interface AuthContextProps {
  isLogin: boolean;
  getToken?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({ isLogin: false });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const getToken = () => {
    console.log('click getToken');
    const token = window.localStorage.getItem(LOGIN_TOKEN);
    if (token) {
      setIsLogin(true);
      console.log('token', token);
    } else {
      setIsLogin(false);
      console.log('no token', token);
    }
  };

  const value: AuthContextProps = useMemo(
    () => ({
      isLogin: isLogin,
      getToken: getToken,
    }),
    [isLogin, getToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
