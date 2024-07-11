import React from 'react';
interface SocialLoginButtonProps {
  provider: 'Google' | 'Facebook';
}
const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider }) => {
  return (
    <button className="w-full p-2 border rounded-full flex items-center justify-center space-x-2">
      <img src={`/${provider.toLowerCase()}-icon.svg`} alt={`${provider} icon`} className="w-5 h-5" />
      <span>{provider}</span>
    </button>
  );
};

export default SocialLoginButton;