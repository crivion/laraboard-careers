import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/inertia-react";
import MobileNavbar from "@/Components/MobileNavbar";

export default function Navbar({ scroll }) {
    return (
        <>
            <nav
                className={
                    scroll
                        ? "bg-white shadow-md fixed inset-x-0 z-20"
                        : "navi-bar fixed inset-x-0 z-20"
                }
            >
                <div className="max-w-screen-xl mx-auto px-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center py-1">
                            <Link href={route("homepage")}>
                                <ApplicationLogo />
                            </Link>
                            <Link href={route("homepage")}>
                                <span className="uppercase font-semibold hover:text-blue-800 text-2xl  text-neutral-800">
                                    LaraBoard
                                </span>
                            </Link>
                        </div>
                        <div className="items-center hidden md:flex">
                            <NavLink href={route("homepage")}>Home</NavLink>
                            <NavLink href="/team">Team</NavLink>
                            <NavLink href="/dashboard">Blog</NavLink>
                            <NavLink href="/dashboard">Contact</NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <MobileNavbar />
        </>
    );
}
