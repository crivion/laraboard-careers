import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Front from "@/Layouts/Front";
import TeamMemberCard from "@/Components/TeamMemberCard";

export default function Team() {
    const loop = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <Front>
            <Head title="Team - LaraBoard" />
            <div className="inner-header mb-5">
                <div className="max-w-screen-xl mx-auto px-3 md:text-center">
                    <h1 className="jobTitle text-3xl font-semibold">
                        Meet Our Awesome Team
                    </h1>
                    <h2 className="text-neutral-600 mt-3 text-lg">
                        We are all part of the family and the recipe to great
                        success.
                    </h2>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-3 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {loop.map((i) => {
                    return <TeamMemberCard />;
                })}
            </div>
        </Front>
    );
}
