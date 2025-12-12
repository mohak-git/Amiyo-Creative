import { z } from "zod";

const projectFields = {
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
    coverImage: z.string().min(1, "Cover image URL is required"),
    coverImagePublicId: z.string().min(1, "Cover image public ID is required"),
    projectUrl: z
        .string()
        .regex(
            /^(https?:\/\/)?([\w\-])+\.([\w\-]+)([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/
        ),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    category: z.enum([
        "Photography",
        "Video-Production",
        "Video-Editing",
        "Brand-Design",
        "Web-Development",
        "CGI-VFX",
    ]),
};

const enquiryFields = {
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
};

// Projects Schema
export const projectSchema = z.object(projectFields);
export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = Partial<ProjectInput>;

// Enquiries Schema
export const enquirySchema = z.object({
    ...enquiryFields,
    enquiryStatus: z.enum(["new", "in-progress", "closed"]).default("new"),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryUpdateInput = Partial<EnquiryInput>;

// Enquiry Contact Form Schema
export const EnquiryFormSchema = z.object(enquiryFields);
export type EnquiryFormPayload = z.infer<typeof EnquiryFormSchema>;
export type EnquiryFormResponse = EnquiryInput & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
