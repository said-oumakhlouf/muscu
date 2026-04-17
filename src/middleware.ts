import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  sub: number;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Pas de token → redirect vers login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Client essaie d'accéder à /admin → redirect vers /dashboard
    if (
      decoded.role === "client" &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Coach essaie d'accéder à /dashboard → redirect vers /admin
    if (
      decoded.role === "coach" &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch {
    // Token invalide → redirect vers login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
