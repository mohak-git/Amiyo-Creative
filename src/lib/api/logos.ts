import { parseAPIResponse } from "@/constants/constants";
import { Logo } from "@/constants/types";

export async function fetchLogos(): Promise<Logo[]> {
    const res = await fetch(`/api/logos`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Logo[]>(res, "Failed to fetch logos");

    return data;
}

export async function createLogo(payload: Partial<Logo>): Promise<Logo> {
    const res = await fetch("/api/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Logo>(res, "Failed to create logo");

    return data;
}

export async function deleteLogos(ids: string[]): Promise<void> {
    const res = await fetch("/api/logos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    await parseAPIResponse<void>(res, "Failed to delete logos");
}

export async function deleteAllLogos(): Promise<void> {
    const res = await fetch("/api/logos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    await parseAPIResponse<void>(res, "Failed to delete all logos");
}

export async function fetchLogo(id: string): Promise<Logo> {
    const res = await fetch(`/api/logos/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Logo>(res, "Failed to fetch logo");

    return data;
}

export async function updateLogo(
    id: string,
    payload: Partial<Logo>
): Promise<Logo> {
    const res = await fetch(`/api/logos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Logo>(res, "Failed to update logo");

    return data;
}

export async function deleteLogo(id: string): Promise<void> {
    const res = await fetch(`/api/logos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    await parseAPIResponse<void>(res, "Failed to delete logo");
}
