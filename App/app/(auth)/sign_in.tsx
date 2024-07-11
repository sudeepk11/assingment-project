import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, NativeSyntheticEvent, TextInputChangeEventData,Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButton from "../../components/ui/SocialButton";
import Button from "../../components/ui/CustomButton";
import useAuthService from "../../hooks/useAuth";
import {router} from 'expo-router'
import useAuthStore from "../../hooks/useZustandStore";
import useQuoteService from "../../hooks/useQuote";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const {user,loginUser} = useAuthStore((state)=>{return state})
  const { login } = useAuthService();
  const { getQuote } = useQuoteService();
  const [loginLoding,setLoginLoading] = useState(false);
  const [quote, setQuote] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const showToast = (success:boolean,title:string,body:string) => {
    Toast.show({
      type:  success?'success':"error",
      text1: title,
      text2: body
    });
  }

  const handleInputChange = (field: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setFormValues({
      ...formValues,
      [field]: e.nativeEvent.text
    });
  };
  const handleSubmit = async () => {
    try {
      setLoginLoading(true);
      const { data } = await login(formValues.email, formValues.password)
      loginUser(data.access_token,{email:data.user.email,username:data.user.username})
      showToast(true,"Success","Logged In!")
    } catch (error: any) {
      showToast(false,"Failed","Login Failed")
    }finally{
      setLoginLoading(false);
    }
    try {
      setIsQuoteLoading(true)
      const res = await getQuote();
      setQuote(res.data.quote)
      showToast(true,"quote",res.data.quote)
    } catch (error) {
      showToast(false,"Failed","Couldn't fetch quotes")
    }finally{
      setIsQuoteLoading(false)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Toast/>
      <View className="items-center mb-8">
        <Image source={{ uri: "your-logo-url" }} className="w-24 h-24 mb-4" />
        <Text className="text-2xl font-semibold text-primary">Log in</Text>
      </View>
      <View>
        <View className="mb-4">
          <TextInput
            onChange={handleInputChange("email")}
            value={formValues.email}
            className="border border-gray-300 p-4 rounded-full"
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View className="mb-4">
          <TextInput
            onChange={handleInputChange("password")}
            value={formValues.password}
            className="border border-gray-300 p-4 rounded-full"
            placeholder="Password"
            secureTextEntry
        />
        </View>
        <TouchableOpacity className="mb-4">
          <Text className="text-blue-500 text-right">Forgot password?</Text>
        </TouchableOpacity>
        <Button loading={loginLoding} onClickHandler={handleSubmit} text={"Log In"} />
        <View className="flex-row items-center mb-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-4 text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>
        <View className="flex-row justify-center space-x-2 mb-4">
          <View className="w-1/2">
            <SocialButton provider="Google" />
          </View>
          <View className="w-1/2">
            <SocialButton provider="Facebook" />
          </View>
        </View>
        <View className="flex justify-center">
          <Text className="text-gray-500 text-center mb-2">Have no account yet?</Text>
          <Button outlined text={"Register"} onClickHandler={() => {router.push("/sign_up")}} className="text-primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
