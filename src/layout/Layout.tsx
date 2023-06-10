import React from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
