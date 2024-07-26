"use client";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OwrHqCHuNmzsv6CGj3Brb6oiNEICPgysJ05vFdjBIohRC87t2imENLGXTCWyfFFH13elj5z9sNdCb9NmClPq90z004uLf9muV"
);

function PaymentContainer({
  order,
}: {
  order: {
    clientSecret: string;
  };
}) {
  const { clientSecret } = order;
  const appearance = {
    theme: "stripe",
  };
  const options: {} = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm order={order} />
        </Elements>
      )}
    </>
  );
}

export default PaymentContainer;
