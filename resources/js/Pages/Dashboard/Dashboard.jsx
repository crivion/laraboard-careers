import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";
import TableHead from "@/Components/TableHead";
import TableTd from "@/Components/TableTd";
import StatusSpan from "@/Components/StatusSpan";
import JobApplicationFilters from "@/Components/JobApplicationFilters";
import Pagination from "@/Components/Pagination";

export default function Dashboard(props) {
    const applications = props.applications;
    const departments = props.departments;
    const locations = props.locations;
    const myPostedJobs = props.myPostedJobs;
    const queryFilters = props.queryFilters;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Job Applications
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <JobApplicationFilters
                        departments={departments}
                        locations={locations}
                        myPostedJobs={myPostedJobs}
                        queryFilters={queryFilters}
                    />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {!applications.data.length && (
                            <div className="p-6 font-semibold text-lg">
                                No applicants applied on any of your posted jobs
                            </div>
                        )}

                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Applicant",
                                    "Job",
                                    "Department",
                                    "Location",
                                    "Status",
                                    "Date",
                                    "View",
                                ]}
                            />
                            <tbody>
                                {applications.data.map((a) => (
                                    <tr key={a.id}>
                                        <TableTd field="ID">{a.id}</TableTd>
                                        <TableTd field="Applicant">
                                            <span className="font-medium">
                                                {a.name}
                                            </span>
                                        </TableTd>
                                        <TableTd field="Job">
                                            <a
                                                href={route("jobDetails", {
                                                    job: a.job.slug,
                                                })}
                                                target="_blank"
                                                className="hover:underline text-blue-800"
                                            >
                                                {a.job.job_title}
                                            </a>
                                        </TableTd>
                                        <TableTd field="Department">
                                            {a.job.department?.department_name}
                                        </TableTd>
                                        <TableTd field="Location">
                                            {a.job.location?.location_name}
                                        </TableTd>
                                        <TableTd field="Status">
                                            <StatusSpan status={a.status} />
                                        </TableTd>
                                        <TableTd field="Date">
                                            {a.humanCreatedAt}
                                        </TableTd>
                                        <TableTd field="View">
                                            <Link
                                                className=" px-3 rounded py-1.5 text-gray-900 hover:underline font-semibold"
                                                href={route(
                                                    "job-application.view",
                                                    { jobApplication: a }
                                                )}
                                            >
                                                Manage
                                            </Link>
                                        </TableTd>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={applications.links} />
                </div>
            </div>
        </Authenticated>
    );
}
