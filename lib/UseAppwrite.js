import { useState, useEffect } from "react";
import { Alert } from "react-native";

const UseAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

 
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fn();
        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData();
      }, []);
  const refetch = () => fetchData()

  return { data, Loading, refetch };
};

export default UseAppwrite;
