"use client";

import Loader from "@/components/Loader";
import { useEnquiries } from "@/hooks/useEnquiries";
import { useProjects } from "@/hooks/useProjects";
import { useTestimonials } from "@/hooks/useTestimonials";

export default function AdminDashboard() {
    const { data: projects = [], isLoading: projectLoading } = useProjects();
    const { data: enquiries = [], isLoading: enquiryLoading } = useEnquiries();
    const { data: testimonials = [], isLoading: testimonialLoading } =
        useTestimonials();

    if (projectLoading || enquiryLoading || testimonialLoading)
        return <Loader />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 tracking-tighter uppercase text-white">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-zinc-900/30 p-4 border border-zinc-800 hover:border-zinc-600 transition-colors my-auto">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                        Total Projects
                    </h2>
                    <p className="text-4xl font-bold text-white tracking-tighter">
                        {projects.length}
                    </p>
                </div>
                <div className="bg-zinc-900/30 p-4 border border-zinc-800 hover:border-zinc-600 transition-colors my-auto">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                        Total Enquiries
                    </h2>
                    <p className="text-4xl font-bold text-white tracking-tighter">
                        {enquiries.length}
                    </p>
                </div>
                <div className="bg-zinc-900/30 p-4 border border-zinc-800 hover:border-zinc-600 transition-colors my-auto">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                        Total Testimonials
                    </h2>
                    <p className="text-4xl font-bold text-white tracking-tighter">
                        {testimonials.length}
                    </p>
                </div>
            </div>
        </div>
    );
}
