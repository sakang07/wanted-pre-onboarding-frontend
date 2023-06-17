import React, { useContext, useEffect } from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { SIGNIN_TOKEN, URL } from '@/constant';
import AuthContext from '@/context/AuthContext';
import LoadingContext from '@/context/LoadingContext';
import authService from '@/api/authService';
import AlertContext from '@/context/AlertContext';
import PublicLayout from '@/layout/PublicLayout';
import { useNavigate } from 'react-router-dom';

const TITLE = '로그인';

const SignIn = () => {
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

  const handleSignIn = (formValues: FormValues) => {
    showLoading();
    authService
      .signIn(formValues)
      .then(response => {
        window.localStorage.setItem(SIGNIN_TOKEN, response.data.access_token);
        getToken?.();
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: '로그인 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  return (
    <PublicLayout>
      <UserForm
        title={TITLE}
        subTitle="투두리스트를 이용하시려면 로그인 하세요"
        onSubmit={handleSignIn}
        submit={{
          button: 'sign in',
          testid: 'signin-button',
        }}
        otherPage={{
          button: '회원가입',
          label: '아직 회원이 아니신가요?',
          url: URL.SIGNUP,
        }}
      />
    </PublicLayout>
  );
};
export default SignIn;
