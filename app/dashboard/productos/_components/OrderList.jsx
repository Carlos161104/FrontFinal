import Link from "next/link";
import OrderCard from "./OrderCard";

const OrderList = ({ orderList, show }) => {
  return (
    <div>
      <h1 className="w-7/12 flex flex-col items-center justify-center gap-10 text-center text-xl ">
        Listado de ordenes
      </h1>
      {show &&
        orderList.map((order) => {
          return (
            <Link
              key={order.id}
              href={{ pathname: `/dashboard/ordenes/${order.id}` }}
              className="block"
            >
              <OrderCard order={order} />
            </Link>
          );
        })}
    </div>
  );
};

export default OrderList;
