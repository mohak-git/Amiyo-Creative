import { Testimonial } from "@/constants/types";
import {
    createTestimonial,
    deleteAllTestimonials,
    deleteTestimonial,
    deleteTestimonials,
    fetchTestimonial,
    fetchTestimonials,
    updateTestimonial,
} from "@/lib/api/testimonials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTestimonials() {
    return useQuery<Testimonial[], Error>({
        queryKey: ["testimonials"],
        queryFn: fetchTestimonials,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
    });
}

export function useCreateTestimonial() {
    const queryClient = useQueryClient();

    return useMutation<Testimonial, Error, Partial<Testimonial>>({
        mutationFn: createTestimonial,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
    });
}

export function useDeleteTestimonials() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string[]>({
        mutationFn: (ids) => deleteTestimonials(ids),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
    });
}

export function useDeleteAllTestimonials() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: deleteAllTestimonials,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
    });
}

export function useTestimonial(id: string) {
    return useQuery<Testimonial, Error>({
        queryKey: ["testimonial", id],
        queryFn: () => fetchTestimonial(id),
        staleTime: 1 * 60 * 60 * 1000,
        enabled: !!id,
        retry: 3,
    });
}

export function useUpdateTestimonial(id: string) {
    const queryClient = useQueryClient();
    return useMutation<Testimonial, Error, Partial<Testimonial>>({
        mutationFn: (data) => updateTestimonial(id, data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
    });
}

export function useDeleteTestimonial(id: string) {
    const queryClient = useQueryClient();
    return useMutation<void, Error, void>({
        mutationFn: () => deleteTestimonial(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
    });
}
