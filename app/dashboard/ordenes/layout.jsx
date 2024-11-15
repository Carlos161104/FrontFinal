"use client";
import React, { useState, useEffect } from "react";
import FoundOrder from "./_components/FoundOrder";
import OrderList from "./_components/OrderList";
import { API_URL } from "@/constants";

const layoutOrders = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${API_URL}/orders`);
      const orders = await response.json();
      setOrderList(orders);
      setOrders(orders)
    };

    fetchOrders();
  }, []);

  // Aqui lo que se tiene que hacer son las peticiones a la API para obtener las ordenes
  return (
    <div className="flex flex-row h-full ">
      <div className="w-1/4 g-blue-400">
        <OrderList orderList={orderList} show={show} />
      </div>
      <div className="w-3/4 flex flex-col h-full">
        <div className="h-1/8 w-full  overflow-hidden bg-blue-400 text-black p-10 ">
          <FoundOrder
            orders={orders}
            setOrderList={setOrderList}
            setShow={setShow}
          />
        </div>
        <div className="h-7/8 w-3/4 ">
          {/* Contenido del children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default layoutOrders;
