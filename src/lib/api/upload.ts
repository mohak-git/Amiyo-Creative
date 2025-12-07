import { parseAPIResponse } from "@/constants/constants";
import { UploadImageResponse } from "@/constants/types";

export async function uploadImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    const data = await parseAPIResponse<UploadImageResponse>(
        res,
        "Image upload failed"
    );

    return data;
}
