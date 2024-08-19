import connectMongo from "@/app/_lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/app/_models/Order";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function POST(req: NextRequest) {
  await connectMongo();
  const bodyString = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyString,
      sig,
      process.env.WEBHOOK_SECRET
    );
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const clientSecret = paymentIntentSucceeded.client_secret;

      const order = await Order.findOne({ clientSecret });
      order.status = "waiting for shipment";
      await order.save();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ msg: "Payment succeeded" });
}
