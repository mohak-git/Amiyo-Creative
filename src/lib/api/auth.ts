import { parseAPIResponse } from "@/constants/constants";

export interface LoginPayload {
    email: string;
    password: string;
}

export async function loginAdmin(payload: LoginPayload): Promise<void> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    await parseAPIResponse<void>(res, "Failed to login");
}

export async function logoutAdmin(): Promise<void> {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    await parseAPIResponse<void>(res, "Failed to logout");
}
