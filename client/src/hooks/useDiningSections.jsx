import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../components/App/App";

export const useDiningSections = () => {
  const { statusData } = useContext(StatusModalContext);
  const [diningSections, setDiningSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDiningSections = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL_API_SERVER_URL}/sections`
        );
        setDiningSections(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDiningSections();
  }, [statusData]);

  return {
    loading,
    error,
    diningSections,
  };
};
