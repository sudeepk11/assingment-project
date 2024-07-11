import React, { useState } from "react";
import CustomButton from "./ui/CustomButton";
import SocialLoginButton from "./ui/SocialButton";
import { Link, useNavigate } from "react-router-dom";
import useAuthService from "../hooks/useAuth";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import { notify } from "../utils/sendNotification";

const Form: React.FC = () => {
  const { register } = useAuthService();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const handleInputChange = (field: string) => (e: any) => {    setFormValues({
      ...formValues,
      [field]: e.target.value,
    });
  };

  const handleSubmitForm = async (e:any) => {
    e.preventDefault()
    try {
      const { data } = await register(
        formValues.username,
        formValues.email,
        formValues.password
      );
      notify("Account created Successfully!",true)
      dispatch(
        login({
          token: data.access_token,
          user: { email: data.user.email, username: data.user.username },
        })
      );
      navigate("/login");
    } catch (error: any) {
      notify(error?.response?.data?.detail||error.message,false)
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form>
        <div className="mb-4">
          <input
            
            onChange={
              handleInputChange("username")
            }
            value={formValues.username}
            type="text"
            placeholder="User Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={
              handleInputChange("email")
            }
            value={formValues.email}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={
              handleInputChange("password")
            }
            value={formValues.password}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
        </div>

        <CustomButton onClick={handleSubmitForm}>Sign Up</CustomButton>
        <div className="my-2 text-center">Or</div>
        <div className="space-x-2 flex items-center">
          <SocialLoginButton provider="Google" />
          <SocialLoginButton provider="Facebook" />
        </div>
        <div className="my-3 text-center">
          <span className="text-sm">Already Have an account?</span>
        </div>
        <Link
          to="/login"
          className="text-primary text-sm font-bold w-full p-2 border rounded-full flex items-center justify-center space-x-2"
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default Form;
