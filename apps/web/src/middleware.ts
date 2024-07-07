import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { initApiClient } from "./lib/api";

export async function middleware(request: NextRequest) {
  const apiClient = initApiClient(cookies());

  const res = await apiClient.users.getCurrent();

  if (res.status !== 200 || !res.body.user)
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/discover", "/movie/:path", "/my-library/:path"],
};
