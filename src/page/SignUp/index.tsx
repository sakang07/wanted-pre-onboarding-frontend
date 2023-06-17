import React, { useContext, useEffect } from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { URL } from '@/constant';
import { useNavigate } from 'react-router-dom';
import authService from '@/api/authService';
import LoadingContext from '@/context/LoadingContext';
import AlertContext from '@/context/AlertContext';
import PublicLayout from '@/layout/PublicLayout';
import AuthContext from '@/context/AuthContext';

const TITLE = '회원가입';

const SignUp = () => {
  const { isSignIn, getToken } = useContext(AuthContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    getToken?.();
    if (isSignIn) {
      navigate(URL.TODO);
    }
  }, []);

  const handleSignUp = (formValues: FormValues) => {
    showLoading();
    authService
      .signUp(formValues)
      .then(() => {
        showAlert({
          title: '회원가입 완료',
          content: `${formValues.email} 님의 회원가입이 완료되었습니다.`,
          onClick: () => navigate(URL.SIGNIN),
        });
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: '회원가입 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  return (
    <PublicLayout>
      <UserForm
        title={TITLE}
        subTitle="간편 회원가입으로 투두리스트를 이용해 보세요"
        onSubmit={handleSignUp}
        submit={{
          button: 'sign up',
          testid: 'signup-button',
          color: '#E37383',
        }}
        otherPage={{
          button: '로그인',
          label: '이미 회원이신가요?',
          url: URL.SIGNIN,
        }}
      />
    </PublicLayout>
  );
};
export default SignUp;
