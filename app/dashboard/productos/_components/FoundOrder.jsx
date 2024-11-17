"use client";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

const FoundOrder = ({ orders, setOrderList, setShow }) => {
  const [order, setOrder] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    let filteredOrders = orders;

    if (order) {
      filteredOrders = filteredOrders.filter(item => 
        item.id.toString().includes(order)
      );
    }

    if (client) {
      filteredOrders = filteredOrders.filter(item => 
        item.client_id.toString().includes(client)
      );
    }
    
    setShow(filteredOrders.length > 0);
    setOrderList(filteredOrders);
  }, [order, client]); // Solo estas dependencias

  return (
    <div>
      <div className="flex flex-row items-center space-x-8 px-4 justify-center">
        <Input
          autoFocus={true}
          label="ID de orden"
          type="number"
          className="w-3/8 rounded-lg"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
          placeholder="Ej.1"
        />
        <Input
          autoFocus={true}
          label="ID del cliente"
          type="number"
          className="w-3/8"
          onChange={(e) => {
            setClient(e.target.value);
          }}
          placeholder="Ej.5"
        />
      </div>
    </div>
  );
};

export default FoundOrder;
