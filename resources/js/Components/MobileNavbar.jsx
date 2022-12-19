export default function MobileNavbar() {
    return (
        <nav className="hidden navbar drawer-nav w-64 absolute overflow-x-scroll bg-zinc-50 top-0 h-screen navbar-open z-30 right-0">
            <div className="flex pr-2 pt-5 justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold pt-2 ml-5 text-neutral-800">
                        Navigation
                    </h1>
                </div>
                <div>
                    <a
                        href=""
                        className="text-2xl text-neutral-800"
                        id="close-drawer-nav"
                    >
                        <i className="far fa-times-circle" />
                    </a>
                </div>
            </div>
            <ul className="list-none text-neutral-700 font-semibold">
                <li className="my-3 ml-5">
                    <a href="/" className="hover:text-pink-600">
                        Home
                    </a>
                </li>
                <li className="my-3 ml-5">
                    <a
                        href="{{ route('explore') }}"
                        className="hover:text-pink-600"
                    >
                        Our Team
                    </a>
                </li>
                <li className="my-3 ml-5">
                    <a
                        href="{{ route('register') }}"
                        className="hover:text-pink-600"
                    >
                        Terms & Conditions
                    </a>
                </li>
                <li className="my-3 ml-5">
                    <a
                        href="{{ route('register') }}"
                        className="hover:text-pink-600"
                    >
                        Privacy Policy
                    </a>
                </li>
            </ul>
        </nav>
    );
}
