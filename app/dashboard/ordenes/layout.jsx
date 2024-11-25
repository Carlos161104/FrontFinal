"use client";
import React, { useState, useEffect } from "react";
import FoundOrder from "./_components/FoundOrder";
import OrderList from "./_components/OrderList";
import { API_URL } from "@/constants";

const layoutOrders = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${API_URL}/orders`);
      const orders = await response.json();
      setOrderList(orders);
      setOrders(orders);
    };

    fetchOrders();
  }, []);

  // Aqui lo que se tiene que hacer son las peticiones a la API para obtener las ordenes
  return (
    <div className="flex flex-row h-full w-[92vw]">
      {/* Primer div: 4/12 del espacio */}
      <div className="w-4/12 h-[90vh] max-h-[90vh] overflow-hidden px-5 overflow-y-auto bg-blue-400">
        <OrderList orderList={orderList} show={show} />
      </div>
      {/* Segundo div: 7/12 del espacio restante */}
      <div className="w-8/12 flex flex-col"> 
        <div className="h-1/6 bg-blue-400 text-black p-10">
          <FoundOrder
            orders={orders}
            setOrderList={setOrderList}
            setShow={setShow}
          />
        </div>
        {/* Eliminado el gap-10 y ajustado para que no haya espacio */}
        <div className="h-5/6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default layoutOrders;
