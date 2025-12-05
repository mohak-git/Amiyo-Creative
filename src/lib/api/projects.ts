import { APIResponse, Project } from "@/constants/types";

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`/api/projects`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to fetch projects");

    const { data, success, message }: APIResponse<Project[]> = await res.json();
    if (!success) throw new Error(message || "Failed to receive projects");

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
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to create project");

    const { data, success, message }: APIResponse<Project> = await res.json();
    if (!success) throw new Error(message || "Failed to create project");

    return data;
}

export async function deleteProjects(ids: string[]): Promise<void> {
    const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete projects");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete projects");
}

export async function deleteAllProjects(): Promise<void> {
    const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete all projects");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete all projects");
}

export async function fetchProject(id: string): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to fetch project");

    const { data, success, message }: APIResponse<Project> = await res.json();
    if (!success) throw new Error(message || "Failed to receive project");

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
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to update project");

    const { data, success, message }: APIResponse<Project> = await res.json();
    if (!success) throw new Error(message || "Failed to update project");

    return data;
}

export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete project");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete project");
}
