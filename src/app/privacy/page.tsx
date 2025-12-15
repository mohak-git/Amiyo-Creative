import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Amiyo Creative",
    description:
        "Privacy Policy for Amiyo Creative. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-foreground pt-24 md:pt-[15vh] pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-blue-500">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400">
                        Last detailed update: December 13, 2025
                    </p>
                </header>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to Amiyo Creative (&quot;Company&quot;,
                            &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We
                            respect your privacy and are committed to protecting
                            your personal data. This privacy policy will inform
                            you as to how we look after your personal data when
                            you visit our website (regardless of where you visit
                            it from) and tell you about your privacy rights and
                            how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            2. Information We Collect
                        </h2>
                        <p className="mb-4">
                            We may collect, use, store, and transfer different
                            kinds of personal data about you which we have
                            grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Identity Data:</strong> includes first
                                name, last name, username or similar identifier.
                            </li>
                            <li>
                                <strong>Contact Data:</strong> includes email
                                address and telephone numbers.
                            </li>
                            <li>
                                <strong>Technical Data:</strong> includes
                                internet protocol (IP) address, your login data,
                                browser type and version, time zone setting and
                                location, browser plug-in types and versions,
                                operating system and platform, and other
                                technology on the devices you use to access this
                                website.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> includes
                                information about how you use our website and
                                services.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            3. How We Use Your Data
                        </h2>
                        <p className="mb-4">
                            We will only use your personal data when the law
                            allows us to. Most commonly, we will use your
                            personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                Where we need to perform the contract we are
                                about to enter into or have entered into with
                                you.
                            </li>
                            <li>
                                Where it is necessary for our legitimate
                                interests (or those of a third party) and your
                                interests and fundamental rights do not override
                                those interests.
                            </li>
                            <li>
                                Where we need to comply with a legal obligation.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            4. Data Security
                        </h2>
                        <p>
                            We have put in place appropriate security measures
                            to prevent your personal data from being
                            accidentally lost, used or accessed in an
                            unauthorized way, altered or disclosed. In addition,
                            we limit access to your personal data to those
                            employees, agents, contractors and other third
                            parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            5. Third-Party Links
                        </h2>
                        <p>
                            This website may include links to third-party
                            websites, plug-ins and applications. Clicking on
                            those links or enabling those connections may allow
                            third parties to collect or share data about you. We
                            do not control these third-party websites and are
                            not responsible for their privacy statements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            6. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this privacy policy
                            or our privacy practices, please contact us at:{" "}
                            <a
                                href="mailto:contact@amiyocreative.com"
                                className="text-purple-400 hover:text-purple-300 transition-colors">
                                contact@amiyocreative.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
