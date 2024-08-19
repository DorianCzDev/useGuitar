"use server";

import { StatusCodes } from "http-status-codes";
import User from "../_models/User";
import { AccessTokenJwtPayload } from "../_types/types";
import { cookies } from "next/headers";
import connectMongo from "./connectDB";
import jwt from "jsonwebtoken";
import sendResetPasswordEmail from "../_utils/sendResetPasswordEmail";
import crypto from "crypto";

export async function updateUser(data: {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  address: string;
  postCode: string;
  city: string;
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

  try {
    const user = await User.findOneAndUpdate({ _id: userId }, updatedUser);
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
    data: { msg: "User successfully updated!", status: StatusCodes.OK },
  };
}

export async function forgotPassword({ email }: { email: string }) {
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
  } else {
    return {
      data: {
        status: StatusCodes.BAD_REQUEST,
        msg: "Your forgot password token has expired. Please try again.",
      },
    };
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

  return { data: { status: StatusCodes.OK, msg: "Password updated!" } };
}
