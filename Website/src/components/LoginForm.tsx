import React, { useState } from 'react';
import CustomButton from '../components/ui/CustomButton';
import SocialLoginButton from '../components/ui/SocialButton';
import { Link } from 'react-router-dom';
import useAuthService from '../hooks/useAuth';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/authSlice';
import { notify } from '../utils/sendNotification';
import useQuoteService from '../hooks/useQuote';

const LoginForm: React.FC = () => {
  const { login: loginService } = useAuthService();
  const dispatch = useAppDispatch();
  
  const { getQuote } = useQuoteService();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [isLoginLoading,setIsLoginLoading] = useState(false);

  const handleInputChange = (field: string) => (e: any) => {
    setFormValues({
      ...formValues,
      [field]: e.target.value,
    });
  };

  const handleSubmitForm = async (e:any) => {
    e.preventDefault()
    try {
      setIsLoginLoading(true)
      const { data } = await loginService(formValues.email, formValues.password);
      notify("Logged in Successfully!",true);
      dispatch(
        login({
          token: data.access_token,
          user: { email: data.user.email, username: data.user.username },
        })
      );
      fetchQuote();
    } catch (error: any) {
      console.log(error);
      notify(error?.response?.data?.detail||error.message,false)
    }finally{
      setIsLoginLoading(false)
    }
  };
  const fetchQuote = async () => {
    try {
      const res = await getQuote();
      notify(res.data.quote,true)
    } catch (error:any) {
      notify(error?.response?.data?.detail||error.message,false)
    } finally {

    }
  };

  
  return (
    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form>
        <div className="mb-4">
          <input
            onChange={handleInputChange('email')}
            value={formValues.email}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={handleInputChange('password')}
            value={formValues.password}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-right mb-4">
          <a href="#" className="text-primary text-sm">Forgot password?</a>
        </div>
        <CustomButton loading={isLoginLoading} onClick={handleSubmitForm}>Log In</CustomButton>
        <div className="my-2 text-center">Or</div>
        <div className="space-x-2 flex items-center">
          <SocialLoginButton provider="Google" />
          <SocialLoginButton provider="Facebook" />
        </div>
        <div className="my-3 text-center">
          <span className="text-sm">Have no account yet?</span>
        </div>
        <Link
          to="/signup"
          className="text-primary text-sm font-bold w-full p-2 border rounded-full flex items-center justify-center space-x-2"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
