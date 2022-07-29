import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Front from "@/Layouts/Front";
import JobCard from "@/Components/JobCard";
import { usePage } from "@inertiajs/inertia-react";
import JobFilters from "@/Components/JobFilters";

export default function JobDetails({ job }) {
    return (
        <Front>
            <Head title={job.job_title} />
            <div className="inner-header mb-5">
                <div className="max-w-screen-xl mx-auto px-3 pt-3">
                    {job.isExpired && (
                        <div className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            This job is expired and only you can see it while
                            being logged in
                        </div>
                    )}

                    <h1 className="jobTitle font-semibold text-5xl text-blue-800">
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
                            Job Description
                        </h3>
                        <div className="leading-relaxed">
                            {job.job_description}
                        </div>

                        {job.key_responsibilities && (
                            <>
                                <h3 className="title text-xl font-semibold mt-8 mb-3">
                                    Key Responsibilities
                                </h3>
                                <div className="leading-relaxed">
                                    {job.key_responsibilities}
                                </div>
                            </>
                        )}

                        {job.skills_and_experience && (
                            <>
                                <h3 className="title text-xl font-semibold mt-8 mb-3">
                                    Skill &amp; Experience
                                </h3>
                                <div className="leading-relaxed">
                                    {job.skills_and_experience}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="lg:w-1/3 pt-10 md:pt-0">
                    <div className="rounded-lg bg-light-blue p-5 lg:ml-5 mt-5 lg:mt-0 mb-6">
                        <h3 className="title text-xl font-semibold mb-3">
                            HR Representative
                        </h3>
                        <h4 className="text-lg text-neutral-800">
                            {job.user.name}
                        </h4>
                        {job.user.contact_phone && (
                            <div className="text-neutral-800 flex flex-wrap items-center">
                                <img
                                    src="/assets/images/phone.svg"
                                    className="w-4 mr-1"
                                />{" "}
                                {job.user.contact_phone}
                            </div>
                        )}
                        {job.user.email && (
                            <div className="text-neutral-800 flex flex-wrap items-center">
                                <img
                                    src="/assets/images/email.svg"
                                    className="w-4 mr-1"
                                />
                                {job.user.email}
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg bg-light-blue p-5 lg:ml-5">
                        <h3 className="title text-xl font-semibold mb-5">
                            Apply to this position
                        </h3>
                        <form name="applyForm" id="applyForm">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                                className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3"
                            />
                            <input
                                type="text"
                                name="contactEmail"
                                id="contactEmail"
                                placeholder="Contact Email"
                                className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3"
                            />
                            <input
                                type="text"
                                name="contactPhone"
                                id="contactPhone"
                                placeholder="Contact Phone"
                                className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3"
                            />
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Your letter of intent"
                                rows="5"
                                className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3"
                            />
                            Attach Resume (PDF/DOC/DOCX):
                            <p>
                                <input type="checkbox" name="terms" /> I accept
                                the terms and conditions &amp; privacy policy
                            </p>
                            <button className="bg-blue-800 text-white font-semibold py-2.5 px-8 rounded mt-5">
                                Send Application
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Front>
    );
}
