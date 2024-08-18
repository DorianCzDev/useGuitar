import connectMongo from "@/app/_lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/app/_models/Order";

const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret =
  "whsec_18bff411ae1638d40e21c6ac58bf82d16e8e1552d64259a87fa73fd67ce7ac54";

export async function POST(req: NextRequest) {
  await connectMongo();
  const bodyString = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ msg: "Payment failed" });
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const clientSecret = paymentIntentSucceeded.client_secret;

      const order = await Order.findOne({ clientSecret });
      order.status = "waiting for shipment";
      await order.save();
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ msg: "Payment succeeded" });
}
