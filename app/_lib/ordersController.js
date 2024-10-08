import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Order from "../_models/Order";
import connectMongo from "./connectDB";

export async function getOrder(orderId) {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);

  let order = await Order.findOne({ _id: orderId, user: userId });

  order = JSON.parse(JSON.stringify(order));
  return { order };
}

export async function getUserOrders() {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);
  let orders = await Order.find({ user: userId });

  orders = JSON.parse(JSON.stringify(orders));
  return { orders };
}

export async function getSingleOrder({ orderId }) {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);
  let order = await Order.findOne({ _id: orderId, user: userId });
  order = JSON.parse(JSON.stringify(order));
  return { order };
}
