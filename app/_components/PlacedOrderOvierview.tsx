"use client";

import OrderCustomerDetails from "./OrderCustomerDetails";

function PlacedOrderOvierview({
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
  };
}) {
  const user = {
    firstName: order.firstName,
    lastName: order.lastName,
    address: order.address,
    postCode: order.postCode,
    city: order.city,
    phoneNumber: order.phoneNumber,
    country: order.country,
  };

  return <OrderCustomerDetails user={user} type="order" />;
}

export default PlacedOrderOvierview;
