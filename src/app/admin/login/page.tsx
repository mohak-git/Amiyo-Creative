"use client";

import Loader from "@/components/Loader";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
    const { mutateAsync: login, isPending } = useLogin();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login({ email, password });
            toast.success("Logged in successfully");
            router.push("/admin");
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";

            console.error("Login failed:", error);
            toast.error(errorMessage);
        }
    };

    if (isPending) return <Loader />;
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-zinc-950 p-12 border border-zinc-800 w-full max-w-md shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">
                        Admin
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors"
                            required
                            placeholder="admin@amiyo.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 bg-zinc-900 border border-zinc-800 text-white focus:border-white outline-none transition-colors pr-12"
                                required
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-zinc-400 hover:text-white focus:outline-none">
                                {showPassword ? (
                                    <FaEyeSlash className="size-5" />
                                ) : (
                                    <FaEye className="size-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-4 px-4 uppercase tracking-widest transition-colors disabled:opacity-50 mt-4">
                        {isPending ? "Authenticating..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
