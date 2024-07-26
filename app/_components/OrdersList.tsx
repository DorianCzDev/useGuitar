"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import priceFormater from "../_helpers/priceFormater";
import useAuth from "../_hooks/useAuth";
import { ChildrenOnlyProps, UserDataType } from "../_types/types";
import Spinner from "./Spinner";

type OrderType = {
  _id: string;
  total: number;
  status:
    | "waiting for payment"
    | "waiting for shipment"
    | "send"
    | "delivered"
    | "canceled";
  createdAt: string;
};

function OrdersList({ orders }: { orders: OrderType[] }) {
  const [isLoading, setLoading] = useState(true);
  const data: UserDataType | null = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data?.status !== 200 || data?.user) {
    router.push("/login");
  }

  return (
    <div className="w-[1200px] lg:w-full">
      <OrdersListTableHeader>
        <span className="flex items-center justify-center lg:hidden">
          order id
        </span>
        <OrdersListSpan>total price</OrdersListSpan>
        <OrdersListSpan>status</OrdersListSpan>
        <OrdersListSpan>order accepted</OrdersListSpan>
      </OrdersListTableHeader>
      {orders.map((order: OrderType) => (
        <Link key={order._id} href={`order/${order._id}`}>
          <OrdersListTableRow>
            <span className="flex items-center justify-center lg:hidden">
              {order._id}
            </span>
            <OrdersListSpan>$ {priceFormater(order.total)}</OrdersListSpan>
            <OrdersListSpan>{order.status}</OrdersListSpan>
            <OrdersListSpan>{order.createdAt.split("T")[0]}</OrdersListSpan>
          </OrdersListTableRow>
        </Link>
      ))}
    </div>
  );
}

export default OrdersList;

function OrdersListTableHeader({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[1fr_200px_200px_240px] mx-auto min-w-[800px] w-[940px] text-xl tracking-wider font-light uppercase border-b border-primary-700 py-2 pr-2 lg:grid-cols-[1fr_1fr_1fr] lg:min-w-fit lg:w-fit">
      {children}
    </div>
  );
}

function OrdersListTableRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[1fr_200px_200px_240px] mx-auto min-w-[800px] w-[940px] tracking-wide py-6 pr-2 border-b border-primary-700 transition-all hover:bg-primary-500 font-bold lg:grid-cols-[1fr_1fr_1fr] lg:min-w-fit lg:w-fit">
      {children}
    </div>
  );
}

function OrdersListSpan({ children }: ChildrenOnlyProps) {
  return <span className="flex items-center justify-center">{children}</span>;
}
