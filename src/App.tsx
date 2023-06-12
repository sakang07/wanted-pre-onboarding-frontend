import React from 'react';
import Router from '@/router';
import { AuthProvider } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { AlertProvider } from '@/context/AlertContext';

const App = () => {
  return (
    <LoadingProvider>
      <AlertProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </AlertProvider>
    </LoadingProvider>
  );
};

export default App;
