import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useAuthStore from "../../hooks/useZustandStore";
import useQuoteService from "../../hooks/useQuote";
import Button from "../../components/ui/CustomButton";

const HomeScreen = () => {
  const { user } = useAuthStore();
  const { getQuote } = useQuoteService();
  const [quote, setQuote] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const fetchQuote = async () => {
    try {
      setIsQuoteLoading(true);
      const res = await getQuote();
      setQuote(res.data.quote);
    } catch (error) {
      console.log("Failed to fetch the quote");
    } finally {
      setIsQuoteLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View className="px-[5vw]" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text className=" text-xl">Welcome, {user?.username || "User"}!</Text>
      {isQuoteLoading ? (
        <Text className="text-2xl text-center">Loading quote...</Text>
      ) : (
        <View className="flex">
        <Text className="text-2xl text-center mb-2">{error || quote}</Text>
        <Button text="Regenerate" onClickHandler={fetchQuote}/>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
