"use client";

import React, { useState } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { createClient } from "@/actions/clients/CreateClient";

const salesFunnels = {
  1: "Mercadolibre",
  2: "Shopify",
  3: "Facebook",
  4: "Instagram",
  5: "Marketplace Facebook",
  6: "Marketplace Instagram",
  7: "Venta directa",
};

const FormNewClient = () => {
  const [client, setClient] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedKeys) => {
    setClient((prevClient) => ({
      ...prevClient,
      sales_funnel_id: selectedKeys.anchorKey,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClient(client);
      alert("Cliente creado exitosamente");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-300 rounded-md flex flex-col flex-grow-0 gap-2 p-10 min-w-96"
    >
      <h1 className="text-center text-xl">Crear nuevo cliente</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        required={true}
        isRequired
        label="Nombre"
        value={client.name || ""}
        placeholder="Nombre"
        name="name"
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full mr-3"
      />
      <input
        required={true}
        className="border border-gray-300 p-2 rounded w-full mr-3"
        isRequired
        label="Apellido"
        value={client.last_name || ""}
        placeholder="Apellido"
        name="last_name"
        onChange={handleChange}
      />
      <input
      className="border border-gray-300 p-2 rounded w-full mr-3"
        required={true}
        label="Email"
        value={client.email || ""}
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
      className="border border-gray-300 p-2 rounded w-full mr-3"
        required={true}
        label="Telefono"
        value={client.phone || ""}
        placeholder="Telefono"
        name="phone"
        onChange={handleChange}
      />
      <input
      className="border border-gray-300 p-2 rounded w-full mr-3"
        required={true}
        label="Compañia"
        value={client.company || ""}
        placeholder="Compañia"
        name="company"
        onChange={handleChange}
      />
      <Select
        placeholder="Canal de venta"
        name="sales_funnel_id"
        selectedKeys={client.sales_funnel_id ? [client.sales_funnel_id] : []}
        onSelectionChange={handleSelectChange}
        className="bg-white rounded-lg p-3"
      >
        {Object.entries(salesFunnels).map(([key, value]) => (
          <SelectItem
            key={key}
            className="bg-white rounded-lg hover:cursor-pointer"
          >
            {value}
          </SelectItem>
        ))}
      </Select>

      <Button className="bg-green-300 rounded-lg" type="submit">
        Crear
      </Button>
    </form>
  );
};

export default FormNewClient;
