import { loginAdmin, LoginPayload, logoutAdmin } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
    return useMutation<void, Error, LoginPayload>({ mutationFn: loginAdmin });
}

export function useLogout() {
    return useMutation<void, Error, void>({ mutationFn: logoutAdmin });
}
