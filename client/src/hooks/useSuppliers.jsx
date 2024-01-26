import axios from "axios"
import { useEffect, useState } from "react"

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState({ suppliers: [] })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchSuppliers =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/suppliers`);
            setSuppliers(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchSuppliers();
    }, [])
    
    return {
        loading,
        error,
        suppliers
    }
}