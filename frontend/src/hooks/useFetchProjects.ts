import { Project, StrapiCollectionResponse } from "@/constants/types";
import { fetchProjects } from "@/lib/api/projects";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
    return useQuery<StrapiCollectionResponse<Project>, Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 60,
        retry: false,
        refetchOnWindowFocus: false,
    });
}
