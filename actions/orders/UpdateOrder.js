import { API_URL } from "@/constants";


async function updateOrder(order) {
    try {
        const response = await fetch(`${API_URL}/orders/${order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            alert('La actualización se hizo de manera correcta');
        } else {
            console.error('Error al actualizar la orden', response.statusText);
        }
    } catch (error) {
        console.error('Error al actualizar la orden', error);
    }
}
export default updateOrder;