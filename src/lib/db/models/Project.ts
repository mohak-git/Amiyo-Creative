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
                "Cinematography-and-Videography",
                "Photography",
                "Design-and-Branding",
                "Post-Production",
                "Web-and-Digital",
                "Marketing",
            ],
            required: true,
        },
    },
    { timestamps: true }
);
export const Project: Model<ProjectDocument> =
    models.Project || model<ProjectDocument>("Project", ProjectSchema);
