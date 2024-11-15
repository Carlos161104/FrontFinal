"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ModalClient from "./ModalClient";

const UniqueOrderCard = ({ order, products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card className="bg-white rounded-lg p-10">
      <CardHeader className="text-center text-xl font-bold">
        <h1>Id: {order.id}</h1>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg text-left py-2 px-5">
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
        <div>
          <Button onClick={onOpen}>Open Modal</Button>
          
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
