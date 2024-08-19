"use server";

import { StatusCodes } from "http-status-codes";
import Order from "../_models/Order";
import Product from "../_models/Product";
import Delivery from "../_models/Delivery";
import { AccessTokenJwtPayload } from "../_types/types";
import { cookies } from "next/headers";
import connectMongo from "./connectDB";
import jwt from "jsonwebtoken";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function createOrder({
  body,
}: {
  body: {
    supplier: string;
    cost: number;
    clientProducts: {
      product: string;
      quantity: number;
    }[];
    totalPrice: number;
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    address?: string;
    postCode?: string;
    city?: string;
    email?: string;
  };
}) {
  try {
    await connectMongo();
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.errorResponse.errmsg,
      },
    };
  }

  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return {
      data: {
        msg: "You must be logged in.",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }
  const {
    user: { userId },
  } = jwt.verify(
    accessToken!,
    process.env.JWT_SECRET!
  ) as AccessTokenJwtPayload;

  if (!userId) {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "Please log in",
      },
    };
  }

  const {
    supplier: deliverySupplier,
    cost: deliveryCost,
    clientProducts,
    totalPrice: clientTotalPrice,
    firstName,
    lastName,
    address,
    city,
    email,
    phoneNumber,
    postCode,
    country,
  } = body;

  let orderItems: {
    product: {
      price: number;
    };
    quantity: any;
  }[] = [];

  for (const clientProduct of clientProducts) {
    const product = await Product.findOne({ _id: clientProduct.product });
    if (!product) {
      return {
        data: {
          status: StatusCodes.NOT_FOUND,
          msg: `No product with id: ${clientProduct.product}`,
        },
      };
    }
    if (product.inventory - clientProduct.quantity < 0) {
      return {
        data: {
          status: StatusCodes.BAD_REQUEST,
          msg: `You are trying order more of ${product.name} than we have. Please try order smaller amount of this product.`,
        },
      };
    }
    orderItems = [...orderItems, { product, quantity: clientProduct.quantity }];
  }

  const delivery = await Delivery.findOne({
    supplier: deliverySupplier,
    cost: deliveryCost,
  });

  if (!delivery || delivery.length === 0) {
    return {
      data: {
        status: StatusCodes.NOT_FOUND,
        msg: `No delivery method for ${deliverySupplier}`,
      },
    };
  }

  let serverTotalPrice = delivery.cost;
  orderItems.map(
    (item) =>
      (serverTotalPrice = serverTotalPrice + item.product.price * item.quantity)
  );

  if (serverTotalPrice !== clientTotalPrice) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: `Something went wrong. Please place the order again`,
      },
    };
  }

  for (const clientProduct of clientProducts) {
    const product = await Product.findOne({
      _id: clientProduct.product,
    });
    const currentInventory = product.inventory;
    const result = await Product.findOneAndUpdate(
      { _id: clientProduct.product },
      { inventory: currentInventory - clientProduct.quantity }
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: serverTotalPrice,
    currency: "usd",
  });

  let order = await Order.create({
    orderItems: clientProducts,
    total: serverTotalPrice,
    user: userId,
    deliveryMethod: deliverySupplier,
    deliveryCost: deliveryCost,
    firstName,
    lastName,
    address,
    city,
    email,
    phoneNumber,
    postCode,
    country,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });

  order = JSON.stringify(order);

  return { data: { order, status: StatusCodes.CREATED } };
}
