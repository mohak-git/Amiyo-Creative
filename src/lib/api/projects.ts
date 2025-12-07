import { parseAPIResponse } from "@/constants/constants";
import { Project } from "@/constants/types";

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`/api/projects`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Project[]>(
        res,
        "Failed to fetch projects"
    );

    return data;
}

export async function createProject(
    payload: Partial<Project>
): Promise<Project> {
    const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Project>(
        res,
        "Failed to create project"
    );

    return data;
}

export async function deleteProjects(ids: string[]): Promise<void> {
    const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    await parseAPIResponse<void>(res, "Failed to delete projects");
}

export async function deleteAllProjects(): Promise<void> {
    const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    await parseAPIResponse<void>(res, "Failed to delete all projects");
}

export async function fetchProject(id: string): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Project>(
        res,
        "Failed to fetch project"
    );

    return data;
}

export async function updateProject(
    id: string,
    payload: Partial<Project>
): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Project>(
        res,
        "Failed to update project"
    );

    return data;
}

export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await parseAPIResponse<void>(res, "Failed to delete project");
}
