import  { useEffect, useState } from 'react';

import useQuoteService from '../../hooks/useQuote';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomButton from '../../components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const HomeScreen = () => {
  const { user } = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const { getQuote } = useQuoteService();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<null|string>(null);
  const [error, setError] = useState<null|string>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setIsQuoteLoading(true);
      const res = await getQuote();
      if(res.status===401){
        alert("Token Expired Login Again");
        dispatch(logout())
        navigate("/login");
      }
      setQuote(res.data.quote);
      setError(null);
    } catch (error) {
      console.log("Failed to fetch the quote");
      setError("Failed to fetch the quote");
    } finally {
      setIsQuoteLoading(false);
    }
  };

  useEffect(() => {
    navigate("/login")
    // fetchQuote();
  }, []);

  return (
    <div className="px-5 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl mb-4">Welcome, {user?.username || "User"}!</h1>
      {isQuoteLoading ? (
        <p className="text-2xl text-center">Loading quote...</p>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-2xl text-center mb-4">{error || quote}</p>
          <div className='w-full'>

          <CustomButton outline theme={"primary"}  onClick={fetchQuote} >
              Regenerate
          </CustomButton>
          </div>
          <div className='mt-3 w-full'>
          <CustomButton  outline={true} theme={"danger"}  onClick={fetchQuote} >
              Logout
          </CustomButton>
            </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;