import type { Core } from "@strapi/strapi";
import sendBrevoEmail from "./api/enquiry/services/email";
import sendTelegramNotification from "./api/enquiry/services/telegram";

export default {
    register() {},

    bootstrap({ strapi }: { strapi: Core.Strapi }) {
        strapi.db.lifecycles.subscribe({
            models: ["api::enquiry.enquiry"],
            async afterUpdate(event) {
                const { result } = event;

                try {
                    const emailResult = await sendBrevoEmail({
                        name: result.name,
                        email: result.email,
                        phone: result.phone,
                        message: result.message,
                    });

                    if (!emailResult.success)
                        strapi.log.error(
                            "Failed to send email:",
                            emailResult.error
                        );
                } catch (error) {
                    strapi.log.error("Failed to send enquiry email:", error);
                }

                try {
                    const telegramResult = await sendTelegramNotification({
                        name: result.name,
                        email: result.email,
                        phone: result.phone,
                        message: result.message,
                    });

                    if (!telegramResult.success) {
                        strapi.log.error(
                            "Failed to send notification:",
                            telegramResult.error
                        );
                    }
                } catch (error) {
                    strapi.log.error(
                        "Error sending Telegram notification:",
                        error
                    );
                }
            },
        });
    },
};
