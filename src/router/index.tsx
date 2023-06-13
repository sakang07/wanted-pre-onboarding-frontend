import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '@/page/SignUp';
import SignIn from '@/page/SignIn';
import NotFound from '@/page/NotFound';
import ProtectedRouter from '@/router/ProtectedRouter';
import Layout from '@/layout/Layout';
import Todo from '@/page/Todo';
import { URL } from '@/constant';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Layout />
            </ProtectedRouter>
          }
        >
          <Route index element={<Navigate to={URL.TODO} replace={true} />} />
          <Route path={URL.TODO} element={<Todo />} />
        </Route>

        <Route path={URL.SIGNUP} element={<SignUp />} />
        <Route path={URL.SIGNIN} element={<SignIn />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
