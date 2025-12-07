import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/admin")) return NextResponse.next();

    const token = request.cookies.get("admin_token")?.value;
    let isValid = false;

    if (token)
        try {
            await jwtVerify(token, JWT_SECRET);
            isValid = true;
        } catch {
            isValid = false;
        }

    if (pathname === "/admin/login") {
        if (isValid)
            return NextResponse.redirect(new URL("/admin", request.url));
        return NextResponse.next();
    }

    if (!isValid)
        return NextResponse.redirect(new URL("/admin/login", request.url));

    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
