import { Document, model, Model, models, Schema } from "mongoose";

export interface TestimonialDocument extends Document {
    isVideo: boolean;
    name?: string;
    role?: string;
    company?: string;
    avatar?: string;
    avatarPublicId?: string;
    rating?: number;
    content?: string;
    videoUrl?: string;
    videoTitle?: string;
    createdAt: string;
    updatedAt: string;
}

const TestimonialSchema = new Schema(
    {
        isVideo: { type: Boolean, default: false, required: true },
        name: { type: String },
        role: { type: String },
        company: { type: String },
        avatar: { type: String },
        avatarPublicId: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        content: { type: String },
        videoUrl: { type: String },
        videoTitle: { type: String },
    },
    { timestamps: true }
);

export const Testimonial: Model<TestimonialDocument> =
    models.Testimonial ||
    model<TestimonialDocument>("Testimonial", TestimonialSchema);
