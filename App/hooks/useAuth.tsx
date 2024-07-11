import useAxios from "./useAxios";
const useAuthService = () => {
  const api = useAxios();

  const login = async (email: string, password: string) => {
    return await api.post("/auth/login", { email, password });
  };
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    return await api.post("/auth/register", { username, email, password });
  };
  return {
    login,
    register,
  };
};

export default useAuthService;
