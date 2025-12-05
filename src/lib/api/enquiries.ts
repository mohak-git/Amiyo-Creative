import { APIResponse, Enquiry } from "@/constants/types";
import {
    EnquiryFormPayload,
    EnquiryFormResponse,
} from "@/lib/utils/validation";

export async function fetchEnquiries(): Promise<Enquiry[]> {
    const res = await fetch("/api/enquiries", {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to fetch enquiries");

    const { data, success, message }: APIResponse<Enquiry[]> = await res.json();
    if (!success) throw new Error(message || "Failed to receive enquiries");

    return data;
}

export async function createEnquiry(
    payload: EnquiryFormPayload
): Promise<EnquiryFormResponse> {
    const res = await fetch(`/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok)
        throw new Error((await res.text()) || "Failed to create enquiry");

    const { data, success, message }: APIResponse<EnquiryFormResponse> =
        await res.json();
    if (!success) throw new Error(message || "Failed to create enquiry");

    return data;
}

export async function deleteEnquiries(ids: string[]): Promise<void> {
    const res = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete enquiries");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete enquiries");
}

export async function deleteAllEnquiries(): Promise<void> {
    const res = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete all enquiries");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete all enquiries");
}

export async function fetchEnquiry(id: string): Promise<Enquiry> {
    const res = await fetch(`/api/enquiries/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to fetch enquiry");

    const { data, success, message }: APIResponse<Enquiry> = await res.json();
    if (!success) throw new Error(message || "Failed to receive enquiry");

    return data;
}

export async function updateEnquiryStatus(
    id: string,
    status: string
): Promise<Enquiry> {
    const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to update status");

    const { success, data, message }: APIResponse<Enquiry> = await res.json();
    if (!success) throw new Error(message || "Failed to update enquiry");

    return data;
}

export async function deleteEnquiry(id: string): Promise<void> {
    const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok)
        throw new Error((await res.text()) || "Failed to delete enquiry");

    const { success, message }: APIResponse<void> = await res.json();
    if (!success) throw new Error(message || "Failed to delete enquiry");
}
