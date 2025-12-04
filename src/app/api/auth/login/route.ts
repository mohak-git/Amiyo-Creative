import { generateToken } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Email and password required",
                },
                { status: 400 }
            );

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = await generateToken(email);

            const response = NextResponse.json({
                success: true,
                data: null,
                message: "Login successful",
            });

            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: "/",
            });

            return response;
        }

        return NextResponse.json(
            { success: false, data: null, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Internal server error" },
            { status: 500 }
        );
    }
}
