import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export function FAQsComp({ items }: { items: { q: string; a: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = (index: number) =>
        setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="space-y-6">
            {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={i}
                        className={`group bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-sm border ${
                            isOpen
                                ? "border-purple-500/40"
                                : "border-slate-700/50"
                        } rounded-2xl transition-all duration-300 overflow-hidden p-5`}
                    >
                        <button
                            onClick={() => toggle(i)}
                            className="w-full flex text-left justify-between items-center cursor-none text-lg 3xl:text-3xl text-white"
                        >
                            <span className={isOpen ? "text-purple-300" : ""}>
                                {item.q}
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 cursor-target p-1 size-6 3xl:size-8 ${
                                    isOpen ? "rotate-180 text-purple-300" : ""
                                }`}
                            />
                        </button>

                        <div
                            className={`grid transition-all duration-500 ease-in-out ${
                                isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div
                                className={`overflow-hidden px-5 text-slate-300 3xl:text-2xl leading-relaxed`}
                            >
                                {item.a}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
