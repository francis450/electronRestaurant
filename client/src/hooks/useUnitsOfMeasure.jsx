import axios from "axios"
import { useEffect, useState } from "react"

export const useUnitsOfMeasure = () => {
    const [unitsOfMeasure, setUnitsOfMeasure] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchUnitsOfMeasure =async () => {
          setError(false);
          setLoading(true);
          try {
            const res = await axios.get(`${process.env.REACT_APP_LOCAL_API_SERVER_URL}/unitsofmeasure`);
            setUnitsOfMeasure(res.data);
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchUnitsOfMeasure();
    }, [])
    
    return {
        loading,
        error,
        unitsOfMeasure
    }
}