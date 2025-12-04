import { verifyToken } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const auth = await verifyToken(request);
        if (!auth)
            return NextResponse.json(
                { success: false, data: null, message: "Unauthorized" },
                { status: 401 }
            );

        const response = NextResponse.json({
            success: true,
            data: null,
            message: "Logout successful",
        });

        response.cookies.delete("admin_token");

        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, message: "Internal server error" },
            { status: 500 }
        );
    }
}
