"use server";

import { StatusCodes } from "http-status-codes";
import connectMongo from "./connectDB";
import User from "../_models/User";
import { cookies } from "next/headers";
import { joinAccessCookie, joinRefreshCookie } from "./jwt";
import Token from "../_models/Token";
import crypto from "crypto";
import sendVerificationEmail from "../_utils/sendVerificationEmail";
import { AccessTokenJwtPayload } from "../_types/types";
import jwt from "jsonwebtoken";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
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

export async function signUp(data: { email: string; password: string }) {
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
  let user;

  try {
    user = await User.create({ email, password, verificationToken });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const firstErrorKey = Object.keys(error.errors)[0];
      return {
        data: {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          msg: `${firstErrorKey}: ${error.errors[firstErrorKey].properties.message}`,
        },
      };
    }
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg:
          error.code === 11000
            ? "Your email is already registered."
            : error.errors.comment.properties.message,
      },
    };
  }

  const origin = `${process.env.NEXT_PUBLIC_URL}/` || "";

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

  try {
    await user.save();
  } catch (error: any) {
    return {
      data: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error?.errors?.comment?.properties?.message
          ? error.errors.comment.properties.message
          : error.errorResponse.errmsg,
      },
    };
  }

  return {
    data: {
      status: StatusCodes.OK,
      msg: "Now your account is activated and you can sign in.",
    },
  };
}

export async function logout() {
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
