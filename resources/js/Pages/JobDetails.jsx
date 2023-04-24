import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Front from "@/Layouts/Front";
import t from "@/Hooks/useTranslate";
import ApplyForm from "@/Components/ApplyForm";
import HRRepresentative from "@/Components/HRRepresentative";

export default function JobDetails({ job, lang }) {
    return (
        <Front>
            <Head title={job.job_title} />
            <div className="inner-header my-5">
                <div className="max-w-screen-xl mx-auto px-3 pt-3">
                    {job.isExpired && (
                        <div className="mt-10 bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {t("This job is expired and only you can see it while being logged in ", lang)}
                        </div>
                    )}
                    <h1 className="jobTitle font-semibold text-5xl text-blue-800 mt-10">
                        {job.job_title}
                    </h1>
                    <div className="mt-5 flex md:flex-row flex-col flex-wrap md:items-center md:space-x-5">
                        <div className="flex items-center text-2xl mt-3 text-zinc-700">
                            <img src="/assets/images/tag.svg" className="w-8" />{" "}
                            <span className="ml-1">
                                {job.department.department_name}
                            </span>
                        </div>
                        <div className="flex items-center text-2xl mt-3 text-zinc-700">
                            <img
                                src="/assets/images/location.svg"
                                className="w-8 h-8"
                            />{" "}
                            <span className="ml-1">
                                {job.location.location_name}
                            </span>
                        </div>
                        <div className="flex items-center text-2xl mt-3 text-zinc-700">
                            <img
                                src="/assets/images/money.svg"
                                className="w-8 h-8"
                            />{" "}
                            <span className="ml-1">{job.salary}</span>
                        </div>
                        <div className="flex items-center text-2xl mt-3 text-zinc-700">
                            <img
                                src="/assets/images/contract.svg"
                                className="w-8 h-8"
                            />{" "}
                            <span className="ml-1">
                                {job.contract_type.contract_type_name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto lg:flex space-20 px-3">
                <div className="lg:w-2/3">
                    <div className="job-detail-description text-neutral-800">
                        <h3 className="title text-xl font-semibold mb-3">
                            {t("Job Description", lang)}
                        </h3>
                        <div
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: job.job_description,
                            }}
                        ></div>

                        {job.key_responsibilities && (
                            <>
                                <h3 className="title text-xl font-semibold mt-8 mb-3">
                                    {t("Key Responsibilities", lang)}
                                </h3>
                                <div
                                    className="leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: job.key_responsibilities,
                                    }}
                                ></div>
                            </>
                        )}

                        {job.skills_and_experience && (
                            <>
                                <h3 className="title text-xl font-semibold mt-8 mb-3">
                                    {t("Skills & Experience", lang)}
                                </h3>
                                <div
                                    className="leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: job.skills_and_experience,
                                    }}
                                ></div>
                            </>
                        )}
                    </div>
                </div>

                <div className="lg:w-1/3 pt-10 md:pt-0">
                    <HRRepresentative job={job} lang={lang} />
                    <ApplyForm job={job} lang={lang} />
                </div>
            </div>
        </Front>
    );
}
