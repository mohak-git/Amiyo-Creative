import ContactForm from "@/components/pages/Contact/ContactForm";
import ContactInfo from "@/components/pages/Contact/ContactInfo";
import Image from "next/image";

const Contact = () => {
    return (
        <main className="md:pt-[10vh]">
            <div className="pt-[6vh] px-6 sm:px-10 3xl:px-30 relative bg-linear-to-b from-transparent to-slate-950 text-white overflow-hidden">
                {/* --- Background --- */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
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

                <div className="relative z-20 container mx-auto py-10 sm:py-0 mb-4">
                    <div className="grid lg:grid-cols-3 gap-12 mx-auto">
                        <ContactForm />
                        <ContactInfo />
                    </div>

                    {/* <div className="mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/10 mt-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4410.511572528896!2d86.14727399711373!3d22.773433066386442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1756824796327!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-lg"></iframe>
                    </div> */}
                </div>
            </div>
        </main>
    );
};

export default Contact;
