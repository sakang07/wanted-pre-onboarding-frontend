import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SIGNIN_TOKEN, URL } from '@/constant';
import Button, { LabelButton } from '@/component/Button';
import styled from 'styled-components';
import TextField from '@/component/TextField';

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 500px;
  margin: 100px auto 0;
  padding: 80px 60px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const TitleWrapper = styled.div`
  h2 {
    margin-bottom: 4px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }

  p {
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
    color: #555;
  }
`;

interface FormValues {
  userId: string;
  userPw: string;
  userEmail: string;
}

const SignIn = () => {
  const { isSignIn, getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    userId: '',
    userPw: '',
    userEmail: '',
  });
  const [error, setError] = useState<FormValues | null | undefined>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSignIn) {
      navigate(URL.TODO);
    }
  }, [isSignIn]);

  useEffect(() => {
    if (isSubmitted) {
      validate(formValues);
    }
  }, [formValues]);

  const validate = (formValues: FormValues) => {
    const { userPw, userEmail } = formValues;
    const newError = {
      userId: '',
      userPw: userPw.length < 8 ? '비밀번호는 8글자 이상으로 입력해 주세요' : '',
      userEmail: !userEmail.includes('@') ? 'Email의 형식이 잘못되었습니다' : '',
    };
    if (newError.userPw || newError.userEmail) {
      setError(newError);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    const isValid = validate(formValues);
    if (isValid) {
      console.log('통과');
      window.localStorage.setItem(SIGNIN_TOKEN, SIGNIN_TOKEN);
      getToken?.();
    }
  };

  const handleNavigate = () => {
    navigate(URL.SIGNUP);
  };

  return (
    <SignInForm onSubmit={handleSignIn}>
      <TitleWrapper>
        <h2>로그인</h2>
        <p>투두리스트의 이용을 위해 로그인하세요</p>
      </TitleWrapper>

      <div>
        <TextField
          type="text"
          id="userId"
          name="userId"
          label="ID"
          error={error?.userId}
          placeholder="아이디를 입력해주세요"
          onChange={handleChange}
          data-testid="email-input"
        />
        <TextField
          type="password"
          id="userPw"
          name="userPw"
          label="Password"
          error={error?.userPw}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChange}
          data-testid="password-input"
        />
        <TextField
          type="text"
          id="userEmail"
          name="userEmail"
          label="Email"
          error={error?.userEmail}
          placeholder="이메일을 입력해주세요"
          onChange={handleChange}
          data-testid="email-input"
        />
      </div>

      <div>
        <Button type="submit" height="44px" data-testid="signin-button" disabled={Boolean(error)}>
          sign in
        </Button>
        <LabelButton label="아직 회원이 아니신가요?" onClick={handleNavigate}>
          회원가입
        </LabelButton>
      </div>
    </SignInForm>
  );
};

export default SignIn;
