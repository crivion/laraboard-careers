import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";
import TableHead from "@/Components/TableHead";
import TableTd from "@/Components/TableTd";

export default function Dashboard(props) {
    const applications = props.applications;

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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {!applications.data.length &&
                            "No applications on any of your posted jobs."}

                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Applicant",
                                    "Job",
                                    "Date",
                                    "View",
                                ]}
                            />
                            <tbody>
                                {applications.data.map((a) => (
                                    <tr key={a.id}>
                                        <TableTd field="ID">{a.id}</TableTd>
                                        <TableTd field="Applicant">
                                            {a.name}
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
                                        <TableTd field="Date">
                                            {a.humanCreatedAt}
                                        </TableTd>
                                        <TableTd field="View">
                                            <Link
                                                className=" px-3 rounded py-1.5 text-gray-900 hover:underline font-semibold"
                                                href={`/job-application/${a.id}`}
                                            >
                                                Manage
                                            </Link>
                                        </TableTd>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}