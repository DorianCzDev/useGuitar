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
import sendVerificationEmail from "../_utils/sendVerificationEmail";
import sendResetPasswordEmail from "../_utils/sendResetPasswordEmail";
import { AccessTokenJwtPayload } from "../_types/types";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await connectMongo();
  if (!email || !password) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Please provide email and password",
      },
    };
  }
  const user = await User.findOne({ email });
  if (!user) {
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "Invalid email or password",
      },
    };
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "Invalid email or password",
      },
    };
  }

  if (!user.isVerified) {
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "Please verify your email",
      },
    };
  }
  if (!user.isActive) {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "Your account is blocked. Please check email for more details.",
      },
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

    return { data: { status: StatusCodes.OK, msg: "Login succesfull!" } };
  }

  refreshToken = crypto.randomBytes(40).toString("hex");

  const token = { refreshToken, user: userId };

  await Token.create(token);

  joinAccessCookie({ user: tokenUser });
  joinRefreshCookie({ user: tokenUser, refreshToken });

  return { data: { status: StatusCodes.OK, msg: "Login succesfull!" } };
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
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Please provide all values",
      },
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

  return {
    data: { msg: "User successfully updated!", status: StatusCodes.OK },
  };
}

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
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
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

export async function createReview({
  productId,
  reviewBody,
}: {
  productId: string;
  reviewBody: {
    user?: string;
    product?: string;
    rating: any;
    comment: string;
  };
}) {
  await connectMongo();
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

  console.log(userId);

  if (!userId) {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return {
      data: {
        msg: "Something went wrong",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: `No product with id: ${productId}`,
      },
    };
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (alreadySubmitted) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: 'Already submitted review for this product"',
      },
    };
  }
  reviewBody.user = userId;
  reviewBody.product = productId;

  let review = await Review.create(reviewBody);

  review = JSON.stringify(review);

  revalidatePath("/products");

  return { data: { status: StatusCodes.CREATED, msg: "Review added" } };
}

export async function signUp(data: { email: string; password: string }) {
  await connectMongo();
  const { email, password } = data;
  if (!email || !password) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Please provide email and password",
      },
    };
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({ email, password, verificationToken });

  const origin = "http://localhost:3000/";

  await sendVerificationEmail({
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  return {
    data: {
      status: StatusCodes.CREATED,
      msg: "Success! Please check your email to verify account",
    },
  };
}

export async function verifyEmail({
  email,
  verificationToken,
}: {
  email: string;
  verificationToken: string;
}) {
  await connectMongo();
  const user = await User.findOne({ email, verificationToken }).select(
    "isVerified verificationToken"
  );
  if (!user) {
    return {
      data: {
        msg: "Something went wrong, please try again later.",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }

  user.isVerified = true;
  user.verificationToken = "";
  await user.save();

  return {
    data: {
      status: StatusCodes.OK,
      msg: "Now your account is activated and you can sign in.",
    },
  };
}

export async function forgotPassword({ email }: { email: string }) {
  await connectMongo();
  if (!email) {
    return {
      data: { status: StatusCodes.NOT_FOUND, msg: "Something went wrong." },
    };
  }
  const user = await User.findOne({ email }).select(
    "forgotPasswordToken forgotPasswordTokenExpirationDate name email"
  );
  if (!user) {
    return {
      data: { status: StatusCodes.NOT_FOUND, msg: "Something went wrong." },
    };
  }

  const forgotPasswordToken = crypto.randomBytes(40).toString("hex");

  const origin = "http://localhost:3000/";
  await sendResetPasswordEmail({
    email: user.email,
    forgotPasswordToken,
    origin,
  });

  const expiresIn = 1000 * 60 * 15; // 15 min
  const forgotPasswordTokenExpirationDate = new Date(Date.now() + expiresIn);

  user.forgotPasswordToken = crypto
    .createHash("md5")
    .update(forgotPasswordToken)
    .digest("hex");
  user.forgotPasswordTokenExpirationDate = forgotPasswordTokenExpirationDate;
  await user.save();

  return {
    data: {
      status: StatusCodes.OK,
      msg: "Please check your email for reset password link",
    },
  };
}

export async function resetPassword({
  forgotPasswordToken,
  email,
  password,
}: {
  forgotPasswordToken: string;
  email: string;
  password: string;
}) {
  await connectMongo();
  if (!forgotPasswordToken || !email || !password) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Please provide all required values.",
      },
    };
  }
  const user = await User.findOne({ email });
  if (!user) {
    return {
      data: { status: StatusCodes.NOT_FOUND, msg: "Something went wrong." },
    };
  }
  const currentDate = new Date();
  if (
    user.forgotPasswordToken ===
      crypto.createHash("md5").update(forgotPasswordToken).digest("hex") &&
    user.forgotPasswordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpirationDate = null;
    await user.save();
  }
  return { data: { status: StatusCodes.OK, msg: "Your password is updated" } };
}

export async function updateUserPassword({
  currPassword,
  newPassword,
}: {
  currPassword: string;
  newPassword: string;
}) {
  await connectMongo();
  const accessToken = cookies().get("accessToken")?.value;
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
        msg: "Something went wrong, please try again later.",
        status: StatusCodes.UNAUTHORIZED,
      },
    };
  }
  if (!currPassword || !newPassword) {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Please provide all required values.",
      },
    };
  }
  const user = await User.findOne({ _id: userId });

  const isPasswordCorrect = await user.comparePassword(currPassword);

  if (!isPasswordCorrect) {
    return {
      data: { status: StatusCodes.UNAUTHORIZED, msg: "Invalid password" },
    };
  }

  user.password = newPassword;

  await user.save();

  return { data: { status: StatusCodes.OK, msg: "Password updated!" } };
}

export async function logout() {
  await connectMongo();

  const accessToken = cookies().get("accessToken")?.value;
  const {
    user: { userId },
  } = jwt.verify(
    accessToken!,
    process.env.JWT_SECRET!
  ) as AccessTokenJwtPayload;
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  if (!userId) {
    return {
      data: {
        status: StatusCodes.UNAUTHORIZED,
        msg: "You are not logged in",
      },
    };
  }
  await Token.findOneAndDelete({ user: userId });

  return { data: { status: StatusCodes.OK, msg: "You logged out" } };
}

export async function reportReview(id: string) {
  await connectMongo();

  const review = await Review.findOne({ _id: id });

  review.isReported = true;
  await review.save();

  return { msg: "Review reported.", status: StatusCodes.OK };
}
