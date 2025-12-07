import { parseAPIResponse } from "@/constants/constants";
import { Enquiry } from "@/constants/types";
import {
    EnquiryFormPayload,
    EnquiryFormResponse,
} from "@/lib/utils/validation";

export async function fetchEnquiries(): Promise<Enquiry[]> {
    const res = await fetch("/api/enquiries", {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });

    const data = await parseAPIResponse<Enquiry[]>(
        res,
        "Failed to fetch enquiries"
    );
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

    const data = await parseAPIResponse<EnquiryFormResponse>(
        res,
        "Failed to create enquiry"
    );
    return data;
}

export async function deleteEnquiries(ids: string[]): Promise<void> {
    const res = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    await parseAPIResponse<void>(res, "Failed to delete enquiries");
}

export async function deleteAllEnquiries(): Promise<void> {
    const res = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
    });
    await parseAPIResponse<void>(res, "Failed to delete all enquiries");
}

export async function fetchEnquiry(id: string): Promise<Enquiry> {
    const res = await fetch(`/api/enquiries/${id}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 * 5 },
    });

    const data = await parseAPIResponse<Enquiry>(
        res,
        "Failed to fetch enquiry"
    );
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

    const data = await parseAPIResponse<Enquiry>(
        res,
        "Failed to update enquiry"
    );
    return data;
}

export async function deleteEnquiry(id: string): Promise<void> {
    const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    await parseAPIResponse<void>(res, "Failed to delete enquiry");
}
