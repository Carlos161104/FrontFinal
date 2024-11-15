import { API_URL } from "@/constants";

const UpdateAddress = async (addressData) => {
    const response = await fetch(`${API_URL}/addresses/${addressData.client_id}`, {
      method: 'PUT', // Usamos PUT para actualizar
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar la dirección');
    }
  
    const data = await response.json();
    return data;
  };
  
  export default UpdateAddress;