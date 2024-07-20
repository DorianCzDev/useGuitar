"use client";

import { useEffect, useState } from "react";
import PlacedOrderOvierview from "./PlacedOrderOvierview";
import PlacedOrderStatus from "./PlacedOrderStatus";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import {
  OrderSummaryNumberSpan,
  OrderSummarySpan,
  OrderSummaryTableFooter,
  OrderSummaryTableHeader,
  OrderSummaryTableRow,
} from "./OrderSummaryUI";
import priceFormater from "../_helpers/priceFormater";

function PlacedOrder({
  order,
}: {
  order: {
    firstName: string;
    lastName: string;
    address: string;
    postCode: string;
    city: string;
    phoneNumber: string;
    country: string;
    _id: string;
    status: string;
    total: number;
    orderItems: {
      name: string;
      image: string;
      price: number;
      quantity: number;
      product: string;
      _id: string;
    }[];
  };
}) {
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

  const { orderItems } = order;
  console.log(orderItems);
  return (
    <>
      <div className="flex gap-7">
        <PlacedOrderOvierview order={order} />
        <PlacedOrderStatus order={order} />
      </div>
      <div className="mt-5">
        <OrderSummaryTableHeader>
          <OrderSummarySpan></OrderSummarySpan>
          <OrderSummarySpan>Name</OrderSummarySpan>
          <OrderSummarySpan>Unit price</OrderSummarySpan>
          <OrderSummarySpan>Amount</OrderSummarySpan>
          <OrderSummarySpan>Total price</OrderSummarySpan>
        </OrderSummaryTableHeader>
        {orderItems.map((item) => (
          <OrderSummaryTableRow key={item._id}>
            <div className=" my-auto px-6 flex justify-center items-center">
              <img
                className="flex w-auto h-auto max-w-10 max-h-[60px] object-cover"
                src={item.image}
              />
            </div>
            <OrderSummarySpan>{item.name}</OrderSummarySpan>
            <OrderSummaryNumberSpan>
              $ {priceFormater(item.price)}
            </OrderSummaryNumberSpan>
            <OrderSummaryNumberSpan>{item.quantity}</OrderSummaryNumberSpan>
            <OrderSummaryNumberSpan>
              $ {priceFormater(item.price * item.quantity)}
            </OrderSummaryNumberSpan>
          </OrderSummaryTableRow>
        ))}
        <OrderSummaryTableFooter>
          <span className="my-auto px-6 font-light text-lg pr-10">
            Total price (with delivery cost):
          </span>
          <span className="my-auto px-6 font-light text-lg pr-6">
            $ {priceFormater(order.total)}
          </span>
        </OrderSummaryTableFooter>
      </div>
    </>
  );
}

export default PlacedOrder;
