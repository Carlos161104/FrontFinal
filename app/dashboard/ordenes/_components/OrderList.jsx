import OrderCard from "./OrderCard";

const OrderList = ({ orderList, show }) => {
  return (
    <div className="g-blue-400">
      <h1 className="text-center text-xl py-10">Listado de ordenes</h1>
      {show &&
        orderList.map((order) => {
          console.log(order);
          return <OrderCard key={order.id} order={order} />;
        })}
    </div>
  );
};

export default OrderList;
