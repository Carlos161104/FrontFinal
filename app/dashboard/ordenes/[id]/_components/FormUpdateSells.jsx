import React, { useState, useEffect } from "react";
import updateSells from "@/actions/sells/UpdateSells";
import { API_URL } from "@/constants";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Button } from "@nextui-org/react";

const FormUpdateSells = ({ newOrder }) => {
  const [disabled, setDisabled] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length === 1) setDisabled(true);
    else if (items.length > 1) setDisabled(false);
  }, [items]);

  useEffect(() => {
    const fetchSells = async () => {
      try {
        const response = await fetch(`${API_URL}/sells`);
        const sells = await response.json();
        const filteredSells = sells.filter(
          (sell) => sell.order_id === newOrder.id
        );

        const detailedSells = await Promise.all(
          filteredSells.map(async (sell) => {
            const productResponse = await fetch(
              `${API_URL}/products/${sell.product_id}`
            );
            const productData = await productResponse.json();
            const product = productData.data;

            return {
              id: sell.id,
              quantity: sell.quantity,
              name: product.name,
              product_id: sell.product_id,
              order_id: sell.order_id,
              pending_quantity: sell.pending_quantity,
            };
          })
        );

        setItems(detailedSells);
      } catch (error) {
        console.error("Error fetching sells:", error);
      }
    };

    fetchSells();
  }, [newOrder.id]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "product_id" && value) {
      fetch(`${API_URL}/products/${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.data && data.data.name) {
            newItems[index].name = data.data.name;
          } else {
            newItems[index].name = "";
          }
          setItems(newItems);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          newItems[index].name = "";
          setItems(newItems);
        });
    } else {
      setItems(newItems);
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  
  const addItem = () => {
    setItems([...items, { id: "", quantity: "", name: "" }]);
  };

  const handleSubmit = () => {
    updateSells(items);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-center text-xl">Listado de productos</h1>
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
            disabled={disabled}
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
        onPress={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Editar lista
      </Button>
    </div>
  );
};

export default FormUpdateSells;
