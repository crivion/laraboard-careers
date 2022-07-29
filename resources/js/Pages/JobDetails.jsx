import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Front from "@/Layouts/Front";
import JobCard from "@/Components/JobCard";
import { usePage } from "@inertiajs/inertia-react";
import JobFilters from "@/Components/JobFilters";

export default function JobDetails() {
    return (
        <Front>
            <Head title="Junior Graphic Designer -LaraBoard" />
            <div className="inner-header mb-5">
                <div className="max-w-screen-xl mx-auto px-3 md:text-center">
                    <h1 className="jobTitle text-3xl font-semibold">
                        Junior Graphic Designer (Web)
                    </h1>

                    <div className="mt-5 flex md:flex-row flex-col md:items-center md:space-x-5 md:justify-center">
                        <div className="text-neutral-600 flex items-center">
                            <img src="/assets/images/tag.svg" className="w-4" />{" "}
                            <span className="ml-1">Graphic Design</span>
                        </div>
                        <div className="text-neutral-600 flex items-center">
                            <img
                                src="/assets/images/location.svg"
                                className="w-4 h-4"
                            />{" "}
                            <span className="ml-1">New York, US</span>
                        </div>
                        <div className="text-neutral-600 flex items-center">
                            <img
                                src="/assets/images/money.svg"
                                className="w-4 h-4"
                            />{" "}
                            <span className="ml-1">$85,000 pa</span>
                        </div>
                        <div className="text-neutral-600 flex items-center">
                            <img
                                src="/assets/images/contract.svg"
                                className="w-4 h-4"
                            />{" "}
                            <span className="ml-1">Full Time</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto md:flex space-20 px-3">
                <div className="md:w-2/3">
                    <div className="job-detail-description text-neutral-800">
                        <h3 className="title text-xl font-semibold mb-3">
                            Job Description
                        </h3>
                        <div className="leading-relaxed">
                            As a Product Designer, you will work within a
                            Product Delivery Team fused with UX, engineering,
                            product and data talent. You will help the team
                            design beautiful interfaces that solve business
                            challenges for our clients. We work with a number of
                            Tier 1 banks on building web-based applications for
                            AML, KYC and Sanctions List management workflows.
                            This role is ideal if you are looking to segue your
                            career into the FinTech or Big Data arenas.
                        </div>
                        <h3 className="title text-xl font-semibold mt-8 mb-3">
                            Key Responsibilities
                        </h3>
                        <ul className="list-circle space-b-50">
                            <li>
                                Be involved in every step of the product design
                                cycle from discovery to developer handoff and
                                user acceptance testing.
                            </li>
                            <li>
                                Work with BAs, product managers and tech teams
                                to lead the Product Design
                            </li>
                            <li>
                                Maintain quality of the design process and
                                ensure that when designs are translated into
                                code they accurately reflect the design
                                specifications.
                            </li>
                            <li>
                                Accurately estimate design tickets during
                                planning sessions.
                            </li>
                            <li>
                                Contribute to sketching sessions involving
                                non-designersCreate, iterate and maintain UI
                                deliverables including sketch files, style
                                guides, high fidelity prototypes, micro
                                interaction specifications and pattern
                                libraries.
                            </li>
                            <li>
                                Ensure design choices are data led by
                                identifying assumptions to test each sprint, and
                                work with the analysts in your team to plan
                                moderated usability test sessions.
                            </li>
                            <li>
                                Design pixel perfect responsive UI’s and
                                understand that adopting common interface
                                patterns is better for UX than reinventing the
                                wheel
                            </li>
                            <li>
                                Present your work to the wider business at Show
                                &amp; Tell sessions.
                            </li>
                        </ul>
                        <h3 className="title text-xl font-semibold mt-8 mb-3">
                            Skill &amp; Experience
                        </h3>
                        <ul className="list-circle">
                            <li>
                                You have at least 3 years’ experience working as
                                a Product Designer.
                            </li>
                            <li>
                                You have experience using Sketch and InVision or
                                Framer X
                            </li>
                            <li>
                                You have some previous experience working in an
                                agile environment – Think two-week sprints.
                            </li>
                            <li>
                                You are familiar using Jira and Confluence in
                                your workflow
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="md:w-1/3 pt-10 md:pt-0">
                    <div className="rounded-lg bg-light-blue p-5 ml-5 mb-6">
                        <h3 className="title text-xl font-semibold mb-5">
                            HR Contact Details
                        </h3>
                        Jane Doe
                        <br />
                        Tel: <br />
                        EMail: <br />
                    </div>

                    <div className="rounded-lg bg-light-blue p-5 ml-5">
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
