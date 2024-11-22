"use client";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

const FoundOrder = ({ orders, setOrderList, setShow }) => {
  const [isFocusedID, setIsFocusedID] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [order, setOrder] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    let filteredOrders = orders;

    if (order) {
      filteredOrders = filteredOrders.filter((item) =>
        item.id.toString().includes(order)
      );
    }

    if (client) {
      filteredOrders = filteredOrders.filter((item) =>
        item.client_id.toString().includes(client)
      );
    }

    setShow(filteredOrders.length > 0);
    setOrderList(filteredOrders);
  }, [order, client]); // Solo estas dependencias

  return (
    <div>
      <div className="flex flex-row items-center space-x-8 px-4 justify-center">
        <div className="relative">
          <label
            htmlFor="IDorder"
            className={`absolute left-2 transition-all duration-200 ${
              isFocused || order
                ? "-top-4 text-xs"
                : "top-2 text-base"
            }`}
          >
            ID de orden
          </label>
          <input
            id="IDOrder"
            name="IDOrder"
            placeholder={isFocused ? "Ej. 1" : ""}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="border border-gray-300 p-2 mb-5 rounded w-full w-3/8"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="IDClient"
            className={`absolute left-2 transition-all duration-200 ${
              isFocusedID || client
                ? "-top-4 text-xs"
                : "top-2 text-base"
            }`}
          >
            ID del cliente
          </label>
          <input
            id="IDCLient"
            name="IDCLient"
            placeholder={isFocusedID ? "Ej. 1" : ""}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            onFocus={() => setIsFocusedID(true)}
            onBlur={() => setIsFocusedID(false)}
            className="border border-gray-300 p-2 mb-5 rounded w-full w-3/8"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FoundOrder;
