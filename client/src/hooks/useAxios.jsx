import { useState } from "react";
import axios from "axios";

const server_url = process.env.REACT_APP_LOCAL_API_SERVER_URL;

function useAxios(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (setStatusData) => {
    setError(error);
    setLoading(false);
    setStatusData((prev) => ({
      ...prev,
      status: true,
      message: "Incorrect or duplicate values added!",
      type: "error",
    }));
  }

  // function to getData
  const getData = async (url, setStatusData, setCallerData) => {
    setLoading(true)
    try {
      await axios.get(`${server_url}${url}`).then((res) => {
        setCallerData(res.data.data)
      })
    } catch (error) {
      handleError(setStatusData)
    }
  }

  // function to post data to the server
  const postData = async (url, body, setStatusData, callback) => {
    setLoading(true);
    try {
      const response = await axios.post(`${server_url}${url}`, body);
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
      handleError(setStatusData)
    }
  };

    // function to post data to the server
    const putData = async (url, body, setStatusData, callback) => {
      setLoading(true);
      try {
        const response = await axios.put(`${server_url}${url}`, body);
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
        handleError(setStatusData)
      }
    };

  // function to delete
  const deleteData = async (url, setStatusData) => {
    // delete data
    setLoading(true);
    try {
      const response = await axios.delete(`${server_url}${url}`);
      setData(response.data);
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
      handleError(setStatusData)
    }
  };

  // return the data, error, and loading states and the functions
  return { data, error, loading, getData, postData, putData, deleteData };
}

export default useAxios;
