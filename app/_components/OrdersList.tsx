"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { ChildrenOnlyProps } from "../_types/types";
import Link from "next/link";
import priceFormater from "../_helpers/priceFormater";

function OrdersList({ orders }: { orders: [] }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  if (data.status !== 200) {
    return router.push("/login");
  }
  console.log(orders);
  return (
    <div className="w-[1200px]">
      <OrdersListTableHeader>
        <OrdersListSpan>order id</OrdersListSpan>
        <OrdersListSpan>total price</OrdersListSpan>
        <OrdersListSpan>status</OrdersListSpan>
        <OrdersListSpan>order accepted</OrdersListSpan>
      </OrdersListTableHeader>
      {orders.map(
        (order: {
          _id: string;
          total: number;
          status:
            | "waiting for payment"
            | "waiting for shipment"
            | "send"
            | "delivered"
            | "canceled";
          createdAt: string;
        }) => (
          <Link key={order._id} href={`order/${order._id}`}>
            <OrdersListTableRow>
              <OrdersListSpan>{order._id}</OrdersListSpan>
              <OrdersListSpan>$ {priceFormater(order.total)}</OrdersListSpan>
              <OrdersListSpan>{order.status}</OrdersListSpan>
              <OrdersListSpan>{order.createdAt.split("T")[0]}</OrdersListSpan>
            </OrdersListTableRow>
          </Link>
        )
      )}
    </div>
  );
}

export default OrdersList;

function OrdersListTableHeader({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[1fr_200px_200px_240px] mx-auto min-w-[800px] w-[940px] text-xl tracking-wider font-light uppercase border-b border-primary-700 py-2 pr-2">
      {children}
    </div>
  );
}

function OrdersListTableRow({ children }: ChildrenOnlyProps) {
  return (
    <div className="grid grid-cols-[1fr_200px_200px_240px] mx-auto min-w-[800px] w-[940px] tracking-wide py-6 pr-2 border-b border-primary-700 transition-all hover:bg-primary-500 font-bold">
      {children}
    </div>
  );
}

function OrdersListSpan({ children }: ChildrenOnlyProps) {
  return <span className="flex items-center justify-center">{children}</span>;
}
