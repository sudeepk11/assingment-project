import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  outline?:boolean;
  theme?:string;
  onClick?: (e?:any) => void;
  loading?:boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick,theme,loading}) => {
  return (
    <button
      disabled={loading}
      className={`w-full   ${theme==="danger"?"bg-red-500 hover:bg-red-700":"bg-primary hover:bg-primaryDark"}  text-white p-2 rounded-full  transition-colors `}
      onClick={onClick}
    >
      {loading?"Loading...":children}
    </button>
  );
};

export default CustomButton;