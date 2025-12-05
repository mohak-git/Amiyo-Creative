import { Enquiry } from "@/constants/types";
import {
    createEnquiry,
    deleteAllEnquiries,
    deleteEnquiries,
    deleteEnquiry,
    fetchEnquiries,
    fetchEnquiry,
    updateEnquiryStatus,
} from "@/lib/api/enquiries";
import {
    EnquiryFormPayload,
    EnquiryFormResponse,
} from "@/lib/utils/validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEnquiries() {
    return useQuery<Enquiry[], Error>({
        queryKey: ["enquiries"],
        queryFn: fetchEnquiries,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
    });
}

export function useCreateEnquiry() {
    const queryClient = useQueryClient();

    return useMutation<EnquiryFormResponse, Error, EnquiryFormPayload>({
        mutationFn: (payload: EnquiryFormPayload) => createEnquiry(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
    });
}

export function useDeleteEnquiries() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string[]>({
        mutationFn: (ids) => deleteEnquiries(ids),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
    });
}

export function useDeleteAllEnquiries() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: deleteAllEnquiries,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
    });
}

export function useEnquiry(id: string) {
    return useQuery<Enquiry, Error>({
        queryKey: ["enquiry", id],
        queryFn: () => fetchEnquiry(id),
        staleTime: 1 * 60 * 60 * 1000,
        enabled: !!id,
        retry: 3,
    });
}

export function useUpdateEnquiryStatus(id: string) {
    const queryClient = useQueryClient();

    return useMutation<Enquiry, Error, string>({
        mutationFn: (status) => updateEnquiryStatus(id, status),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
    });
}

export function useDeleteEnquiry(id: string) {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: () => deleteEnquiry(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
    });
}
