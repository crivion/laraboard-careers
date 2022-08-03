import Drawer from "./Drawer";
import LinkButton from "./LinkButton";
import { useState } from "react";
import Select from "react-select";
import Input from "./Input";
import Button from "./Button";
import { Inertia } from "@inertiajs/inertia";

export default function JobApplicationsFilters({
    departments,
    locations,
    myPostedJobs,
    queryFilters,
}) {
    console.log(queryFilters);

    const [isOpen, setIsOpen] = useState(false);
    const [department_id, setDepartmentId] = useState(
        queryFilters.department_id || ""
    );
    const [location_id, setLocationId] = useState(queryFilters.location_id);
    const [applicant_status, setApplicantStatus] = useState(
        queryFilters.applicant_status || ""
    );
    const [jobId, setJobId] = useState(queryFilters.jobId || "");
    const [applicant, setApplicant] = useState(queryFilters.applicant || "");
    const [processing, setProcessing] = useState(false);

    const statuses = [
        { value: "new", label: "New" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "interviewed", label: "Interviewed" },
        { value: "hired", label: "Hired" },
        { value: "dismissed", label: "Dismissed" },
    ];

    const openFilters = (e) => {
        e.preventDefault();
        setIsOpen(true);
        console.log("setting drawer to open", isOpen);
    };
    const closeFilters = () => {
        setIsOpen(false);
        console.log("setting drawer to close", isOpen);
    };

    const submit = (e) => {
        e.preventDefault();

        Inertia.get(
            route("dashboard"),
            { applicant, department_id, location_id, applicant_status, jobId },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onBefore: () => {
                    setProcessing(true);
                },
                onFinish: () => {
                    setProcessing(false);
                    closeFilters();
                },
            }
        );
    };

    return (
        <>
            <LinkButton className="mb-4" handleClick={(e) => openFilters(e)}>
                Filters
            </LinkButton>
            <Drawer isOpen={isOpen} onClose={closeFilters}>
                <form onSubmit={submit}>
                    <div className="p-6">
                        <label className="font-semibold text-lg mb-1 block">
                            Applicant Name
                        </label>
                        <Input
                            className="w-full"
                            handleChange={(e) => setApplicant(e.target.value)}
                            value={applicant}
                        />

                        <label className="font-semibold text-lg mb-1 mt-2 block">
                            Job
                        </label>
                        <Select
                            className="w-full"
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e) => setJobId(e?.id)}
                            options={myPostedJobs}
                            getOptionLabel={(job) => job.job_title}
                            getOptionValue={(job) => job.id}
                            defaultValue={myPostedJobs.filter(
                                (job) => job.id == jobId
                            )}
                        />

                        <label className="font-semibold text-lg mb-1 mt-2 block">
                            Department
                        </label>
                        <Select
                            className="w-full"
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e) => setDepartmentId(e?.id)}
                            getOptionLabel={(dep) => dep.department_name}
                            getOptionValue={(dep) => dep.id}
                            options={departments}
                            defaultValue={departments.filter(
                                (dep) => dep.id == department_id
                            )}
                        />

                        <label className="font-semibold text-lg mb-1 mt-2 block">
                            Location
                        </label>
                        <Select
                            className="w-full"
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e) => setLocationId(e?.id)}
                            getOptionLabel={(loc) => loc.location_name}
                            getOptionValue={(loc) => loc.id}
                            options={locations}
                            defaultValue={locations.filter(
                                (loc) => loc.id == location_id
                            )}
                        />

                        <label className="font-semibold text-lg mb-1 mt-2 block">
                            Status
                        </label>
                        <Select
                            className="w-full"
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e) => setApplicantStatus(e?.value)}
                            options={statuses}
                            defaultValue={statuses.filter(
                                (s) => s.value == applicant_status
                            )}
                        />
                    </div>

                    <div className="text-center pb-5">
                        <Button className="mt-4" type="submit">
                            Apply Filters
                        </Button>
                        {processing && (
                            <div className="mt-3 font-semibold">
                                Processing..
                            </div>
                        )}
                    </div>
                </form>
            </Drawer>
        </>
    );
}
