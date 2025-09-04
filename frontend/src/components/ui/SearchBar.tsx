"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const toggleSearch = useCallback(() => setIsOpen((prev) => !prev), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key?.toLowerCase() === "k") {
                e.preventDefault();
                toggleSearch();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSearch]);

    return (
        <div className="w-full relative flex justify-center items-center">
            <button
                onClick={toggleSearch}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-none cursor-target"
            >
                <FaSearch className="text-white size-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.input
                        key="search-input"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        placeholder="Search..."
                        className="ml-2 px-3 py-1.5 rounded-full bg-red text-black bg-white outline-none text-xs shadow-md placeholder-gray-500 cursor-target"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
