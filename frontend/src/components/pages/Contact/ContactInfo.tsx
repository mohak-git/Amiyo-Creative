"use client";

import { motion, Variants } from "framer-motion";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const ContactInfo = () => {
    return (
        <motion.div
            className="space-y-8 my-auto"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="flex flex-col justify-center items-center p-2"
                variants={itemVariants}
            >
                <h1 className="text-3xl 3xl:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Get In Touch
                </h1>
                <p className="text-base 3xl:text-2xl text-gray-400 leading-relaxed text-center">
                    Ready to transform your vision into reality? Let&apos;s
                    discuss your next big project.
                </p>
            </motion.div>

            <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-lg"
                variants={itemVariants}
            >
                <h3 className="text-2xl 3xl:text-4xl text-center font-bold mt-2 mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Let&apos;s Connect
                </h3>

                <div className="space-y-2">
                    <motion.div
                        className="flex items-center space-x-4 p-2 rounded-xl hover:bg-white/10 transition-all"
                        variants={itemVariants}
                    >
                        <FaMapMarkerAlt className="size-6 3xl:size-8 text-purple-400" />
                        <p className="text-gray-400 text-sm 3xl:text-xl">
                            123 Creative Street
                            <br /> Digital District, CD 12345
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-4 p-2 rounded-xl hover:bg-white/10 transition-all"
                        variants={itemVariants}
                    >
                        <FaPhone className="size-6 3xl:size-8 text-purple-400" />
                        <p className="text-gray-400 text-sm 3xl:text-xl">
                            +1 (555) 123-4567
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-4 p-2 rounded-xl hover:bg-white/10 transition-all"
                        variants={itemVariants}
                    >
                        <FaEnvelope className="size-6 3xl:size-8 text-purple-400" />
                        <p className="text-gray-400 text-sm 3xl:text-xl">
                            hello@amiyocreative.com
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-4 p-2 rounded-xl hover:bg-white/10 transition-all"
                        variants={itemVariants}
                    >
                        <FaClock className="size-6 3xl:size-8 text-purple-400" />
                        <p className="text-gray-400 text-sm 3xl:text-xl">
                            Mon - Fri: 9:00 AM - 6:00 PM
                            <br /> Weekends: By appointment
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ContactInfo;
