import { API_URL } from "@/constants";

const DeleteSells = async (sellId) => {
  try {
    const response = await fetch(`${API_URL}/sells/${sellId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return response.status;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

export default DeleteSells;
