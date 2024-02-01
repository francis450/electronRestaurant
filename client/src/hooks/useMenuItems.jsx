import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../components/App/App";

export const useMenuItems = () => {
  const { statusData } = useContext(StatusModalContext);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/menu`
        );
        setMenuItems(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [statusData]);

  return {
    loading,
    error,
    menuItems,
  };
};
