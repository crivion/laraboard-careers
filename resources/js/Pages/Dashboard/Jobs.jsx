import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import LinkButton from "@/Components/LinkButton";
import TableHead from "@/Components/TableHead";
import TableTd from "@/Components/TableTd";
import DashboardJobsFilters from "@/Components/DashboardJobsFilters";
import Pagination from "@/Components/Pagination";

export default function Jobs(props) {
    const jobs = props.jobs;
    const departments = props.departments;
    const locations = props.locations;
    const queryFilters = props.queryFilters;

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
                    <DashboardJobsFilters
                        departments={departments}
                        locations={locations}
                        queryFilters={queryFilters}
                    />

                    <LinkButton className="mb-5" href={route("jobs.create")}>
                        Create Job Listing
                    </LinkButton>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Job Title",
                                    "Applicants",
                                    "Department",
                                    "Location",
                                    "Contract Type",
                                    "Created At",
                                    "View",
                                ]}
                            />
                            <tbody>
                                {jobs.data.map((job) => (
                                    <tr key={job.id}>
                                        <TableTd field="ID">{job.id}</TableTd>
                                        <TableTd field="Job Title">
                                            <a
                                                href={route("jobDetails", {
                                                    job: job.slug,
                                                })}
                                                target="_blank"
                                                className="text-blue-800 hover:underline"
                                            >
                                                {job.job_title}
                                            </a>
                                            {props.auth.user.user_type ===
                                                "admin" && (
                                                <>
                                                    <p className=" text-gray-500 text-sm">
                                                        Created By:{" "}
                                                        {job.user.name}
                                                    </p>
                                                </>
                                            )}
                                        </TableTd>
                                        <TableTd field="Applicants">
                                            {job.applications_count}
                                        </TableTd>
                                        <TableTd field="Department">
                                            {job.department.department_name}
                                        </TableTd>
                                        <TableTd field="Location">
                                            {job.location.location_name}
                                        </TableTd>
                                        <TableTd field="Contract Type">
                                            {
                                                job.contract_type
                                                    .contract_type_name
                                            }
                                        </TableTd>
                                        <TableTd field="Created At">
                                            {job.humanCreatedAt}
                                        </TableTd>
                                        <TableTd field="View">
                                            <Link
                                                className=" px-3 rounded py-1.5 text-gray-900 hover:underline font-semibold"
                                                href={route("jobs.edit", {
                                                    job: job.slug,
                                                })}
                                            >
                                                Manage
                                            </Link>
                                        </TableTd>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={jobs.links} />
                </div>
            </div>
        </Authenticated>
    );
}
