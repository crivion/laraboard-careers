import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import MobileNavbar from "@/Components/MobileNavbar";

export default function Navbar() {
    return (
        <>
            <nav className="navi-bar fixed inset-x-0 bg-white z-20">
                <div className="max-w-screen-xl mx-auto px-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center py-1">
                            <a href="/">
                                <ApplicationLogo />
                            </a>
                            <a href="/">
                                <span className="uppercase font-semibold hover:text-blue-800 text-2xl  text-neutral-800">
                                    LaraBoard
                                </span>
                            </a>
                        </div>
                        <div className="items-center hidden md:flex">
                            <NavLink href="/dashboard">Home</NavLink>
                            <NavLink href="/dashboard">Team</NavLink>
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
