import sendBrevoEmail from "@/lib/utils/email";
import sendTelegramNotification from "@/lib/utils/telegram";

export interface EnquiryData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function sendNotifications(data: EnquiryData) {
    try {
        const { name, email, phone, message } = data;
        const telegramResult = await sendTelegramNotification({
            name,
            email,
            phone,
            message,
        });
        if (!telegramResult.success)
            console.warn("Failed to send telegram notification");

        const emailResult = await sendBrevoEmail({
            name,
            email,
            phone,
            message,
        });
        if (!emailResult.success) console.warn("Failed to send email");

        console.info("Email and telegram notification sent successfully");
    } catch (error) {
        console.error("Error sending notification : ", error);
    }
}
