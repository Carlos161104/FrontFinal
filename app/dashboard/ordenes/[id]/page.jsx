"use client";

import GetSellsByOrder from "@/actions/orders/GetSellsByOrder";
import React, { useEffect, useState } from "react";
import UniqueOrderCard from "./_components/UniqueOrderCard";
import GetOrderById from "@/actions/orders/GetOrderById";

const Page = ({ params }) => {
  const [id, setId] = useState(null);
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      const sells = await GetSellsByOrder(+resolvedParams.id);
      setProducts(sells);

      const orderData = await GetOrderById(resolvedParams.id);
      setOrder(orderData);
    };

    fetchData();
  }, [params]);

  if (id === null) {
    return <div>Loading...</div>;
  }


  return (
    <div className="h-screen bg-blue-300 text-center justify-center items-center p-10">
      <UniqueOrderCard order={order} products={products} />
    </div>
  );
};

export default Page;
