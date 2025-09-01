import ContactForm from "@/components/pages/Contact/ContactForm";
import ContactInfo from "@/components/pages/Contact/ContactInfo";
import Image from "next/image";

const Contact = () => {
    return (
        <main className="pt-[16vh]">
            <div className="min-h-screen relative bg-gradient-to-b from-transparent to-slate-950 text-white overflow-hidden">
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

                <div className="relative z-20 container mx-auto p-4">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        <ContactForm />
                        <ContactInfo />
                    </div>

                    <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/10 mt-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1386.612232612211!2d86.14538305189701!3d22.775395741771195!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4daa475a5cd%3A0xd87b53fadcd771a1!2sNational%20Institute%20of%20Technology%20Jamshedpur%20(NIT%20Jamshedpur)!5e0!3m2!1sen!2sin!4v1756649290223!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
