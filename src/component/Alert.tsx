import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '@/component/Button';
import { ReactComponent as CloseIcon } from '@/asset/image/icon-close.svg';
import IconButton from '@/component/IconButton';

export interface AlertProps {
  content: string;
  title?: string;
  closeCopy?: string;
  onClose?: () => void;
  onClick?: () => void;
}

const AlertWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  min-width: 360px;
`;

const AlertBox = styled.div`
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

  @media all and (max-width: 450px) {
    width: calc(100% - 40px);
  }
`;

const BackDrop = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  max-height: 40px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p {
      display: block;
      padding: 16px 6px;
      font-weight: 600;
    }
  }
  & hr {
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
  & p {
    flex: 1;
    margin: auto;
    line-height: 1.3;
  }
  & button {
    margin: auto;
    min-width: 100px;
  }
`;

const Alert = (props: AlertProps) => {
  const { content, title = 'Error', closeCopy = '확인', onClose, onClick } = props;
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <AlertWrapper>
      <AlertBox>
        <TitleBox>
          <div>
            <p>{title}</p>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
        </TitleBox>
        <ContentBox>
          <p>{content}</p>
          <Button type="button" onClick={onClick ?? onClose} ref={ref} $height="36px">
            {closeCopy}
          </Button>
        </ContentBox>
      </AlertBox>
      <BackDrop onClick={onClose} />
    </AlertWrapper>
  );
};

export default Alert;
