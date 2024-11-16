import { updateGuide } from "@/actions/guide/UpdateGuide";
import { Button, Select, SelectItem } from "@nextui-org/react";
import React from "react";

const couriers = {
  1: "Interna",
  2: "Mercadolibre",
  3: "Noventa9Minutos",
  4: "Fedex",
  5: "Paquetexpress",
  6: "Tres Guerras",
  7: "Estafeta",
  8: "Enviacom - fedex",
  9: "Enviacom - paquetexpress",
  10: "Enviacom - noventa9Minutos",
  11: "Enviacom - estafeta",
};

const FormUpdateGuide = ({ guide }) => {
  const [formData, setFormData] = React.useState({
    id: guide.id || "",
    cost: guide.cost || "",
    guide_pdf: guide.guide_pdf || "",
    date_created: guide.date_created || "",
    couriers: guide.couriers || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    updateGuide(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-400 p-10 rounded-lg">
      <h1 className="text-center text-3xl">Actualizar informacion</h1>
      <div className="m-5">
        <label
          htmlFor="cost"
          className="block text-sm font-medium text-gray-700"
        >
          Cost:
        </label>
        <input
          type="text"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="m-5">
        <label
          htmlFor="guide_pdf"
          className="block text-sm font-medium text-gray-700"
        >
          Guide PDF:
        </label>
        <input
          type="text"
          id="guide_pdf"
          name="guide_pdf"
          value={formData.guide_pdf}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="m-5">
        <label
          htmlFor="couriers"
          className="block text-sm font-medium text-gray-700"
        >
          Couriers:
        </label>
        <Select
          placeholder="Paqueteria"
          id="couriers"
          value={formData.couriers}
          onChange={(e) =>
            handleChange({ target: { name: "couriers", value: e } })
          }
          className="border border-gray-300 bg-white p-2 rounded w-full"
        >
          <SelectItem
            className="bg-white hover:cursor-pointer hover:border-black hover:border-2"
            value=""
          >
            Seleccione Paquetería
          </SelectItem>
          {Object.keys(couriers).map((key) => (
            <SelectItem
              className="bg-white hover:cursor-pointer hover:border-black hover:border-2"
              key={key}
              value={key}
            >
              {couriers[key]}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className=" flex justify-center">
        <Button className="bg-green-400 rounded-lg px-4" type="submit">
          Actualizar
        </Button>
      </div>
    </form>
  );
};

export default FormUpdateGuide;
