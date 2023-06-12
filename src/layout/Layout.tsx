import React from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const MainWrapper = styled.main<{ headerHeight: number }>`
  width: 100%;
  min-height: 1000px;
  padding-top: ${props => props.headerHeight + 30 + 'px'};
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 50px;
`;

const Layout = () => {
  const HEADER_HEIGHT = 60;

  return (
    <LayoutWrapper>
      <Header height={HEADER_HEIGHT} />
      <MainWrapper headerHeight={HEADER_HEIGHT}>
        <Outlet />
      </MainWrapper>
      <Footer />
    </LayoutWrapper>
  );
};
export default Layout;
