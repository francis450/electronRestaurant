import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { StatusModalContext } from "../components/App/App"

export const useSuppliers = () => {
  const {statusData} = useContext(StatusModalContext)
    const [suppliers, setSuppliers] = useState({ suppliers: [] })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchSuppliers =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_SERVER_URL}/suppliers`);
            setSuppliers(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchSuppliers();
    }, [statusData])
    
    return {
        loading,
        error,
        suppliers
    }
}