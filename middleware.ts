import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/intro": true,
  "/": true,
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { url } = req;
  const exists = publicOnlyUrls[pathname];
  const username = localStorage.getItem("username");

  if (username) {
    return NextResponse.redirect(new URL("/main", url));
  }
  //   if (!username && !exists) {
  //     return NextResponse.redirect(new URL("/intro", url));
  //   }
  //   if (username && exists) {
  //     return NextResponse.redirect(new URL("/main", url));
  //   }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
