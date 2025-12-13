"use client";
import NavLinks from "@/components/ui/NavLinks";
// import SearchBar from "@/components/ui/SearchBar";
import { NavItems } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 1);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed z-1000 3xl:py-4 w-full transition-all duration-500 sm:shadow-[0px_0px_30px_60px_rgb(2,6,24)] ${
                isScrolled
                    ? "translate-y-6 px-6 sm:px-8 md:px-12 lg:px-14 3xl:px-30 rounded-full"
                    : "px-2 sm:px-14 md:px-20 lg:px-30 3xl:px-52"
            }`}>
            <div
                className={`absolute inset-0 -z-10 transition-all duration-500 ${
                    isScrolled
                        ? "bg-linear-to-r from-purple-800 to-orange-800 rounded-full scale-110 blur-[1px]"
                        : "bg-slate-950 blur-[2px]"
                }`}
            />
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center cursor-target justify-center">
                    <Link
                        href="/"
                        className="cursor-none max-w-20 3xl:max-w-36">
                        <Image
                            priority
                            src={"/logo.png"}
                            alt="logo"
                            width={400}
                            height={400}
                        />
                    </Link>
                </div>

                <div className="hidden md:block">
                    <NavLinks items={NavItems} />
                </div>

                {/* <div className="hidden md:flex justify-end items-center gap-2">
                    <SearchBar />
                </div> */}

                <div className="md:hidden flex items-center z-20">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={20} /> : <MdMenu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className={`md:hidden absolute flex flex-col justify-between gap-4 pb-3 transition-all duration-500 rounded-lg bg-purple-950 w-full top-0 pt-12 left-0 z-10`}>
                    <NavLinks
                        items={NavItems}
                        mobile={true}
                        onItemClick={() => setIsOpen(false)}
                    />
                    {/* <SearchBar /> */}
                </div>
            )}
        </div>
    );
};

export default Navbar;
