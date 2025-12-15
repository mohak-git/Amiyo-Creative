import { model, Model, models, Schema } from "mongoose";

export interface LogoDocument extends Document {
    title: string;
    logo: string;
    logoPublicId: string;
    createdAt: string;
    updatedAt: string;
}

const LogoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        logo: {
            type: String,
            required: [true, "Logo URL is required"],
        },
        logoPublicId: {
            type: String,
            required: [true, "Logo Public ID is required"],
        },
    },
    { timestamps: true }
);

export const Logo: Model<LogoDocument> =
    models.Logo || model<LogoDocument>("Logo", LogoSchema);
