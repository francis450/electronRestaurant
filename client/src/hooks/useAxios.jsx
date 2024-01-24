import { useState } from "react";
import axios from "axios";

function useAxios(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // function to post data to the server
  const postData = async (url, body, setStatusData, callback) => {
    setLoading(true);
    try {
      const response = await axios.post(url, body);
      if (response.status >= 200 && response.status < 300) {
        setStatusData((prev) => ({
          ...prev,
          status: true,
          message: response.data.message
            ? response.data.message
            : "Request was successful",
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
        message: "Incorrect or duplicate values added!",
        type: "error",
      }));
    }
  };

  // function to delete
  const deleteData = async (url, setStatusData) => {
    // delete data
    setLoading(true);
    try {
      const response = await axios.delete(url);
      setData(response.data);
      console.log(response);
      setStatusData((prev) => ({
        ...prev,
        status: true,
        message: response.data.message
          ? response.data.message
          : "Request was successful",
        type: "success",
      }));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setStatusData((prev) => ({
        ...prev,
        status: true,
        message: "Incorrect or duplicate values added!",
        type: "error",
      }));
    }
  };

  // return the data, error, and loading states and the functions
  return { data, error, loading, postData, deleteData };
}

export default useAxios;
