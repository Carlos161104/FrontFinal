import { API_URL } from "@/constants";

export async function createGuide(guide) {
  try {
    // Agregar el campo date_created al objeto guide
    guide.date_created = new Date().toISOString();

    const response = await fetch(`${API_URL}/guides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guide),
    });

    if (response.ok) {
      alert("La publicación fue exitosa");

      // Realizar un GET para obtener el arreglo de guías
      const getResponse = await fetch(`${API_URL}/guides`);
      if (getResponse.ok) {
        const guides = await getResponse.json();
        // Filtrar el arreglo y obtener el objeto con el id mayor
        const maxIdGuide = guides.reduce((max, guide) => (guide.id > max.id ? guide : max), guides[0]);
        return maxIdGuide.id;
      } else {
        alert("Hubo un problema al obtener las guías");
      }
    } else {
      alert("Hubo un problema con la publicación");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al intentar publicar la guía");
  }
}
