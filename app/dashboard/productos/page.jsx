"use client";
import React, { useState, useEffect } from "react";
import FoundOrder from "./_components/FoundOrder";
import OrderList from "./_components/OrderList";
import { API_URL } from "@/constants"

export default function ProductsPage() {

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
        <div className="flex flex-col w-11/12">
            <div className="w-8/12 flex flex-col">
                <div className="h-1/12 bg-blue-400 text-black w-[100vw]">
                    <FoundOrder
                        orders={orders}
                        setOrderList={setOrderList}
                        setShow={setShow}
                    />
                </div>
            </div>
            {/* Primer div: 4/12 del espacio */}
            <div className="w-4/12 h-[80vh] max-h-[90vh] overflow-hidden px-5 overflow-y-auto bg-blue-400">
                <OrderList orderList={orderList} show={show} />
            </div>

        </div>
    );

}