import axios from "axios"
import { useEffect, useState } from "react"

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCategories =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/categories`);
            setCategories(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchCategories();
    }, [])
    
    return {
        loading,
        error,
        categories
    }
}