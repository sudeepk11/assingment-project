import useAxios from "./useAxios";
const useQuoteService = () => {
  const api = useAxios();
  const getQuote = async () => {
    return await api.get("/data/quote");
  };
  return {
    getQuote
  };
};

export default useQuoteService;
