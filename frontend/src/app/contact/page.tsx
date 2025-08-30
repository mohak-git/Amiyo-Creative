import ContactForm from "@/components/pages/Contact/ContactForm";
import ContactInfo from "@/components/pages/Contact/ContactInfo";
import Image from "next/image";

const Contact = () => {
    return (
        <main className="pt-[16vh]">
            <div className="min-h-screen relative bg-gradient-to-b from-transparent to-slate-950 text-white overflow-hidden">
                {/* --- Background --- */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <div>
                    <Image
                        src="dddivided.svg"
                        height={200}
                        width={200}
                        alt="bg"
                        className="absolute blur-sm right-0"
                    />
                </div>

                <div className="relative z-20 container mx-auto p-4">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
