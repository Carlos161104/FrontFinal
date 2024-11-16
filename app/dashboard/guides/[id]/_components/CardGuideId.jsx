import { API_URL } from "@/constants";
import { Card, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const CardGuideId = ({ guide, track, setTrack }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/trackinventory`);
      const data = await response.json();
      const filteredData = data.filter((item) => item.guide_id === guide.id);
      setTrack(filteredData);
    };
    fetchData();
  }, []);
  return (
    <Card className="bg-white rounded-lg p-5 m-10">
      <h1 className="text-4xl text-center p-5">Informacion de la guia</h1>
      <CardHeader>
        <h1 className="text-2xl">
          Id: <b>{guide.id}</b>
        </h1>
      </CardHeader>
      <Divider />
      <CardHeader className="p-5 justify-around ">
        <div>
          <p>
            Costo: <b>${guide.cost}</b>
          </p>
          <p>
            Fecha: <b>{guide.date_created}</b>
          </p>
          <Link href={guide.guide_pdf} legacyBehavior>
            <a className="text-blue-500 underline">Ver PDF de la guía</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <p>Paqueteria:</p>{" "}
          <b className="text-2xl">{couriers[guide.couriers]}</b>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className="flex flex-col">
        <h1 className="text-3xl">Paquetes</h1>
        <div className="flex justify-between w-full p-5 mx-20 overflow-y-auto">
          <div className="text-center">
            <strong>ID</strong>
            {track.map((track) => {
              return <div key={track.id}>{track.id}</div>;
            })}
          </div>
          <div className="text-center">
            <strong>Cantidad</strong>
            {track.map((track) => {
              return <div key={track.id}>{track.quantity}</div>;
            })}
          </div>
          <div className="text-center">
            <strong>Inventario Id</strong>
            {track.map((track) => {
              return <div key={track.id}>{track.inventory_id}</div>;
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardGuideId;
