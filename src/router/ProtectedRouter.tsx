import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';
import { URL } from '@/constant';

interface ProtectedRouterProps {
  children: React.ReactNode;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
  const { isSignIn, getToken } = useContext(AuthContext);

  useEffect(() => {
    getToken?.();
  }, []);

  if (!isSignIn) {
    return <Navigate to={URL.SIGNIN} />;
  }
  return children;
};

export default ProtectedRouter;
