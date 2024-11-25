"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { createAddress } from "@/actions/addresses/CreateAdd";

const FormAddress = () => {
    const [address, setAddress] = useState({
      country: "",
      state: "",
      city: "",
      postal_code: "",
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      comments: "",
      channel_id: "",   // Nuevo campo para channel_id
      client_id: ""     // Nuevo campo para client_id
    });
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createAddress(address);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-blue-300 rounded-md flex flex-col gap-2 p-10 min-w-96"
      >
        <h1 className="text-center text-xl">Información de la dirección</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label className="text-sm">Por favor, complete todos los campos requeridos.</label>
        <input
          required
          label="País"
          value={address.country}
          placeholder="Pais"
          name="country"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Estado"
          value={address.state}
          placeholder="Estado"
          name="state"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Ciudad"
          value={address.city}
          placeholder="Ciudad"
          name="city"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Código Postal"
          value={address.postal_code}
          placeholder="Cadigo Postal"
          name="postal_code"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Dirección Línea 1"
          value={address.address_line_1}
          placeholder="Direccion Linea 1"
          name="address_line_1"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          label="Dirección Línea 2 (opcional)"
          value={address.address_line_2}
          placeholder="Direccion Linea 2 (opcional)"
          name="address_line_2"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          label="Dirección Línea 3 (opcional)"
          value={address.address_line_3}
          placeholder="Dirección Línea 3 (opcional)"
          name="address_line_3"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          label="Comentarios (opcional)"
          value={address.comments}
          placeholder="Comentarios (opcional)"
          name="comments"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Channel ID"
          type="number"
          value={address.channel_id}
          placeholder="Channel ID"
          name="channel_id"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
        <input
          required
          label="Client ID"
          type="number"
          value={address.client_id}
          placeholder="Client ID"
          name="client_id"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mr-3"
        />
  
        <Button className="bg-green-300 rounded-lg" type="submit">
          Crear
        </Button>
      </form>
    );
  };
  
  export default FormAddress;