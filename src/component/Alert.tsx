import React from 'react';
import styled from 'styled-components';
import Button from '@/component/Button';

export interface AlertProps {
  children: React.ReactNode;
  title?: string | undefined;
  closeCopy?: string | undefined;
  onClose?: () => void | undefined;
}

const AlertWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 300px;
  min-height: 180px;
  height: fit-content;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 20px;
  background-color: #fff;
`;

const TitleBox = styled.div`
  width: 100%;
  max-height: 40px;
  p {
    display: block;
    padding: 16px 6px;
    font-weight: 600;
  }
  hr {
    width: 100%;
    height: 1px;
    border: none;
    margin: 0 auto;
    background-color: #ddd;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  width: 100%;
  padding: 30px 10px 20px;
  text-align: center;
  p {
    flex: 1;
    margin: auto;
    line-height: 1.3;
  }
  button {
    margin: auto;
    min-width: 100px;
  }
`;

const Alert = (props: AlertProps) => {
  const { children, title = 'Error', closeCopy = '확인', onClose } = props;

  return (
    <AlertWrapper>
      <TitleBox>
        <p>{title}</p>
        <hr />
      </TitleBox>
      <ContentBox>
        <p>{children}</p>
        <Button onClick={onClose}>{closeCopy}</Button>
      </ContentBox>
    </AlertWrapper>
  );
};

export default Alert;
