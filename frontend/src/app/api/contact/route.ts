import sendBrevoEmail from "@/lib/contact/email";
import sendTelegramNotification from "@/lib/contact/telegram";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        if (req.method !== "POST")
            return new NextResponse("Method Not Allowed", { status: 405 });

        const auth = req.headers.get("Authorization") || "";
        const token = auth.split(" ")[1];
        const event = req.headers.get("x-strapi-event");

        if (token !== process.env.WEBHOOK_TOKEN)
            return new NextResponse("Unauthorized", { status: 401 });

        if (event !== "entry.create")
            return new NextResponse("Invalid event", { status: 400 });

        const { model, entry } = await req.json();
        if (model !== "enquiry")
            return new NextResponse("Invalid model", { status: 400 });

        const { name, email, phone, message } = entry;
        if (!name || !email || !phone || !message)
            return new NextResponse("Missing required fields", { status: 400 });

        const emailResult = await sendBrevoEmail({
            name,
            email,
            phone,
            message,
        });
        if (!emailResult.success)
            return new NextResponse("Failed to send email", { status: 500 });

        const telegramResult = await sendTelegramNotification({
            name,
            email,
            phone,
            message,
        });
        if (!telegramResult.success)
            return new NextResponse("Failed to send notification", {
                status: 500,
            });

        return NextResponse.json(
            {
                success: true,
                message: "Email and notification sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error sending notification : ",
            error instanceof Error ? error.message : "Unknown error"
        );

        return NextResponse.json(
            {
                success: false,
                error: "Failed to send notification",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
