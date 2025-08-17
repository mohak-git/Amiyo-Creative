"use client";
import { NavItems } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import NavLinks from "./ui/NavLinks";
import SearchBar from "./ui/SearchBar";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed z-[1000] w-full transition-all duration-500 bg-purple-800 rounded-full shadow-[0px_0px_30px_80px_rgba(0,0,0)] ${
                isScrolled
                    ? "scale-95 translate-y-6 px-6 sm:px-8 md:px-12 lg:px-14 "
                    : "scale-[1.2] sm:scale-110 px-12 sm:px-14 md:px-26 lg:px-30"
            }`}
        >
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center cursor-target  justify-center">
                    <Link href="/">
                        <Image
                            src={"./logo.svg"}
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>

                <div className="hidden md:block">
                    <NavLinks
                        items={NavItems}
                        particleCount={15}
                        particleDistances={[90, 10]}
                        particleR={100}
                        animationTime={600}
                        timeVariance={300}
                        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                        mode="d"
                    />
                </div>

                <div className="hidden md:flex justify-end items-center gap-2">
                    <SearchBar />
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={20} /> : <MdMenu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className={`md:hidden absolute flex flex-col justify-between gap-4 pb-3 transition-all duration-500 rounded-lg bg-purple-800/40 w-full top-[3vh] pt-12 left-0 -z-1 ${
                        !isScrolled ? "px-6" : ""
                    }`}
                >
                    <SearchBar />
                </div>
            )}
        </div>
    );
};

export default Navbar;
