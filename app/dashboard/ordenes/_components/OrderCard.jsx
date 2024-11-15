import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";


const OrderCard = ({ order }) => {
    //Llamada a la api para consultar la address segun el address_id
  return (
    <Card>
      <CardHeader>
        {order.id}
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Id del cliente: {order.client_id}</p>
        <p>Monto de la orden: ${order.cost}</p>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
