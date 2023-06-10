import React from 'react';
import Router from '@/router';
import { AuthProvider } from '@/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
