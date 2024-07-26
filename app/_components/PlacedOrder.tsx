"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import priceFormater from "../_helpers/priceFormater";
import useAuth from "../_hooks/useAuth";
import {
  OrderSummaryNumberSpan,
  OrderSummarySpan,
  OrderSummaryTableFooter,
  OrderSummaryTableHeader,
  OrderSummaryTableRow,
} from "./OrderSummaryUI";
import PlacedOrderOvierview from "./PlacedOrderOvierview";
import PlacedOrderStatus from "./PlacedOrderStatus";
import Spinner from "./Spinner";
import { UserDataType } from "../_types/types";

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
  const [isLoading, setLoading] = useState(true);
  const data: UserDataType | null = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data?.status !== 200 || data?.user) {
    router.push("/login");
  }

  const { orderItems } = order;

  return (
    <>
      <div className="flex gap-7 md:block">
        <PlacedOrderOvierview order={order} />
        <PlacedOrderStatus order={order} />
      </div>
      <div className="mt-5">
        <OrderSummaryTableHeader>
          <span className=" my-auto px-6 font-light text-lg md:hidden"></span>
          <OrderSummarySpan>Name</OrderSummarySpan>
          <OrderSummarySpan>Unit price</OrderSummarySpan>
          <OrderSummarySpan>Amount</OrderSummarySpan>
          <OrderSummarySpan>Total price</OrderSummarySpan>
        </OrderSummaryTableHeader>
        {orderItems.map((item) => (
          <OrderSummaryTableRow key={item._id}>
            <div className=" my-auto px-6 flex justify-center items-center md:hidden">
              <img
                className="flex w-auto h-auto max-w-10 max-h-[60px] object-cover"
                src={item.image}
              />
            </div>
            <OrderSummarySpan>{item.name}</OrderSummarySpan>
            <OrderSummaryNumberSpan>
              {priceFormater(item.price)}
            </OrderSummaryNumberSpan>
            <OrderSummaryNumberSpan>{item.quantity}</OrderSummaryNumberSpan>
            <OrderSummaryNumberSpan>
              {priceFormater(item.price * item.quantity)}
            </OrderSummaryNumberSpan>
          </OrderSummaryTableRow>
        ))}
        <OrderSummaryTableFooter>
          <span className="my-auto px-6 font-light text-lg pr-10">
            Total price (with delivery cost):
          </span>
          <span className="my-auto px-6 font-light text-lg pr-6">
            {priceFormater(order.total)}
          </span>
        </OrderSummaryTableFooter>
      </div>
    </>
  );
}

export default PlacedOrder;
