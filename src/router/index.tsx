import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '@/page/SignUp';
import Login from '@/page/Login';
import NotFound from '@/page/NotFound';
import ProtectedRouter from '@/router/ProtectedRouter';
import Layout from '@/layout/Layout';
import TodoList from '@/page/TodoList';
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
          <Route index element={<Navigate to={URL.TODOLIST} replace={true} />} />
          <Route path={URL.TODOLIST} element={<TodoList />} />
        </Route>

        <Route path={URL.SIGNUP} element={<SignUp />} />
        <Route path={URL.LOGIN} element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
