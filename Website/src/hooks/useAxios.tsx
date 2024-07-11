import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

const useAxios = () => {
  const {token} = useAppSelector((state)=>state.auth)
  const baseURL = "http://0.0.0.0:8000";
  const instance = axios.create({
    baseURL,
  });


  instance.interceptors.request.use((config:any) => {
    console.log('Request:', config);
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    if(token){
      config.headers["Authorization"] = "Bearer "+token;
    }
    return config;
  });

  // instance.interceptors.response.use(
  //   (response:any) => {
  //     console.log('Response:', response);
  //     return response;
  //   },
  //   (error:any) => {
  //     console.log('Error:', error);
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default useAxios;
