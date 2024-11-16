"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import ModalClient from "../[id]/_components/ModalClient";
import FormNewClient from "./FormNewClient";
import ModalAddress from "../[id]/_components/ModalAddress";
import FormNewAddress from "./FormNewAddress";
import CreateOrder from "@/actions/orders/CreateOrder";
import ProductForm from "./ProdctForm";

const paymentMethods = [
  { key: "1", value: "1", label: "Efectivo" },
  { key: "2", value: "2", label: "Transferencia" },
  { key: "3", value: "3", label: "Tarjeta de crédito" },
  { key: "4", value: "4", label: "Tarjeta de débito" },
  { key: "5", value: "5", label: "Pagos diferidos" },
];

const salesChannels = [
  { key: "1", value: "1", label: "Mercadolibre" },
  { key: "2", value: "2", label: "Shopify" },
  { key: "3", value: "3", label: "Facebook" },
  { key: "4", value: "4", label: "Instagram" },
  { key: "5", value: "5", label: "Marketplace Facebook" },
  { key: "6", value: "6", label: "Marketplace Instagram" },
  { key: "7", value: "7", label: "Venta directa" },
];

const FormOrder = () => {
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [cost, setCost] = useState("");
  const [salesFunnelId, setSalesFunnelId] = useState("");
  const [clientId, setClientId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [orderPdf, setOrderPdf] = useState("");
  const [cargar, setCargar] = useState(false);
  const [newOrder, setNewOrder] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !cost ||
      !paymentMethodId ||
      !salesFunnelId ||
      !clientId ||
      !addressId
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const orderData = {
      cost,
      payment_method_id: paymentMethodId,
      sales_funnel_id: salesFunnelId,
      client_id: clientId,
      address_id: addressId,
      order_pdf: orderPdf,
    };

    try {
      const result = await CreateOrder(orderData);
      alert("Orden creada exitosamente");
      setNewOrder(result);
      setCargar(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto px-10">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 px-10">
        <h1 className="text-2xl">Crear una nueva orden</h1>
        <Input
          clearable
          underlined
          placeholder="Monto"
          type="number"
          step="0.01"
          required
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="rounded-lg"
        />

        <Select
          label="Canal de venta"
          name="sales_funnel_id"
          className="bg-white rounded-lg"
          onSelectionChange={(keys) => setSalesFunnelId(keys.anchorKey)}
          required
        >
          {salesChannels.map((item) => (
            <SelectItem
              key={item.key}
              value={item.value}
              className="bg-white rounded-lg hover:cursor-pointer"
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Método de pago"
          name="payment_method_id"
          className="bg-white rounded-lg"
          onSelectionChange={(keys) => setPaymentMethodId(keys.anchorKey)}
          required
        >
          {paymentMethods.map((item) => (
            <SelectItem
              key={item.key}
              value={item.value}
              className="bg-white rounded-lg hover:cursor-pointer"
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <div className="flex flex-row justify-between items-end">
          <Input
            clearable
            underlined
            placeholder="Id del cliente"
            type="number"
            required
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="rounded-lg"
          />

          <ModalClient>
            <FormNewClient />
          </ModalClient>
        </div>

        <div className="flex flex-row justify-between items-end">
          <Input
            clearable
            underlined
            placeholder="Id de la dirección"
            type="number"
            required
            value={addressId}
            onChange={(e) => setAddressId(e.target.value)}
            className="rounded-lg"
          />
          <ModalAddress>
            <FormNewAddress />
          </ModalAddress>
        </div>

        <Input
          clearable
          underlined
          placeholder="Link documentación"
          type="text"
          value={orderPdf}
          onChange={(e) => setOrderPdf(e.target.value)}
          className="rounded-lg"
        />

        <Button type="submit" className="bg-green-500">
          Submit
        </Button>
      </form>
      <div className="py-14">
        <ProductForm
          newOrder={newOrder}
          cargar={cargar}
          className="my-10"
        />
      </div>
    </div>
  );
};

export default FormOrder;
