import { StrapiResponse } from "@/constants/types";
import {
    ContactFormPayload,
    ContactFormResponse,
    sendContactMessage,
} from "@/lib/api/contact";
import { useMutation } from "@tanstack/react-query";

export function useContactMutation() {
    return useMutation<
        StrapiResponse<ContactFormResponse>,
        Error,
        ContactFormPayload
    >({
        mutationFn: (payload: ContactFormPayload) =>
            sendContactMessage(payload),
    });
}
