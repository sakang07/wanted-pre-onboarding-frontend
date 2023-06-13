import React, { useContext } from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { SIGNIN_TOKEN, URL } from '@/constant';
import AuthContext from '@/context/AuthContext';
import LoadingContext from '@/context/LoadingContext';
import authService from '@/api/authService';
import AlertContext from '@/context/AlertContext';

const TITLE = '로그인';

const SignIn = () => {
  const { getToken } = useContext(AuthContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { showAlert } = useContext(AlertContext);

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
          children: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  return (
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
  );
};
export default SignIn;
