"use client";

import Loader from "@/components/Loader";
import { useEnquiries } from "@/hooks/useEnquiries";
import { useLogos } from "@/hooks/useLogos";
import { useProjects } from "@/hooks/useProjects";
import { useTestimonials } from "@/hooks/useTestimonials";

export default function AdminDashboard() {
    const { data: projects = [], isLoading: projectLoading } = useProjects();
    const { data: enquiries = [], isLoading: enquiryLoading } = useEnquiries();
    const { data: testimonials = [], isLoading: testimonialLoading } =
        useTestimonials();
    const { data: logos = [], isLoading: logoLoading } = useLogos();

    if (projectLoading || enquiryLoading || testimonialLoading || logoLoading)
        return <Loader />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 tracking-tighter uppercase text-white">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: "Total Projects", count: projects.length },
                    { title: "Total Enquiries", count: enquiries.length },
                    { title: "Total Testimonials", count: testimonials.length },
                    { title: "Total Logos", count: logos.length },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900/30 p-4 border border-zinc-800 hover:border-zinc-600 transition-colors my-auto">
                        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                            {item.title}
                        </h2>
                        <p className="text-4xl font-bold text-white tracking-tighter">
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
