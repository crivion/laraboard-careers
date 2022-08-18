import Drawer from "./Drawer";
import LinkButton from "./LinkButton";
import { useState } from "react";
import Select from "react-select";
import Input from "./Input";
import Button from "./Button";
import { Inertia } from "@inertiajs/inertia";

export default function DashboardJobFilters({
    departments,
    locations,
    queryFilters,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [department_id, setDepartmentId] = useState(
        queryFilters.department || ""
    );
    const [jobTitle, setJobTitle] = useState(queryFilters.keyword || "");
    const [location_id, setLocationId] = useState(queryFilters.location);
    const [processing, setProcessing] = useState(false);

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
            route("jobs.index"),
            {
                keyword: jobTitle,
                department: department_id,
                location: location_id,
            },
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
            <LinkButton
                className="mb-4 mr-3"
                handleClick={(e) => openFilters(e)}
            >
                Filters
            </LinkButton>
            <Drawer isOpen={isOpen} onClose={closeFilters}>
                <form onSubmit={submit}>
                    <div className="p-6">
                        <label className="font-semibold text-lg mb-1 block">
                            Job Title
                        </label>
                        <Input
                            className="w-full"
                            handleChange={(e) => setJobTitle(e.target.value)}
                            value={jobTitle}
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
