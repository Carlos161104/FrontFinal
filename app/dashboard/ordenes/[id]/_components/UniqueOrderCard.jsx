import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import ModalClient from "./ModalClient";
import FormClient from "./FormClient";
import FormAddress from "./FormAddress";
import ModalAddress from "./ModalAddress";

const UniqueOrderCard = ({ order, products }) => {
  const clientid = order.client_id;
  const addid = order.address_id;

  return (
    <Card className="bg-white rounded-lg p-10">
      <CardHeader className="text-center text-xl font-bold">
        <h1>Id: {order.id}</h1>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg text-left py-2 px-5 flex-row">
        <div>
          <p>
            Monto: <b>${order.cost}</b>
          </p>
          <p>
            Metodo de pago: <b>{order.payment_method_id}</b>
          </p>
          <p>
            Canal de venta: <b>{order.sales_funnel_id}</b>
          </p>
          <Link
            href={order.order_pdf}
            className="underline hover:text-blue-500"
          >
            Desgloce de orden
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="p-5">
            <ModalClient>
              <FormClient clientid={clientid} />
            </ModalClient>
          </div>
          <div className="p-5">
            <ModalAddress>
              <FormAddress addid={addid} />
            </ModalAddress>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <div>
            <strong>ID</strong>
            {products.map((product) => (
              <div key={product.id}>{product.id}</div>
            ))}
          </div>
          <div>
            <strong>Cantidad</strong>
            {products.map((product) => (
              <div key={product.id}>{product.quantity}</div>
            ))}
          </div>
          <div>
            <strong>Cantidad Pendiente</strong>
            {products.map((product) => (
              <div key={product.id}>{product.pendingQuantity}</div>
            ))}
          </div>
          <div>
            <strong>Nombre del producto</strong>
            {products.map((product) => (
              <div key={product.id}>{product.productName}</div>
            ))}
          </div>
          <div>
            <strong>Precio</strong>
            {products.map((product) => (
              <div key={product.id}>{product.productPrice}</div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UniqueOrderCard;
