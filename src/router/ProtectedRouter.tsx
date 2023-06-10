import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';
import { URL } from '@/constant';

interface ProtectedRouterProps {
  children: React.ReactNode;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
  const { isLogin, getToken } = useContext(AuthContext);

  useEffect(() => {
    getToken?.();
  }, []);

  if (!isLogin) {
    return <Navigate to={URL.LOGIN} />;
  }
  return children;
};

export default ProtectedRouter;
