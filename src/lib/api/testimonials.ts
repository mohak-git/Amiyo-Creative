import { parseAPIResponse } from "@/constants/constants";
import { Testimonial } from "@/constants/types";

export async function fetchTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`/api/testimonials`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Testimonial[]>(
        res,
        "Failed to fetch testimonials"
    );

    return data;
}

export async function createTestimonial(
    payload: Partial<Testimonial>
): Promise<Testimonial> {
    const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Testimonial>(
        res,
        "Failed to create testimonial"
    );

    return data;
}

export async function deleteTestimonials(ids: string[]): Promise<void> {
    const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    await parseAPIResponse<void>(res, "Failed to delete testimonials");
}

export async function deleteAllTestimonials(): Promise<void> {
    const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    await parseAPIResponse<void>(res, "Failed to delete all testimonials");
}

export async function fetchTestimonial(id: string): Promise<Testimonial> {
    const res = await fetch(`/api/testimonials/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    const data = await parseAPIResponse<Testimonial>(
        res,
        "Failed to fetch testimonial"
    );

    return data;
}

export async function updateTestimonial(
    id: string,
    payload: Partial<Testimonial>
): Promise<Testimonial> {
    const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await parseAPIResponse<Testimonial>(
        res,
        "Failed to update testimonial"
    );

    return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await parseAPIResponse<void>(res, "Failed to delete testimonial");
}
