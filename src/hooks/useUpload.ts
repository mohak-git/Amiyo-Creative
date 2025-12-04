import { UploadImageResponse } from "@/constants/types";
import { uploadImage } from "@/lib/api/upload";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
    return useMutation<UploadImageResponse, Error, File>({
        mutationFn: uploadImage,
    });
}
