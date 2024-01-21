import { useState } from "react";
import axios from "axios";

function useAxios() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // function to post data to the server
  const postData = async (url, body, setStatusData, callback) => {
    setLoading(true);
    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        setStatusData((prev) => ({
          ...prev,
          status: true,
          message: response.data.message,
          type: "success",
        }));
        callback(response.data);
      } else {
        setStatusData((prev) => ({
          ...prev,
          status: true,
          message: response.data.message,
          type: "error",
        }));
      }
      setData(response.data);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
      setStatusData((prev) => ({
        ...prev,
        status: true,
        message: "Invalid credentials!",
        type: "error",
      }));
    }
  };

  // function to get data from the server
  const getData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // return the data, error, and loading states and the functions
  return { data, error, loading, postData, getData };
}

export default useAxios;
