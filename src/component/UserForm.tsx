import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '@/constant';
import Button, { LabelButton } from '@/component/Button';
import styled from 'styled-components';
import TextField from '@/component/TextField';

const Form = styled.form`
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

interface UserFormProps {
  title: string;
  subTitle: string;
  onSubmit: (props: FormValues) => void;
  submit: {
    button: string;
    testid: string;
    bgImg?: string;
  };
  otherPage: {
    button: string;
    label: string;
    url: string;
  };
}

export interface FormValues {
  userId: string;
  userPw: string;
  userEmail: string;
}

const UserForm = (props: UserFormProps) => {
  const { title, subTitle, onSubmit, submit, otherPage } = props;

  const { isSignIn } = useContext(AuthContext);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    const isValid = validate(formValues);
    if (isValid) {
      console.log('통과');
      onSubmit(formValues);
    }
  };

  const handleNavigate = () => {
    navigate(otherPage.url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TitleWrapper>
        <h2>{title}</h2>
        <p>{subTitle}</p>
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
        <Button type="submit" height="44px" bgImg={submit?.bgImg} data-testid={submit.testid} disabled={Boolean(error)}>
          {submit.button}
        </Button>
        <LabelButton label={otherPage.label} onClick={handleNavigate}>
          {otherPage.button}
        </LabelButton>
      </div>
    </Form>
  );
};

export default UserForm;
