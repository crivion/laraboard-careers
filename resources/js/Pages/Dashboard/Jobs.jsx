import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import LinkButton from "@/Components/LinkButton";
export default function Jobs(props) {
    const jobs = props.jobs;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Jobs Overview
                </h2>
            }
        >
            <Head title="Jobs Overview" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <LinkButton className="mb-5" href={route("jobs.create")}>
                        Create Job Listing
                    </LinkButton>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {jobs.data.map((job) => job.job_title)}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
