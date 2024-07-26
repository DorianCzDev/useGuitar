import connectMongo from "@/app/_lib/connectDB";
import { joinAccessCookie } from "@/app/_lib/jwt";
import Token from "@/app/_models/Token";
import User from "@/app/_models/User";
import {
  AccessTokenJwtPayload,
  RefreshTokenJwtPayload,
} from "@/app/_types/types";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongo();
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken && !refreshToken)
    return NextResponse.json({
      status: StatusCodes.UNAUTHORIZED,
      msg: "Authentication Invalid",
    });

  try {
    if (accessToken) {
      const {
        user: { userId },
      } = jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
      ) as AccessTokenJwtPayload;
      const user = await User.findOne({ _id: userId }).select(
        "email isActive address city country firstName lastName phoneNumber postCode -_id"
      );
      if (!user) {
        cookies().delete("refreshToken");
        cookies().delete("accessToken");
        return NextResponse.json({
          msg: "Authentication Invalid",
          status: StatusCodes.UNAUTHORIZED,
        });
      }
      return NextResponse.json({ user, status: StatusCodes.OK });
    }
    const payload = jwt.verify(
      refreshToken!,
      process.env.JWT_SECRET!
    ) as RefreshTokenJwtPayload;
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken) {
      return NextResponse.json({
        status: StatusCodes.UNAUTHORIZED,
        msg: "Authentication Invalid",
      });
    }
    const user = await User.findOne({ _id: payload.user.userId }).select(
      "email isActive address city country firstName lastName phoneNumber postCode -_id"
    );
    const { isActive } = user;

    if (!isActive) {
      return NextResponse.json({
        status: StatusCodes.UNAUTHORIZED,
        msg: "Your Account is Blocked",
      });
    }

    joinAccessCookie({ user: { userId: payload.user.userId } });

    return NextResponse.json({ user, status: StatusCodes.OK });
  } catch (err) {
    cookies().delete("refreshToken");
    cookies().delete("accessToken");
    return NextResponse.json({
      status: StatusCodes.UNAUTHORIZED,
      msg: "Authentication Invalid",
    });
  }
}
