import { motion } from "framer-motion";

export const RisingDots = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                    }}
                    animate={{
                        y: "-20px",
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                    }}
                />
            ))}
        </div>
    );
};
