import React from "react";
import Navbar from "@/Components/Navbar";
import { useScroll } from "@/Hooks/useScroll";

export default function Front({ children }) {
    const scroll = useScroll();

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50">
            <Navbar scroll={scroll} />

            <div className="main-content flex-grow min-h-full pb-10">{children}</div>
        </div>
    );
}
