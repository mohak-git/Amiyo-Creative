import { Project } from "@/constants/types";
import {
    createProject,
    deleteAllProjects,
    deleteProject,
    deleteProjects,
    fetchProject,
    fetchProjects,
    updateProject,
} from "@/lib/api/projects";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjects() {
    return useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation<Project, Error, Partial<Project>>({
        mutationFn: createProject,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

export function useDeleteProjects() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string[]>({
        mutationFn: (ids) => deleteProjects(ids),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

export function useDeleteAllProjects() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: deleteAllProjects,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

export function useProject(id: string) {
    return useQuery<Project, Error>({
        queryKey: ["project", id],
        queryFn: () => fetchProject(id),
        staleTime: 1 * 60 * 60 * 1000,
        enabled: !!id,
        retry: 3,
    });
}

export function useUpdateProject(id: string) {
    const queryClient = useQueryClient();
    return useMutation<Project, Error, Partial<Project>>({
        mutationFn: (data) => updateProject(id, data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

export function useDeleteProject(id: string) {
    const queryClient = useQueryClient();
    return useMutation<void, Error, void>({
        mutationFn: () => deleteProject(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}
