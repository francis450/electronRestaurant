import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { StatusModalContext } from "../components/App/App"

export const useMenuCategories = () => {
    const {statusData} = useContext(StatusModalContext)
    const [menuCategories, setMenuCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchMenuCategories =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/menu_categories`);
            setMenuCategories(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchMenuCategories();
    }, [statusData])
    
    return {
        loading,
        error,
        menuCategories
    }
}