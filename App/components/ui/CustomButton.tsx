import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ loading,text, onClickHandler,outlined, className }:{
  text:string;
  onClickHandler:()=>any;
  outlined?:boolean;
  className?:string,
  loading?:boolean
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onClickHandler}
      className={` p-4 rounded-full mb-4 ${outlined?"border border-primary":"bg-primary"} ${className}`}
    >
      <Text className={`text-white text-center ${outlined?"text-primary":""}`}>{loading?"Loading...":text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
