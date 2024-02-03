import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../components/App/App";

export const useCategories = () => {
  const { statusData } = useContext(StatusModalContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL_API_SERVER_URL}/categories`
        );
        setCategories(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [statusData]);

  return {
    loading,
    error,
    categories,
  };
};
