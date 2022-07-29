import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Front from "@/Layouts/Front";
import JobCard from "@/Components/JobCard";
import { usePage } from "@inertiajs/inertia-react";
import JobFilters from "@/Components/JobFilters";

export default function Welcome() {
    const { images } = usePage().props;
    const loop = [1, 2, 3, 4, 5];

    return (
        <Front>
            <Head title="LaraBoard" />
            <div className="home-header mb-5">
                <div className="max-w-screen-xl mx-auto lg:flex items-center space-20 px-3">
                    <div className="md:w-2/3">
                        <h1 className="font-semibold text-6xl text-blue-800">
                            LaraBoard Careers
                        </h1>
                        <h2 className="text-3xl mt-10 text-zinc-700 leading-snug">
                            Check our available positions - we are always
                            looking for great people to join our company
                        </h2>
                    </div>
                    <div className="md:w-3/3 pt-10 lg:pt-0">
                        <img
                            src={images.homepageHeaderImage}
                            alt=""
                            className="max-h-[450px]"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto md:flex space-20 px-3">
                <div className="md:w-2/3">
                    {loop.map((i) => {
                        return <JobCard />;
                    })}
                </div>

                <div className="md:w-1/3 pt-10 md:pt-0">
                    <JobFilters />
                </div>
            </div>
        </Front>
    );
}
