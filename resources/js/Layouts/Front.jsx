import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { useScroll } from "@/Hooks/useScroll";

export default function Front({ children }) {
    const scroll = useScroll();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar scroll={scroll} />
            <div>
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="main-content flex-grow min-h-full">{children}</div>
        </div>
    );
}
