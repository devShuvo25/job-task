import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * ------------------------------------------------------------------
 * 1️⃣  ENV VALIDATION (Never allow fallback secret in production)
 * ------------------------------------------------------------------
 */
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * ------------------------------------------------------------------
 * 2️⃣  ROLE → ROUTE PERMISSIONS (RBAC MATRIX)
 * Prefix based protection:
 * /dashboard protects /dashboard/* automatically
 * ------------------------------------------------------------------
 */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "/dashboard": ["SUPER_ADMIN", "ADMIN", "STAFF"],
  "/checkout": ["CUSTOMER", "SUPER_ADMIN", "ADMIN"],
  "/profile": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"],
  "/cart": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"],
};

/**
 * ------------------------------------------------------------------
 * 3️⃣  FIND IF CURRENT PATH IS PROTECTED
 * Safer than naive startsWith()
 * ------------------------------------------------------------------
 */
function getProtectedRoute(pathname: string) {
  return Object.entries(ROLE_PERMISSIONS).find(
    ([route]) => pathname === route || pathname.startsWith(route + "/")
  );
}

/**
 * ------------------------------------------------------------------
 * 4️⃣  VERIFY JWT TOKEN USING EDGE SAFE JOSE
 * ------------------------------------------------------------------
 */
async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET);

  if (typeof payload.role !== "string") {
    throw new Error("Invalid token payload");
  }

  return payload.role;
}

/**
 * ------------------------------------------------------------------
 * 5️⃣  MAIN MIDDLEWARE FUNCTION
 * ------------------------------------------------------------------
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  /**
   * ✅ Never block login page (prevents redirect loop)
   */
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  /**
   * ✅ Check if route requires authentication
   */
  const protectedRoute = getProtectedRoute(pathname);

  if (!protectedRoute) {
    // Public route → allow access
    return NextResponse.next();
  }

  /**
   * ------------------------------------------------------------------
   * 6️⃣  HANDLE UNAUTHENTICATED USERS
   * ------------------------------------------------------------------
   */
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callback", pathname);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  /**
   * ------------------------------------------------------------------
   * 7️⃣  VERIFY TOKEN + RBAC AUTHORIZATION
   * ------------------------------------------------------------------
   */
  try {
    const userRole = await verifyToken(token);
    const allowedRoles = protectedRoute[1];

    if (!allowedRoles.includes(userRole)) {
      // ❌ Forbidden (Logged in but no permission)
      return NextResponse.redirect(
        new URL("/?error=permission_denied", request.url)
      );
    }

    /**
     * ✅ Authorized → Continue request
     */
    return NextResponse.next();
  } catch {
    /**
     * ❌ Token expired / invalid / tampered
     * Clean cookie + redirect to login
     */
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

/**
 * ------------------------------------------------------------------
 * 8️⃣  MATCHER (Performance Critical)
 * Middleware will ONLY run on protected surfaces.
 * ------------------------------------------------------------------
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/cart/:path*",
  ],
};