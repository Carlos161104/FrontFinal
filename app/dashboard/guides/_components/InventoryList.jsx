"use client";

import { createTrackInventories } from "@/actions/trakinventory/CreateInventories";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

const InventoryList = ({ guideId, flag }) => {
console.log(guideId)
  const [items, setItems] = useState([
    { quantity: "", guide_id: "", inventory_id: "" },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardar los datos en el arreglo data
    const data = items.map((item) => ({
      quantity: item.quantity,
      guide_id: +guideId,
      inventory_id: +item.inventory_id,
    }));
    createTrackInventories(data)
    // Aquí puedes enviar el formulario
  };

  const addItem = () => {
    setItems([...items, { quantity: "", guide_id: "", inventory_id: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="items-center space-y-4 justify-center overflow-y-auto my-5">
        <h1 className="text-center text-xl">Listado de productos</h1>
        {items.map((item, index) => (
          <div key={index} className="flex justify-center space-x-4 mb-2">
            <input
              type="text"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Cantidad"
              required
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              name="inventory_id"
              value={item.inventory_id}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Id del inventario"
              required
              className="border border-gray-300 p-2 rounded"
            />
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
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-green-400 p-3 rounded-lg"
          >
            Cargar track
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InventoryList;
