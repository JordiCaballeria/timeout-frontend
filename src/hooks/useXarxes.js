import { useState } from "react";
import { getTweetsApi } from "../api/xarxes";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useXarxes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tweets, setTweets] = useState(null);

  const { auth } = useAuth();

  const getTweets = async () => {
    try {
      setLoading(true);
      const response = await getTweetsApi();
      setTweets(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error);
    }
  };

  return {
    getTweets,
    loading,
    error,
    tweets,
  };
};
