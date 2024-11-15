import { API_URL } from "@/constants";

const fetchAddress = async (addid) => {
    const response = await fetch(`${API_URL}/addresses/${addid}`);
  
    if (!response.ok) {
      throw new Error('Error al obtener la dirección');
    }
  
    const data = await response.json();
    return data;
  };
  
  export default fetchAddress;