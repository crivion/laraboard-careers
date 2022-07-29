import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? "inline-flex items-center px-4 pt-1 border-b-2 border-indigo-400 font-semibold leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                    : "inline-flex items-center px-4 pt-1 border-b-2 border-transparent font-semibold leading-5 text-gray-700 hover:text-blue-800 focus:outline-none focus:text-gray-700 focus:border-pink-600 transition duration-150 ease-in-out"
            }
        >
            {children}
        </Link>
    );
}
