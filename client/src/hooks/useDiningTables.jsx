import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../components/App/App";

export const useDiningTables = () => {
  const { statusData } = useContext(StatusModalContext);
  const [diningTables, setDiningTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDiningTables = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL_API_SERVER_URL}/tables`
        );
        setDiningTables(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDiningTables();
  }, [statusData]);

  return {
    loading,
    error,
    diningTables,
  };
};
