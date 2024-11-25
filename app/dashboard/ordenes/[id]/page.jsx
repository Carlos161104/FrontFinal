"use client";

import GetSellsByOrder from "@/actions/orders/GetSellsByOrder";
import React, { useEffect, useState } from "react";
import UniqueOrderCard from "./_components/UniqueOrderCard";
import GetOrderById from "@/actions/orders/GetOrderById";
import { Button } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";
import DeleteOrder from "@/actions/orders/DeleteOrder";
import { useRouter } from "next/navigation";
import ModalUpdateOrder from "./_components/ModalUpdateOrder";
import FormUpdateOrder from "./_components/FormUpdateOrder";

const Page = ({ params }) => {
  const [id, setId] = useState(null);
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const router = useRouter();

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

  

  const handleDelete = async () => {
    await DeleteOrder(id);
    router.push("/dashboard/ordenes");
  };

  return (
    <div className="h-5/6 bg-blue-300 text-center justify-center items-center overflow-y-auto p-10">
      <UniqueOrderCard order={order} products={products} />
      <div className="flex flex-row p-10 justify-center">
        <Button onClick={handleDelete} className="bg-red-500 p-2 mx-5 rounded-lg"><LuTrash className="text-3xl"/></Button>
        <ModalUpdateOrder>
          <FormUpdateOrder order={order} />
        </ModalUpdateOrder>
      </div>
    </div>
  );
};

export default Page;
