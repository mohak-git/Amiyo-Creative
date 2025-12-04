"use client";

import Loader from "@/components/Loader";
import { useEnquiries } from "@/hooks/useEnquiries";
import { useProjects } from "@/hooks/useProjects";

export default function AdminDashboard() {
    const { data: projects = [], isLoading: projectLoading } = useProjects();
    const { data: enquiries = [], isLoading: enquiryLoading } = useEnquiries();

    if (projectLoading || enquiryLoading) return <Loader />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-12 tracking-tighter uppercase text-white">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/30 p-8 border border-zinc-800 hover:border-zinc-600 transition-colors">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
                        Total Projects
                    </h2>
                    <p className="text-6xl font-bold text-white tracking-tighter">
                        {projects.length}
                    </p>
                </div>
                <div className="bg-zinc-900/30 p-8 border border-zinc-800 hover:border-zinc-600 transition-colors">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
                        Total Enquiries
                    </h2>
                    <p className="text-6xl font-bold text-white tracking-tighter">
                        {enquiries.length}
                    </p>
                </div>
            </div>
        </div>
    );
}
