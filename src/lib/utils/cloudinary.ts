import {
    v2 as cloudinary,
    UploadApiErrorResponse,
    UploadApiResponse,
} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function uploadToCloudinary(
    buffer: Buffer,
    filename: string
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: process.env.CLOUDINARY_FOLDER,
                public_id: filename,
                overwrite: true,
            },
            (
                err: UploadApiErrorResponse | undefined,
                result: UploadApiResponse | undefined
            ) => {
                if (err) reject(err);
                else if (result) resolve(result);
            }
        );
        stream.end(buffer);
    });
}

export async function deleteFromCloudinary(public_id: string) {
    return cloudinary.uploader.destroy(public_id, {
        resource_type: "image",
    });
}

export default cloudinary;
