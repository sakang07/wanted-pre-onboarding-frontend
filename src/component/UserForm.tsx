import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '@/constant';
import Button, { LabelButton } from '@/component/Button';
import styled from 'styled-components';
import TextField from '@/component/TextField';
import Container from '@/component/Container';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

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
    color?: string;
  };
  otherPage: {
    button: string;
    label: string;
    url: string;
  };
}

export interface FormValues {
  email: string;
  password: string;
}

const UserForm = (props: UserFormProps) => {
  const { title, subTitle, onSubmit, submit, otherPage } = props;

  const { isSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    password: '',
    email: '',
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
    const { password, email } = formValues;
    const newError = {
      password: password.length < 8 ? '비밀번호는 8글자 이상으로 입력해 주세요' : '',
      email: !email.includes('@') ? 'Email의 형식이 잘못되었습니다' : '',
    };
    if (newError.password || newError.email) {
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
      onSubmit(formValues);
    }
  };

  const handleNavigate = () => {
    navigate(otherPage.url);
  };

  return (
    <Container $marginTop={100}>
      <Form onSubmit={handleSubmit}>
        <TitleWrapper>
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </TitleWrapper>

        <div>
          <TextField
            type="text"
            id="email"
            name="email"
            label="Email ID"
            error={error?.email}
            placeholder="이메일 ID를 입력해주세요"
            onChange={handleChange}
            data-testid="email-input"
          />
          <TextField
            type="password"
            id="password"
            name="password"
            label="Password"
            error={error?.password}
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            data-testid="password-input"
          />
        </div>

        <div>
          <Button type="submit" data-testid={submit.testid} $height="44px" $color={submit.color} disabled={Boolean(error)}>
            {submit.button}
          </Button>
          <LabelButton label={otherPage.label} onClick={handleNavigate}>
            {otherPage.button}
          </LabelButton>
        </div>
      </Form>
    </Container>
  );
};

export default UserForm;
