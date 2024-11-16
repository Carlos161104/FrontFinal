"use client";
import React, { useEffect, useState } from "react";
import { LuPlus, LuMinus } from "react-icons/lu";
import { API_URL } from "@/constants";
import { Button } from "@nextui-org/react";

const updateSells = async (sells) => {
  try {
    const response = await fetch(`${API_URL}/sells`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sells),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar las ventas:', error);
    throw error;
  }
};

const FormUpdateSells = ({ orderId, cargar }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchSells = async () => {
      try {
        const response = await fetch(`${API_URL}/sells`);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const sells = await response.json();
        const filteredSells = sells.filter(sell => sell.order_id === orderId);
        setItems(filteredSells);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchSells();
  }, [orderId]);

  useEffect(() => {
    const fetchProductNames = async () => {
      const newItems = await Promise.all(items.map(async (item) => {
        if (item.product_id) {
          try {
            const response = await fetch(`${API_URL}/products/${item.product_id}`);
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            const product = await response.json();
            return { ...item, name: product.name };
          } catch (error) {
            console.error(`Error al obtener el nombre del producto ${item.product_id}:`, error);
            return item;
          }
        }
        return item;
      }));
      setItems(newItems);
    };

    fetchProductNames();
  }, [items]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { id: "", quantity: "", name: "", product_id: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      await updateSells(items);
    } catch (error) {
      console.error('Error al actualizar las ventas');
    }
  };

  return (
    <div className="py-5">
        <h1 className="text-center text-2xl">Lista de productos</h1>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            name="product_id"
            value={item.product_id}
            onChange={(e) => handleChange(index, e)}
            placeholder="ID del producto"
            required
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleChange(index, e)}
            placeholder="Cantidad"
            required
            className="border border-gray-300 p-2 rounded"
          />
          <span className="border border-gray-300 p-2 rounded w-48 text-center">
            {item.name || "Articulo"}
          </span>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-red-500 hover:bg-red-100 p-2 rounded"
          >
            <LuMinus />
          </button>
          <button
            type="button"
            onClick={addItem}
            className="text-blue-500 hover:bg-blue-100 p-2 rounded"
          >
            <LuPlus />
          </button>
        </div>
      ))}
      <Button
        disabled={!cargar}
        onPress={handleSubmit}
        className="bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
      >
        Cargar productos
      </Button>
    </div>
  );
};

export default FormUpdateSells;
