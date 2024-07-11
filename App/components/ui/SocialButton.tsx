import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

const SocialButton = ({ provider }) => {
  const icons = {
    google: require('../../assets/icons/google.webp'),
    facebook: require('../../assets/icons/facebook.png'),
  };

  return (
    <TouchableOpacity className="w-full p-3 border-[1px] border-primary rounded-full  items-center justify-center space-x-2 flex flex-row">
      <Image source={icons[provider.toLowerCase()]} className="w-5 h-5" />
      <Text>{provider}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
