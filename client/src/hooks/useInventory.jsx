import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { StatusModalContext } from "../components/App/App"

export const useInventory = () => {
    const {statusData} = useContext(StatusModalContext)
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchInventory =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/inventoryItems`);
            setInventory(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchInventory();
    }, [statusData])
    
    return {
        loading,
        error,
        inventory
    }
}