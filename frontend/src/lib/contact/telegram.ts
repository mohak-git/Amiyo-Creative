async function sendTelegramMessage(text: string) {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!botToken) {
            console.error("TELEGRAM_BOT_TOKEN not configured");
            return { success: false, error: "Bot token not configured" };
        }

        const chatIdsEnv = process.env.TELEGRAM_CHAT_IDS;
        if (!chatIdsEnv) {
            console.error("TELEGRAM_CHAT_IDS not configured.");
            return { success: false, error: "Chat IDs not configured" };
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

                if (data.ok) return { chatId, success: true, data };
                else return { chatId, success: false, error: data.description };
            } catch (error) {
                console.log(error);
                return {
                    chatId,
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to send message to chat ID " + chatId,
                };
            }
        });

        const results = await Promise.all(sendPromises);
        const allSuccessful = results.every((result) => result.success);

        return {
            success: allSuccessful,
            results,
            error: allSuccessful
                ? null
                : results.find((result) => !result.success)?.error ||
                  "Failed to send message to all chat IDs",
        };
    } catch (error) {
        console.error("Error sending Telegram message:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
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

    return sendTelegramMessage(text);
}
