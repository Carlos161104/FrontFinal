import { API_URL } from "@/constants";

export async function updateGuide(guide) {
    const userConfirmed = confirm('¿Estás seguro de que deseas actualizar esta guía?');
    if (!userConfirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/guides/${guide.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guide)
        });

        if (response.ok) {
            alert('La guía se actualizó correctamente.');
        } else {
            alert('Hubo un error al actualizar la guía.');
        }
    } catch (error) {
        alert('Hubo un error al actualizar la guía.');
    }
}
