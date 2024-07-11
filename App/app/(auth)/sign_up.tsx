import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButton from "../../components/ui/SocialButton";
import Button from "../../components/ui/CustomButton";
import useAuthService from "../../hooks/useAuth";
import { router } from 'expo-router';
import useAuthStore from "../../hooks/useZustandStore";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const { register } = useAuthService();
  const { loginUser } = useAuthStore();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: ""
  });

  const showToast = (success: boolean, title: string, body: string) => {
    Toast.show({
      type: success ? 'success' : "error",
      text1: title,
      text2: body
    });
  };

  const handleInputChange = (field: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setFormValues({
      ...formValues,
      [field]: e.nativeEvent.text
    });
  };

  const handleSubmit = async () => {
    try {
      setRegisterLoading(true);
      const { data } = await register(formValues.username, formValues.email, formValues.password);
      showToast(true, "Success", "Account created successfully!");
      loginUser(data.access_token, { email: data.user.email, username: data.user.username });
      router.push("/sign_in");
    } catch (error: any) {
      showToast(false, "Failed", "Something went wrong!");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Toast />
      <View className="items-center mb-8">
        <Image source={{ uri: "your-logo-url" }} className="w-24 h-24 mb-4" />
        <Text className="text-2xl font-semibold text-primary">Sign Up</Text>
      </View>
      <View>
        <View className="mb-4">
          <TextInput
            onChange={handleInputChange("username")}
            value={formValues.username}
            className="border border-gray-300 p-4 rounded-full"
            placeholder="User Name"
          />
        </View>
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
       
        <Button loading={registerLoading} onClickHandler={handleSubmit} text={"Create an account"} />
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
          <Text className="text-gray-500 text-center mb-2">Already Have an account?</Text>
          <Button outlined text={"Login"} onClickHandler={() => {router.push("/sign_in")}} className="text-primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;