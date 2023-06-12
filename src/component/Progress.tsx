import React from 'react';
import styled from 'styled-components';
import loadingIcon from '@/asset/image/loading.gif';

const Spinner = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);

  img {
    width: 50px;
    height: 50px;
  }
`;

const Progress = () => {
  return (
    <Spinner>
      <img src={loadingIcon} alt="loading progress icon" />
    </Spinner>
  );
};

export default Progress;
