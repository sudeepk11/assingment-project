import axios from 'axios';
import useAuthStore from './useZustandStore';

const useAxios = () => {
  const {token} = useAuthStore()
  const baseURL = "http://10.0.2.2:8000";
  const instance = axios.create({
    baseURL,
  });


  instance.interceptors.request.use((config) => {
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

  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', response);
      return response;
    },
    (error) => {
      console.log('Error:', error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
