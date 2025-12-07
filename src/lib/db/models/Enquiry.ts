import { EnquiryStatus } from "@/constants/types";
import { Model, Schema, model, models } from "mongoose";

export interface EnquiryDocument extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    status: EnquiryStatus;
    createdAt: Date;
    updatedAt: Date;
}

const EnquirySchema = new Schema<EnquiryDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["new", "in-progress", "closed"],
            default: "new",
        },
    },
    { timestamps: true }
);

export const Enquiry: Model<EnquiryDocument> =
    models.Enquiry || model<EnquiryDocument>("Enquiry", EnquirySchema);
