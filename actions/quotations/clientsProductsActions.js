'use server'

import { API_URL } from "@/constants";

// Obtener clientes
export async function fetchClients(searchTerm = '') {
  'use server'
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);

    const response = await fetch(`${API_URL}/clients?${params}`, {
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
    console.error('Error fetching clients:', error);
    throw new Error('Error al cargar los clientes: ' + error.message);
  }
}

// Crear nuevo cliente
export async function createClient(clientData) {
  'use server'
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(clientData),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Error al crear el cliente: ' + error.message);
  }
}

// Obtener productos
export async function fetchProducts(searchTerm = '') {
  'use server'
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);

    const response = await fetch(`${API_URL}/products?${params}`, {
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
    console.error('Error fetching products:', error);
    throw new Error('Error al cargar los productos: ' + error.message);
  }
}