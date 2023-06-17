import React from 'react';
import PublicLayout from '@/layout/PublicLayout';
import Container from '@/component/Container';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    margin-top: 30px;
  }
`;

const NotFound = () => {
  return (
    <PublicLayout>
      <Container $marginTop={100}>
        <Wrapper>
          <h2>404 ERROR</h2>
          <p>페이지를 찾을 수 없습니다. 😢</p>
        </Wrapper>
      </Container>
    </PublicLayout>
  );
};

export default NotFound;
