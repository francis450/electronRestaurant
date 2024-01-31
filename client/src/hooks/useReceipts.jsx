import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../components/App/App";

export const useReceipts = () => {
  const { statusData } = useContext(StatusModalContext);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/purchases`
        );
        setReceipts(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, [statusData]);

  return {
    loading,
    error,
    receipts,
  };
};
