import React, { useContext } from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { SIGNIN_TOKEN, URL } from '@/constant';
import AuthContext from '@/context/AuthContext';

const TITLE = '로그인';

const SignIn = () => {
  const { getToken } = useContext(AuthContext);

  const handleSignIn = (formValues: FormValues) => {
    console.log('로그인', formValues);
    window.localStorage.setItem(SIGNIN_TOKEN, SIGNIN_TOKEN);
    getToken?.();
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
