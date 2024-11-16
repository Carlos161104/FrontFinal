import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

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

const SerachBar = ({ setListGuides, guides }) => {
  const [saleId, setSaleId] = useState("");
  const [date, setDate] = useState("");
  const [courier, setCourier] = useState("");

  useEffect(() => {
    const newGuides = guides.filter((guide) => {
      console.log(new Date(guide.date_created).toISOString().split('T')[0])
      return (
        (saleId === "" || guide.id === saleId) &&
        (date === "" || new Date(guide.date_created).toISOString().split('T')[0] === date) &&
        (courier === "" || guide.couriers === courier)
      );
    });
    
    setListGuides(newGuides);
  }, [saleId, date, courier]);

  const handleSaleIdChange = (e) => {
    setSaleId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCourierChange = (e) => {
    setCourier(e.target.value);
  };

return (
    <div className="p-3">
        <form>
            <div className="flex flex-row justify-between my-3 ">
                <input
                    placeholder="ID de venta"
                    name="id"
                    required
                    className="border border-gray-300 p-2 rounded w-full mr-3"
                    type="text"
                    id="saleId"
                    value={saleId}
                    onChange={handleSaleIdChange}
                />
                <input
                    type="date"
                    placeholder="Fecha"
                    name="date"
                    required
                    className="border border-gray-300 p-2 rounded"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <Select
                placeholder="Paqueteria "
                id="courier"
                value={courier}
                onChange={(e) => handleCourierChange(e)}
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
        </form>
    </div>
);
};

export default SerachBar;
