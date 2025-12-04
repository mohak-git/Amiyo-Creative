import { APIResponse, UploadImageResponse } from "@/constants/types";

export async function uploadImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error((await res.text()) || "Image upload failed");
    const { data, success, message }: APIResponse<UploadImageResponse> =
        await res.json();
    if (!success) throw new Error(message || "Image upload failed");

    return data;
}
