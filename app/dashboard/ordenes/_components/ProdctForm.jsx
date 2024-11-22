import createSells from "@/actions/sells/CreateSells";
import { API_URL } from "@/constants";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu"; // Asegúrate de instalar react-icons
import { LuMinus } from "react-icons/lu"; // Importa el icono de menos

const ProductForm = ({ newOrder, cargar }) => {
  const [disabled, setDisabled] = useState(false);
  const [items, setItems] = useState([
    {
      id: "",
      quantity: "",
      name: "",
    },
  ]);

  useEffect(() => {
    if (items.length === 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [items]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    // Si cambia el ID, realiza la búsqueda
    if (name === "id") {
      // Solo hacer la búsqueda si el ID no está vacío
      if (value) {
        fetch(`${API_URL}/products/${value}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data && data.data && data.data.name) {
              newItems[index].name = data.data.name; // Acceder al nombre dentro de 'data'
            } else {
              newItems[index].name = "";
            }
            setItems(newItems);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            newItems[index].name = ""; // Resetear nombre en caso de error
            setItems(newItems);
          });
      } else {
        newItems[index].name = ""; // Resetear nombre si el ID está vacío
        setItems(newItems);
      }
    } else {
      setItems(newItems);
    }
  };

  const addItem = () => {
    setItems([...items, { id: "", quantity: "", name: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de datos a la API
    createSells(items, newOrder);
  };

  return (
    <div className="space-y-4 my-10">
      <h1 className="text-center text-xl">Listado de productos</h1>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            name="id"
            value={item.id}
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
        disabled={!cargar}
        onPress={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Cargar productos
      </Button>
    </div>
  );
};

export default ProductForm;
