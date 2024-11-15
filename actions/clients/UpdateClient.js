import { API_URL } from "@/constants";

const UpdateClient = async (client) => {
    const isConfirmed = window.confirm("¿Está seguro de actualizar este usuario?");
    if (!isConfirmed) {
        console.log('Actualización cancelada');
        return false;
    }
    console.log(client);

    const url = `${API_URL}/clients/${client.id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const updatedClient = await response.json();
        return updatedClient;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export default UpdateClient;
