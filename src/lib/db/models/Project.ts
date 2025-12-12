import { ServicesTypes } from "@/constants/types";
import { model, Model, models, Schema } from "mongoose";

export interface ProjectDocument extends Document {
    title: string;
    category: ServicesTypes;
    coverImage: string;
    coverImagePublicId: string;
    projectUrl: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        coverImage: { type: String, required: true },
        coverImagePublicId: { type: String, required: true },
        projectUrl: { type: String, required: true },
        tags: [{ type: String }],
        category: {
            type: String,
            enum: [
                "Photography",
                "Video-Production",
                "Video-Editing",
                "Brand-Design",
                "Web-Development",
                "CGI-VFX",
            ],
            required: true,
        },
    },
    { timestamps: true }
);
export const Project: Model<ProjectDocument> =
    models.Project || model<ProjectDocument>("Project", ProjectSchema);
