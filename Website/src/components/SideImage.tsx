import React from 'react';
interface Props{
  image:string
}
const SideImage: React.FC<Props> = ({image}) => {
  return (
    <div className="hidden md:block w-1/2 bg-primary rounded-l-lg p-8 text-white relative">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-2xl absolute top-8 left-8 font-bold mb-4 border-[2px] border-white p-1 px-3 rounded w-fit">S</div>
        <div className='flex flex-col items-center'>
          <div className='relative'>
            <div className='bg-primaryDark h-48 w-48 rounded-full absolute'></div>
            <img className=' scale-x-[-1] w-60 h-60' src={image}/>

          </div>
          <h2 className="text-xl  mb-2">Welcome aboard my friend</h2>
          <p className='text-sm'>Just a couple of clicks and we start</p>
        </div>
      </div>
    </div>
  );
};

export default SideImage;