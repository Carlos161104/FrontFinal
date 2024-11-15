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
        <Input
          required
          label="País"
          value={address.country}
          placeholder="Ej. México"
          name="country"
          onChange={handleChange}
        />
        <Input
          required
          label="Estado"
          value={address.state}
          placeholder="Ej. Jalisco"
          name="state"
          onChange={handleChange}
        />
        <Input
          required
          label="Ciudad"
          value={address.city}
          placeholder="Ej. Guadalajara"
          name="city"
          onChange={handleChange}
        />
        <Input
          required
          label="Código Postal"
          value={address.postal_code}
          placeholder="Ej. 44100"
          name="postal_code"
          onChange={handleChange}
        />
        <Input
          required
          label="Dirección Línea 1"
          value={address.address_line_1}
          placeholder="Ej. Calle 123"
          name="address_line_1"
          onChange={handleChange}
        />
        <Input
          label="Dirección Línea 2 (opcional)"
          value={address.address_line_2}
          placeholder="Ej. Apartamento 4B"
          name="address_line_2"
          onChange={handleChange}
        />
        <Input
          label="Dirección Línea 3 (opcional)"
          value={address.address_line_3}
          placeholder="Ej. Edificio A"
          name="address_line_3"
          onChange={handleChange}
        />
        <Input
          label="Comentarios (opcional)"
          value={address.comments}
          placeholder="Ej. Entregar en la puerta"
          name="comments"
          onChange={handleChange}
        />
        <Input
          required
          label="Channel ID"
          type="number"
          value={address.channel_id}
          placeholder="Ej. 1"
          name="channel_id"
          onChange={handleChange}
        />
        <Input
          required
          label="Client ID"
          type="number"
          value={address.client_id}
          placeholder="Ej. 123"
          name="client_id"
          onChange={handleChange}
        />
  
        <Button className="bg-green-300 rounded-lg" type="submit">
          Crear
        </Button>
      </form>
    );
  };
  
  export default FormAddress;