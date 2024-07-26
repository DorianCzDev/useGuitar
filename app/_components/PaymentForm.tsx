"use client";

import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SpinnerMini from "./SpinnerMini";

export default function PaymentForm({ order }: { order: {} }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: {} = {
    layout: "tabs",
  };

  return (
    <article className="text-base flex justify-center items-center h-[100vh] w-[100vw] bg-white">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-[30vw] min-w-[500px] self-center rounded-md p-10 md:min-w-[420px]"
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="text-2xl w-full bg-secondary-500 border-none outline-none py-2 transition-all mt-5 tracking-widest flex items-center justify-center min-h-12 cursor-pointer font-bold hover:bg-secondary-600 disabled:opacity-50 disabled:bg-secondary-600 disabled:cursor-not-allowed"
        >
          <span id="button-text">
            {isLoading ? <SpinnerMini /> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-base pt-3 text-center">
            {message}
          </div>
        )}
      </form>
    </article>
  );
}
