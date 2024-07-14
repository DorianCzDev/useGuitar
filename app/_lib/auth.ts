import "server-only";

import connectMongo from "./connectDB";
import { cookies } from "next/headers";
import User from "../_models/User";
import Token from "../_models/Token";
import CustomError from "../_errors/index";
import { joinAccessCookie } from "./jwt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function verifySession() {
  await connectMongo();
  const refreshToken = cookies().get("refreshToken")?.value;
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    const {
      payload: {
        user: { userId },
      },
    } = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId }).select(
      "email isActive address city country firstName lastName phoneNumber postCode -_id"
    );
    return { status: StatusCodes.OK, user };
  }
  const { payload } = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const existingToken = await Token.findOne({
    user: payload.user.userId,
    refreshToken: payload.refreshToken,
  });
  if (!existingToken) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  const user = await User.findOne({ _id: payload.user.userId }).select(
    "email isActive address city country firstName lastName phoneNumber postCode -_id"
  );
  const { isActive } = user;

  if (!isActive) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  joinAccessCookie({ user: payload.user.userId });
  return { status: StatusCodes.OK, user };
}
