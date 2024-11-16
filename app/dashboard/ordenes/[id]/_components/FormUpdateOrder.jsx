"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import ModalClient from "./ModalClient";
import ModalAddress from "./ModalAddress";
import FormNewClient from "../../_components/FormNewClient";
import FormAddress from "../../_components/FormNewAddress";
import updateOrder from "@/actions/orders/UpdateOrder";
import FormUpdateSells from "./FormUpdateSells";

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

const FormUpdateOrder = ({ order }) => {
  const [paymentMethodId, setPaymentMethodId] = useState(order.payment_method_id || "");
  const [cost, setCost] = useState(order.cost || "");
  const [salesFunnelId, setSalesFunnelId] = useState(order.sales_funnel_id || "");
  const [clientId, setClientId] = useState(order.client_id || "");
  const [addressId, setAddressId] = useState(order.address_id || "");
  const [orderPdf, setOrderPdf] = useState(order.order_pdf || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!cost || !paymentMethodId || !salesFunnelId || !clientId || !addressId) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const orderData = {
      id: order.id,
      cost,
      payment_method_id: paymentMethodId,
      sales_funnel_id: salesFunnelId,
      client_id: clientId,
      address_id: addressId,
      order_pdf: orderPdf,
    };
    updateOrder(orderData);
    
  };
  const orderId = order.id

  return (
    <div className="overflow-auto p-10 bg-blue-700 rounded-lg ">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 px-10">
        <h1 className="text-2xl text-center">Actualizar orden</h1>
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
          value={salesFunnelId}
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
          value={paymentMethodId}
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
            className="rounded-lg w-40"
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
            className="rounded-lg w-40"
          />
          <ModalAddress>
            <FormAddress />
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
        <div className="flex justify-center">
        <Button type="submit" className="bg-green-500 rounded-lg">
          Submit
        </Button>
        </div>
      </form>
      <FormUpdateSells orderId={orderId} />
    </div>
  );
};

export default FormUpdateOrder;
