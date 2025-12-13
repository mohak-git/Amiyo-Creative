import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Amiyo Creative",
    description: "Cookie Policy for Amiyo Creative. Understand how and why we use cookies.",
};

export default function CookiePage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-foreground pt-24 md:pt-[15vh] pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-400">
                        Last detailed update: December 13, 2025
                    </p>
                </header>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
                        <p className="mb-4">
                            We use cookies to enhance your browsing experience, analyze our traffic, and personalize content. Specifically, we use cookies for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly. Without these cookies, the website may not perform as intended.</li>
                            <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                            <li><strong>Functionality Cookies:</strong> These allow the website to remember choices you make (such as your user name, language, or the region you are in) and provide enhanced, more personal features.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Managing Cookies</h2>
                        <p>
                            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
                        <p>
                            In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Google Analytics:</strong> One of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about our use of cookies, please contact us at: <a href="mailto:contact@amiyocreative.com" className="text-purple-400 hover:text-purple-300 transition-colors">contact@amiyocreative.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
