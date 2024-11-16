"use client";
import { createGuide } from "@/actions/guide/CreateGuide";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

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

const FormNewGuide = ({ setFlag, setGuideId }) => {
  const [cost, setCost] = useState("");
  const [guidePdf, setGuidePdf] = useState("");
  const [courier, setCourier] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guide = {
      cost: parseFloat(cost),
      guide_pdf: guidePdf,
      couriers: +courier,
    };
    setFlag(true);
    setGuideId(await createGuide(guide));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-center text-4xl p-5">Generar nueva guia</h1>
      <input
        required
        className="border border-gray-300 p-2 rounded w-full my-2"
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        step="0.01"
      />
      <input
        required
        className="border border-gray-300 p-2 rounded w-full my-2"
        type="text"
        placeholder="Guide PDF"
        value={guidePdf}
        onChange={(e) => setGuidePdf(e.target.value)}
      />
      <Select
        placeholder="Paqueteria"
        id="couriers"
        onChange={(e) => setCourier(e.target.value)}
        className="border border-gray-300 bg-white p-2 rounded w-full my-2"
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
      <div className="flex justify-center m-5">
        <Button type="submit" className="p-3 bg-green-400 w-auto rounded-lg">
          Crear guia
        </Button>
      </div>
    </form>
  );
};

export default FormNewGuide;
