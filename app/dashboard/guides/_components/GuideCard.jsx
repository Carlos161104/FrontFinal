import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

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

const GuideCard = ({ guide }) => {
  return (
    <Card className="bg-white m-5 p-5 rounded-lg hover:bg-gray-100 transition-transform">
      <CardHeader>
        <h1>
          Id: <b>{guide.id}</b>
        </h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          Fecha: <b>{guide.date_created}</b>
        </p>
        <p>
          Paqueteria: <b>{couriers[guide.couriers]}</b>
        </p>
      </CardBody>
    </Card>
  );
};

export default GuideCard;
