import { API_URL } from "@/constants";


const fetchClient = async (id) => {
  try {
    const response = await fetch(`${API_URL}/clients/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch client data');
    }
    const clientData = await response.json();
    return clientData;
  } catch (error) {
    console.error('Error fetching client data:', error);
    throw error;
  }
};

export default fetchClient;
