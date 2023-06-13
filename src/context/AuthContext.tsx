import React, { createContext, useMemo, useState } from 'react';
import { SIGNIN_TOKEN } from '@/constant';

interface AuthContextProps {
  isSignIn: boolean;
  getToken?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({ isSignIn: false });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const getToken = () => {
    const token = window.localStorage.getItem(SIGNIN_TOKEN);
    if (token) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  };

  const value: AuthContextProps = useMemo(
    () => ({
      isSignIn: isSignIn,
      getToken: getToken,
    }),
    [isSignIn, getToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
