"use client";

import { useContactMutation } from "@/hooks/useContactMutation";
import { ContactFormPayload, ContactFormSchema } from "@/lib/api/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const ContactForm = () => {
    const { register, handleSubmit, reset } = useForm<ContactFormPayload>({
        resolver: zodResolver(ContactFormSchema),
    });

    const { mutate, isPending } = useContactMutation();

    const onSubmit = (data: ContactFormPayload) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Message sent successfully!");
                reset();
            },
            onError: (err) => {
                toast.error(
                    err.message || "An error occurred. Please try again."
                );
            },
        });
    };

    const onError = (errors: FieldErrors<ContactFormPayload>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) toast.error(firstError.message);
    };

    return (
        <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl"
                variants={itemVariants}
            >
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Start a Project
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <motion.div className="group" variants={itemVariants}>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Full Name *
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    className="cursor-none cursor-target w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div className="group" variants={itemVariants}>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email Address *
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className="cursor-none cursor-target w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Phone */}
                    <motion.div className="group" variants={itemVariants}>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Phone Number *
                        </label>
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                id="phone"
                                type="tel"
                                {...register("phone")}
                                className="cursor-none cursor-target w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white"
                                placeholder="+123456789"
                            />
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div className="group" variants={itemVariants}>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Message *
                        </label>
                        <textarea
                            id="message"
                            {...register("message")}
                            rows={6}
                            className="cursor-none cursor-target w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={isPending}
                        className="cursor-none cursor-target w-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isPending ? (
                            <>
                                <motion.div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <span>Send Message</span>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ContactForm;
