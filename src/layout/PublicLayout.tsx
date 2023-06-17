import React from 'react';
import Footer from '@/layout/Footer';
import styled from 'styled-components';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const MainWrapper = styled.main`
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 30px;
`;

const Layout = (props: PublicLayoutProps) => {
  const { children } = props;

  return (
    <LayoutWrapper>
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </LayoutWrapper>
  );
};
export default Layout;
