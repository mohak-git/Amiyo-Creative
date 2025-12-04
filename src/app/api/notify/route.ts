import sendBrevoEmail from "@/lib/utils/email";
import sendTelegramNotification from "@/lib/utils/telegram";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json();
        if (!name || !email || !phone || !message)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Missing required fields",
                },
                { status: 400 }
            );

        const telegramResult = await sendTelegramNotification({
            name,
            email,
            phone,
            message,
        });
        if (!telegramResult.success)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Failed to send telegram notification",
                },
                { status: 500 }
            );

        const emailResult = await sendBrevoEmail({
            name,
            email,
            phone,
            message,
        });
        if (!emailResult.success)
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Failed to send email",
                },
                { status: 500 }
            );

        return NextResponse.json(
            {
                success: true,
                data: null,
                message: "Email and telegram notification sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending notification : ", error);
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Failed to send notification",
            },
            { status: 500 }
        );
    }
}
