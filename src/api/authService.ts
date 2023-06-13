import { post } from '@/helper/apiHelper';
import { URL } from '@/constant';
import { FormValues } from '@/component/UserForm';
import { AxiosResponse } from 'axios';

const signUp = (data: FormValues): Promise<AxiosResponse> => post(URL.AUTH + URL.SIGNUP, data);
const signIn = (data: FormValues): Promise<AxiosResponse> => post(URL.AUTH + URL.SIGNIN, data);

const authService = { signUp, signIn };

export default authService;
