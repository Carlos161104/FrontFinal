import { API_URL } from "@/constants";
import DeleteSells from "../sells/DeleteSells";

const DeleteOrder = async (orderId) => {
  try {
    // Obtener todas las sells
    const response = await fetch(`${API_URL}/sells`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const sells = await response.json();

    // Filtrar las sells por order_id
    const sellsToDelete = sells.filter((sell) => sell.order_id === orderId);

    // Eliminar cada sell
    for (const sell of sellsToDelete) {
      await DeleteSells(sell.id);
    }

    // Eliminar la orden
    const deleteOrderResponse = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!deleteOrderResponse.ok) {
      throw new Error(
        `Error en la solicitud: ${deleteOrderResponse.statusText}`
      );
    }

    // Alerta de éxito
    alert("Se eliminó la orden de manera correcta.");
    console.log("Orden eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    alert("Error al eliminar la orden."); // Alerta de error
    throw error;
  }
};

export default DeleteOrder;
