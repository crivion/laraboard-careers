import { Link } from "@inertiajs/inertia-react";

export default function JobCard() {
    return (
        <div className="rounded-lg p-5 border border-gray-100 shadow-sm mb-4 bg-white">
            <Link
                href={route("job-details", {
                    slug: "junior-graphic-designer-web",
                })}
                className="text-lg hover:text-neutral-800 text-blue-800 font-bold block"
            >
                Junior Graphic Designer (Web)
            </Link>

            <div className="mt-3 flex items-center space-x-5">
                <div className="text-neutral-600 flex items-center">
                    <img src="/assets/images/tag.svg" className="w-6" />{" "}
                    <span class="ml-1">Graphic Design</span>
                </div>
                <div className="text-neutral-600 flex items-center">
                    <img
                        src="/assets/images/location.svg"
                        className="w-4 h-4"
                    />{" "}
                    <span class="ml-1">New York, US</span>
                </div>
                <div className="text-neutral-600 flex items-center">
                    <img src="/assets/images/money.svg" className="w-4 h-4" />{" "}
                    <span class="ml-1">$85,000 pa</span>
                </div>
                <div className="text-neutral-600 flex items-center">
                    <img
                        src="/assets/images/contract.svg"
                        className="w-4 h-4"
                    />{" "}
                    <span class="ml-1">Full Time</span>
                </div>
            </div>
        </div>
    );
}
