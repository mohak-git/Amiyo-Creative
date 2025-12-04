async function sendTelegramMessage(text: string) {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!botToken) {
            console.error("TELEGRAM_BOT_TOKEN not configured");
            return {
                success: false,
                data: null,
                message: "Bot token not configured",
            };
        }

        const chatIdsEnv = process.env.TELEGRAM_CHAT_IDS;
        if (!chatIdsEnv) {
            console.error("TELEGRAM_CHAT_IDS not configured.");
            return {
                success: false,
                data: null,
                message: "Chat IDs not configured",
            };
        }

        const chatIds = chatIdsEnv.split(",").map((id) => id.trim());
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const sendPromises = chatIds.map(async (chatId) => {
            try {
                const response = await fetch(telegramUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text,
                    }),
                });

                const data = await response.json();

                if (data.ok)
                    return {
                        success: true,
                        data,
                        message: `Message sent successfully to ${chatId}`,
                    };
                else
                    return {
                        success: false,
                        data: null,
                        message: `Failed to send notification to ${chatId}`,
                    };
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                    data: null,
                    message: `Failed to send notification to ${chatId}`,
                };
            }
        });

        const results = await Promise.all(sendPromises);
        const allSuccessful = results.every((result) => result.success);

        return {
            success: allSuccessful,
            data: results,
            message: allSuccessful
                ? "Notification sent successfully to all chat IDs"
                : "Failed to send notification to all chat IDs",
        };
    } catch (error) {
        console.error("Error sending Telegram notification:", error);
        return {
            success: false,
            data: null,
            message: "Error sending Telegram notification",
        };
    }
}

export default async function sendEnquiryNotification(enquiryData: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    const text = `New Form Submission!
Name: ${enquiryData.name}
Email: ${enquiryData.email}
Phone: ${enquiryData.phone}

Message: ${enquiryData.message}

Time: ${new Date().toLocaleString()}
`;

    return await sendTelegramMessage(text);
}
