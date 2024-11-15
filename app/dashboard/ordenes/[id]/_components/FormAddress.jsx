"use client";

import React, { useEffect, useState } from "react";
import fetchAddress from "@/actions/addresses/GetAddressById";
import UpdateAddress from "@/actions/addresses/UpdateAddress";
import { Button, Input } from "@nextui-org/react";

const FormAddress = ({ addid }) => {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAddressData = async () => {
      try {
        const addressData = await fetchAddress(addid);
        setAddress(addressData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAddressData();
  }, [addid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UpdateAddress(address);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-300 rounded-md flex flex-col gap-2 p-10 min-w-96"
    >
      <h1 className="text-center text-xl">Información de la dirección</h1>
      <Input
        required
        label="País"
        value={address.country || ""}
        placeholder="Ej. México"
        name="country"
        onChange={handleChange}
      />
      <Input
        required
        label="Estado"
        value={address.state || ""}
        placeholder="Ej. Jalisco"
        name="state"
        onChange={handleChange}
      />
      <Input
        required
        label="Ciudad"
        value={address.city || ""}
        placeholder="Ej. Guadalajara"
        name="city"
        onChange={handleChange}
      />
      <Input
        required
        label="Código Postal"
        value={address.postal_code || ""}
        placeholder="Ej. 44100"
        name="postal_code"
        onChange={handleChange}
      />
      <Input
        required
        label="Dirección Línea 1"
        value={address.address_line_1 || ""}
        placeholder="Ej. Calle 123"
        name="address_line_1"
        onChange={handleChange}
      />
      <Input
        label="Dirección Línea 2 (opcional)"
        value={address.address_line_2 || ""}
        placeholder="Ej. Apartamento 4B"
        name="address_line_2"
        onChange={handleChange}
      />
      <Input
        label="Dirección Línea 3 (opcional)"
        value={address.address_line_3 || ""}
        placeholder="Ej. Edificio A"
        name="address_line_3"
        onChange={handleChange}
      />
      <Input
        label="Comentarios (opcional)"
        value={address.comments || ""}
        placeholder="Ej. Entregar en la puerta"
        name="comments"
        onChange={handleChange}
      />

      <Button className="bg-green-300 rounded-lg" type="submit">
        Actualizar
      </Button>
    </form>
  );
};

export default FormAddress;
