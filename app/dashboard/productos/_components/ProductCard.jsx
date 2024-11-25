import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";


const ProductCard = ({ product }) => {
    //Llamada a la api para consultar la address segun el address_id
  return (
    <Card className="bg-white m-5 p-5 rounded-lg hover:bg-gray-100 transition-transform">
      <CardHeader>
        <h1>Id: <b>{product.id}</b></h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Id del cliente: <b>{product.name}</b></p>
        <p>Monto de la orden: <b>${product.price}</b></p>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
