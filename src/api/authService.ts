import { post } from '@/helper/apiHelper';
import { URL } from '@/constant';
import { FormValues } from '@/component/UserForm';

const signUp = (data: FormValues) => post(URL.AUTH + URL.SIGNUP, data);
const signIn = (data: FormValues) => post(URL.AUTH + URL.SIGNIN, data);

const authService = {
  signUp,
  signIn,
};

export default authService;
