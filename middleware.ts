import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  //middleware only for redirect because can't connect with db. Mongoose doesn't support edge runetime
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (refreshToken || accessToken) {
    return NextResponse.next();
  } else
    return NextResponse.redirect(new URL("login", process.env.NEXT_PUBLIC_URL));
}

export const config = {
  matcher: ["/account/user", "/account/changePassword", "/account/myOrders"],
};
