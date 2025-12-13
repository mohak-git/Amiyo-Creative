import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Amiyo Creative",
    description: "Terms and Conditions for using Amiyo Creative services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-foreground pt-24 md:pt-[15vh] pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400">
                        Last detailed update: December 13, 2025
                    </p>
                </header>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Amiyo Creative ("we," "us" or "our"), concerning your access to and use of our website and services. By accessing the site, you have read, understood, and agreed to be bound by all of these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Representations</h2>
                        <p className="mb-4">
                            By using the Site, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Prohibited Activities</h2>
                        <p>
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of India. Amiyo Creative and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                        <p>
                            To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:contact@amiyocreative.com" className="text-purple-400 hover:text-purple-300 transition-colors">contact@amiyocreative.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
