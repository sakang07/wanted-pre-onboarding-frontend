import React from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { URL } from '@/constant';
import { useNavigate } from 'react-router-dom';

const TITLE = '회원가입';

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = (formValues: FormValues) => {
    console.log('회원가입', formValues);
    navigate(URL.SIGNIN);
  };

  return (
    <UserForm
      title={TITLE}
      subTitle="간편 회원가입으로 투두리스트를 이용해 보세요"
      onSubmit={handleSignUp}
      submit={{
        button: 'sign up',
        testid: 'signup-button',
        bgImg: 'linear-gradient(92.88deg, #DE3163 9.16%, #E37383 64.72%)',
      }}
      otherPage={{
        button: '로그인',
        label: '이미 회원이신가요?',
        url: URL.SIGNIN,
      }}
    />
  );
};
export default SignUp;
