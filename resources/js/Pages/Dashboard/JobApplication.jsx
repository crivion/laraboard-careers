import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";
import StatusSpan from "@/Components/StatusSpan";
import Dropdown from "@/Components/Dropdown";

export default function jobApplication({ jobApplication, auth, errors }) {
    const updateStatus = (newStatus) => {
        console.log("update status clicked");
        Inertia.patch(
            route("job-application.update-status", {
                jobApplication: jobApplication.id,
                status: newStatus,
            })
        );
    };

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <Link href={route("dashboard")} className="hover:underline">
                        Dashboard
                    </Link>{" "}
                    &raquo; Job Application
                </h2>
            }
        >
            <Head title="Job Application" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full mb-5 text-right">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent leading-4 font-medium rounded-md text-white bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        Set Status As
                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <button
                                    className="px-3 py-1 block w-full text-left text-gray-800 hover:bg-gray-900 hover:text-white"
                                    onClick={(e) => updateStatus("new")}
                                >
                                    Set As New
                                </button>
                                <button
                                    className="px-3 py-1 block w-full text-left text-gray-800 hover:bg-gray-900 hover:text-white"
                                    onClick={(e) => updateStatus("shortlisted")}
                                >
                                    Shortlisted
                                </button>
                                <button
                                    className="px-3 py-1 block w-full text-left text-gray-800 hover:bg-gray-900 hover:text-white"
                                    onClick={(e) => updateStatus("dismissed")}
                                >
                                    Dismissed
                                </button>
                                <button
                                    className="px-3 py-1 block w-full text-left text-gray-800 hover:bg-gray-900 hover:text-white"
                                    onClick={(e) => updateStatus("interviewed")}
                                >
                                    Interviewed
                                </button>
                                <button
                                    className="px-3 py-1 block w-full text-left text-gray-800 hover:bg-gray-900 hover:text-white"
                                    onClick={(e) => updateStatus("hired")}
                                >
                                    Hired
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="md:flex">
                        <div className="w-full bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Job Applied For
                            </h3>
                            <div className="mt-2 text-gray-800">
                                <a
                                    href={route("jobDetails", {
                                        job: jobApplication.job,
                                    })}
                                    className="hover:underline text-blue-800 font-semibold"
                                    target="_blank"
                                >
                                    {jobApplication.job.job_title}
                                </a>
                            </div>
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Salary
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.job.salary}
                            </div>
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Department
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.job.department.department_name}
                            </div>
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Contract Type
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {
                                    jobApplication.job.contract_type
                                        .contract_type_name
                                }
                            </div>
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Location
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.job.location.location_name}
                            </div>
                        </div>
                        <div className="md:ml-5 mt-5 md:mt-0 w-full bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                                Application Status
                            </h3>
                            <StatusSpan status={jobApplication.status} />
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Applicant Name
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.name}
                            </div>

                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Email
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.email}
                            </div>
                            <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                                Phone
                            </h3>
                            <div className="mt-2 text-gray-800">
                                {jobApplication.phone}
                            </div>

                            <div className="mt-5 text-gray-800">
                                <a
                                    target="_blank"
                                    href={route('job-application.download-cv', { jobApplication })}
                                    className="px-3 py-1.5 rounded hover:bg-gray-700 bg-gray-900 font-semibold text-white"
                                >
                                    View CV PDF
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mt-5">
                        <h3 className="text-lg font-medium leading-6  text-gray-900">
                            Cover Letter
                        </h3>

                        {jobApplication.cover_letter ??
                            "-- nothing was entered in the cover letter form --"}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
