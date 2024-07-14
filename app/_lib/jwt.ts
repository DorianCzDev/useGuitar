import "server-only";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
export function createJWT({ payload }: { payload: {} }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

export function joinAccessCookie({ user }: { user: {} }) {
  const accessTokenJWT = createJWT({ payload: { user } });
  const accessExp = 1000 * 60 * 60 * 24;
  cookies().set("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + accessExp),
    sameSite: "none",
  });
}

export function joinRefreshCookie({
  user,
  refreshToken,
}: {
  user: {};
  refreshToken: string;
}) {
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });
  const refreshExp = 1000 * 60 * 60 * 24 * 30;
  cookies().set("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + refreshExp),
    sameSite: "none",
  });
}
