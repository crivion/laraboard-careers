import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { useScroll } from "@/Hooks/useScroll";

export default function Front({ children }) {
    const scroll = useScroll();
    const { images } = usePage().props;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar scroll={scroll} />

            <div className="main-content flex-grow min-h-full">{children}</div>
        </div>
    );
}
