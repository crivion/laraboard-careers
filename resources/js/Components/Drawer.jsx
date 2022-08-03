import { useEffect, useState } from "react";

export default function Drawer({ isOpen, onClose, children }) {
    return (
        <nav
            className={`${
                isOpen ? "" : "hidden"
            } navbar drawer-nav w-72 absolute overflow-x-scroll bg-white top-0 h-screen navbar-open z-30 left-0 border-r-2`}
        >
            <div className="flex pr-2 pt-5 justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold pt-2 ml-5 text-neutral-800">
                        Filters
                    </h1>
                </div>
                <div>
                    <button
                        onClick={(e) => onClose()}
                        className="text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-black"
                    >
                        X Close
                    </button>
                </div>
            </div>

            {children}
        </nav>
    );
}
