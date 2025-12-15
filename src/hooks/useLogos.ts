import { Logo } from "@/constants/types";
import {
    createLogo,
    deleteAllLogos,
    deleteLogo,
    deleteLogos,
    fetchLogo,
    fetchLogos,
    updateLogo,
} from "@/lib/api/logos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLogos() {
    return useQuery<Logo[], Error>({
        queryKey: ["logos"],
        queryFn: fetchLogos,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
    });
}

export function useCreateLogo() {
    const queryClient = useQueryClient();

    return useMutation<Logo, Error, Partial<Logo>>({
        mutationFn: createLogo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logos"] }),
    });
}

export function useDeleteLogos() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string[]>({
        mutationFn: (ids) => deleteLogos(ids),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logos"] }),
    });
}

export function useDeleteAllLogos() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: deleteAllLogos,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logos"] }),
    });
}

export function useLogo(id: string) {
    return useQuery<Logo, Error>({
        queryKey: ["logo", id],
        queryFn: () => fetchLogo(id),
        staleTime: 1 * 60 * 60 * 1000,
        enabled: !!id,
        retry: 3,
    });
}

export function useUpdateLogo(id: string) {
    const queryClient = useQueryClient();
    return useMutation<Logo, Error, Partial<Logo>>({
        mutationFn: (data) => updateLogo(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logos"] }),
    });
}

export function useDeleteLogo(id: string) {
    const queryClient = useQueryClient();
    return useMutation<void, Error, void>({
        mutationFn: () => deleteLogo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logos"] }),
    });
}
