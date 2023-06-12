import React, { useContext } from 'react';
import UserForm, { FormValues } from '@/component/UserForm';
import { URL } from '@/constant';
import { useNavigate } from 'react-router-dom';
import authService from '@/api/authService';
import LoadingContext from '@/context/LoadingContext';
import AlertContext from '@/context/AlertContext';

const TITLE = '회원가입';

const SignUp = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { showAlert } = useContext(AlertContext);

  const handleSignUp = (formValues: FormValues) => {
    console.log('회원가입', formValues);
    showLoading();
    authService
      .signUp(formValues)
      .then(response => {
        console.log(response);
        showAlert({
          title: '회원가입 완료',
          children: `${formValues.email} 님의 회원가입이 완료되었습니다.`,
          onClose: () => navigate(URL.SIGNIN),
        });
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: '회원가입 실패',
          children: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
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
