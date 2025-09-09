import { Project, StrapiCollectionResponse } from "@/constants/types";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
if (!API_URL) throw new Error("API_URL environment variable is not set!");

export async function fetchProjects(): Promise<
    StrapiCollectionResponse<Project>
> {
    const res = await fetch(
        `/api/proxy/projects?fields=title,projectUrl,category,tags&populate[coverImage][fields]=url`,
        {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 60 * 5 },
        }
    );

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch projects");
    }

    return res.json();
}
