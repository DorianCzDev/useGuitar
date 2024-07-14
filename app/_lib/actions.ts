"use server";

import Token from "@/app/_models/Token";
import User from "@/app/_models/User";
import CustomError from "../_errors/index";
import connectMongo from "./connectDB";

import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { joinAccessCookie, joinRefreshCookie } from "./jwt";
import jwt from "jsonwebtoken";
import Product from "../_models/Product";
import Delivery from "../_models/Delivery";
import Order from "../_models/Order";
import Review from "../_models/Review";
import { revalidatePath } from "next/cache";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function login(formData: FormData) {
  await connectMongo();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: StatusCodes.BAD_REQUEST,
      msg: "Please provide email and password",
    };
  }
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Invalid email or password",
    };
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Invalid email or password",
    };
  }

  if (!user.isVerified) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Please verify your email",
    };
  }
  if (!user.isActive) {
    cookies().delete("acessToken");
    cookies().delete("refreshToken");
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Your account is blocked. Please check email for more details.",
    };
  }

  const { _id: userId } = user;

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: userId });
  const tokenUser = { userId };
  if (existingToken) {
    refreshToken = existingToken.refreshToken;

    joinAccessCookie({ user: tokenUser });
    joinRefreshCookie({ user: tokenUser, refreshToken });

    return { status: StatusCodes.OK, msg: "Login succesfull!" };
  }

  refreshToken = crypto.randomBytes(40).toString("hex");

  const token = { refreshToken, user: userId };

  await Token.create(token);

  joinAccessCookie({ user: tokenUser });
  joinRefreshCookie({ user: tokenUser, refreshToken });

  return { status: StatusCodes.OK, msg: "Login succesfull!" };
}

export async function updateUser(data: {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  address: string;
  postCode: string;
  city: string;
}) {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!userId) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Please log in",
    };
  }
  const { firstName, lastName, country, phoneNumber, address, postCode, city } =
    data;
  if (
    !firstName ||
    !lastName ||
    !country ||
    !phoneNumber ||
    !address ||
    !postCode ||
    !city
  ) {
    return {
      status: StatusCodes.BAD_REQUEST,
      msg: "Please provide all values",
    };
  }

  const updatedUser = {
    firstName,
    lastName,
    country,
    phoneNumber,
    address,
    postCode,
    city,
  };

  const user = await User.findOneAndUpdate({ _id: userId }, updatedUser);

  return { msg: "User successfully updated!" };
}

export async function createOrder({
  body,
}: {
  body: {
    supplier: string;
    cost: number;
    clientProducts: {
      product: string;
      quantity: string;
    }[];
    totalPrice: number;
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
    address: string;
    postCode: string;
    city: string;
    email: string;
  };
}) {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!userId) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      msg: "Please log in",
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
    quantity: string | number;
  }[] = [];

  for (const clientProduct of clientProducts) {
    const product = await Product.findOne({ _id: clientProduct.product });
    if (!product) {
      throw new CustomError.NotFoundError(
        `No product with id: ${clientProduct.product}`
      );
    }
    orderItems = [...orderItems, { product, quantity: clientProduct.quantity }];
  }
  const delivery = await Delivery.findOne({
    supplier: deliverySupplier,
    cost: deliveryCost,
  });

  if (!delivery || delivery.length === 0) {
    throw new CustomError.NotFoundError(
      `No delivery method for ${deliverySupplier}`
    );
  }

  let serverTotalPrice = delivery.cost;
  orderItems.map(
    (item) =>
      (serverTotalPrice = serverTotalPrice + item.product.price * item.quantity)
  );

  if (serverTotalPrice !== clientTotalPrice) {
    throw new CustomError.BadRequestError("Please place the order again");
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

  return { status: StatusCodes.CREATED, data: { order } };
}

export async function createReview({
  productId,
  reviewBody,
}: {
  productId: string;
  reviewBody: {
    user: string;
    product: string;
  };
}) {
  await connectMongo();
  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!userId) {
    return {
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (alreadySubmitted) {
    return {
      status: StatusCodes.BAD_REQUEST,
      msg: 'Already submitted review for this product"',
    };
  }
  reviewBody.user = userId;
  reviewBody.product = productId;

  let review = await Review.create(reviewBody);

  review = JSON.stringify(review);

  revalidatePath("/products");

  return { status: StatusCodes.CREATED, msg: "Review added" };
}
