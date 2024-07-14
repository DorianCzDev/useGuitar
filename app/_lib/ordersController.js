import CustomError from "../_errors/index";
import connectMongo from "./connectDB";
import jwt from "jsonwebtoken";
import Order from "../_models/Order";
import { cookies } from "next/headers";

export async function getOrder(orderId) {
  await connectMongo();
  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);

  let order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new CustomError.NotFoundError(
      "Something went wrong, please try again later."
    );
  }

  order = JSON.parse(JSON.stringify(order));
  return { order };
}
