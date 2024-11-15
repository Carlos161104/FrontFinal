import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";


const OrderCard = ({ order }) => {
    //Llamada a la api para consultar la address segun el address_id
  return (
    <Card className="bg-white m-5 p-5 rounded-lg">
      <CardHeader>
        <h1>Id: <b>{order.id}</b></h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Id del cliente: <b>{order.client_id}</b></p>
        <p>Monto de la orden: <b>${order.cost}</b></p>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
