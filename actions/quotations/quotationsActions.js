'use server'

import { API_URL } from "@/constants";

// Función para generar ID aleatorio
function generateRandomId() {
  return Math.floor(Math.random() * 500) + 1;
}

// Obtener todas las cotizaciones con filtros opcionales
export async function fetchQuotations(clientFilter = '', userFilter = '') {
  'use server'
  try {
    const params = new URLSearchParams();
    if (clientFilter) params.append('client', clientFilter);
    if (userFilter) params.append('user', userFilter);

    const response = await fetch(`${API_URL}/quotations?${params}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotations:', error);
    throw new Error('Error al cargar las cotizaciones: ' + error.message);
  }
}

// Obtener una cotización específica
export async function fetchQuotationById(id) {
  'use server'
  try {
    const response = await fetch(`${API_URL}/quotations/${id}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotation:', error);
    throw new Error('Error al cargar la cotización: ' + error.message);
  }
}

// Crear nueva cotización
export async function createQuotation(quotationData) {
  'use server'
  try {
    // Generamos el ID aleatorio
    const randomId = generateRandomId();
    
    // Sanitizar y validar los datos antes de enviarlos
    const sanitizedData = {
      id: randomId, // Agregamos el ID aleatorio
      total: parseFloat(quotationData.total.toFixed(2)),
      valid_time: String(quotationData.valid_time).substring(0, 20),
      pdf_url: quotationData.pdf_url || null,
      payment_method_id: parseInt(quotationData.payment_method_id, 10),
      client_id: parseInt(quotationData.client_id, 10),
      user_id: parseInt(quotationData.user_id, 10)
    };

    console.log('Datos a enviar:', sanitizedData);

    const response = await fetch(`${API_URL}/quotations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
      cache: 'no-store'
    });

    console.log('Status respuesta:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error data:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Respuesta exitosa:', responseData);
    return responseData;

  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(`Error al crear la cotización: ${error.message}`);
  }
}

// Eliminar cotización
export async function deleteQuotation(id) {
  'use server'
  try {
    const response = await fetch(`${API_URL}/quotations/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Si la respuesta es exitosa pero no hay contenido (204)
    if (response.status === 204) {
      return true;
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting quotation:', error);
    throw new Error('Error al eliminar la cotización: ' + error.message);
  }
}

// Funcion para editar

export async function updateQuotation(id, quotationData) {
  'use server'
  try {
    // Sanitizar y validar los datos antes de enviarlos
    const sanitizedData = {
      total: parseFloat(quotationData.total.toFixed(2)),
      valid_time: String(quotationData.valid_time).substring(0, 20),
      pdf_url: quotationData.pdf_url || null,
      payment_method_id: parseInt(quotationData.payment_method_id, 10),
      client_id: parseInt(quotationData.client_id, 10),
      user_id: parseInt(quotationData.user_id, 10)
    };

    console.log('Datos a actualizar:', sanitizedData);

    const response = await fetch(`${API_URL}/quotations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Respuesta exitosa:', responseData);
    return responseData;

  } catch (error) {
    console.error('Error updating quotation:', error);
    throw new Error(`Error al actualizar la cotización: ${error.message}`);
  }
}

export async function generateQuotationPDF(id) {
  'use server'
  try {
    // Obtener los datos de la cotización
    const quotationData = await fetchQuotationById(id);
    
    if (!quotationData) {
      throw new Error('Cotización no encontrada');
    }

    // Hacer la petición al nuevo endpoint local
    const response = await fetch('http://localhost:3000/app/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quotationData),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Error generando el PDF');
    }

    // Crear un Blob con el HTML
    const htmlBlob = new Blob([data.html], { type: 'text/html' });
    return htmlBlob;

  } catch (error) {
    console.error('Error en generateQuotationPDF:', error);
    throw new Error(`Error al generar el PDF: ${error.message}`);
  }
}

// Nueva función para obtener la URL del PDF
export async function getQuotationPDFUrl(id) {
  'use server'
  try {
    const response = await fetch(`${API_URL}/quotations/${id}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.pdf_url;
  } catch (error) {
    console.error('Error al obtener la URL del PDF:', error);
    throw new Error('Error al obtener la URL del PDF: ' + error.message);
  }
}