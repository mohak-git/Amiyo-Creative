import { StrapiResponse } from "@/constants/types";
import z from "zod";

export const ContactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormPayload = z.infer<typeof ContactFormSchema>;

export interface ContactFormResponse {
    id: number;
    documentId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    enquiryStatus: "new" | "in-progress" | "closed";
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export async function sendContactMessage(
    data: ContactFormPayload
): Promise<StrapiResponse<ContactFormResponse>> {
    const res = await fetch(`api/proxy/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to send message");
    }

    return res.json();
}
