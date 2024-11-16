import { API_URL } from "@/constants";

export async function createTrackInventories(inventories) {
  try {
    const promises = inventories.map(async (inventory) => {
      const response = await fetch(`${API_URL}/trackinventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory),
      });

      if (!response.ok) {
        throw new Error(`Error al crear el inventario con id ${inventory.inventory_id}`);
      }
    });

    await Promise.all(promises);
    alert("Todos los inventarios fueron creados exitosamente");
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al intentar crear los inventarios");
  }
}