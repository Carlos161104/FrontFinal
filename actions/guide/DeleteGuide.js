import { API_URL } from "@/constants";

const DeleteGuide = async (guideId, tracks) => {
  // Confirmar si desea culminar la entrega
  const confirmDelete = window.confirm("¿Desea culminar la entrega?");
  if (!confirmDelete) {
    return;
  }

  try {
    // Iterar sobre el arreglo de tracks y eliminar cada uno
    for (const track of tracks) {
      await fetch(`${API_URL}/trackinventory/${track.id}`, {
        method: 'DELETE',
      });
    }

    // Eliminar el guideId
    await fetch(`${API_URL}/guides/${guideId}`, {
      method: 'DELETE',
    });

    // Alerta de éxito
    alert(`La entrega fue culminada con éxito.`);
    console.log(`Guide ${guideId} and its tracks have been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting guide or tracks:", error);
  }
};

export default DeleteGuide;
