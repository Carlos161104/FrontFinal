import { API_URL } from "@/constants";

const createSells = async (items, newOrder) => {
  const products = items.map((item) => ({
    ...item,
    product_id: item.id,
    order_id: newOrder.id,
    pending_quantity: item.quantity,
  }));

  products.forEach(product => delete product.id);

  try {
    for (const product of products) {
      const response = await fetch(`${API_URL}/sells`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Producto vendido:', data);
    }

    alert('La orden se registró correctamente');
  } catch (error) {
    console.error('Error al vender el producto:', error);
  }
};

export default createSells;