import t from "@/Hooks/useTranslate";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function JobFilters({
    lang,
    departments,
    contractTypes,
    locations,
    queryFilters,
}) {
    const [keyword, setKeyword] = useState(queryFilters.keyword || "");
    const [department, setDepartment] = useState(queryFilters.department || "");
    const [contractType, setContractType] = useState(
        queryFilters.contractType || ""
    );
    const [location, setLocation] = useState(queryFilters.location || "");
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        Inertia.get(
            route("homepage"),
            { keyword, department, contractType, location },
            {
                preserveState: true,
                replace: true,
                onBefore: () => {
                    setProcessing(true);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <div className="rounded-lg bg-light-blue px-5 py-3 ml-5">
            <form name="jobFilters" id="jobFilters" onSubmit={submit}>
                <h3 className="text-lg font-semibold text-neutral-800 mt-5 mb-2">
                    {t("Search By Keyword", lang)}
                </h3>

                <div className="flex items-center bg-white rounded py-2 px-3 mt-2 mb-5">
                    <div>
                        <img
                            src="/assets/images/search.svg"
                            className="w-4 h-4 mr-2"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="keyword"
                            id="keyword"
                            placeholder={t("Job title, keywords, etc.", lang)}
                            className="w-full border-0 outline-0 focus:ring-0"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    {t("Department", lang)}
                </h3>

                <div className="flex items-center bg-white rounded py-2 px-3 mt-2 mb-5">
                    <div>
                        <img
                            src="/assets/images/tag.svg"
                            className="w-4 h-4 mr-2"
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            name="department"
                            id="department"
                            className="w-full border-0 outline-0 focus:ring-0"
                            defaultValue={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="">
                                {t("All Departments", lang)}
                            </option>
                            {departments.map((department) => (
                                <option
                                    key={`department-${department.id}`}
                                    value={department.id}
                                >
                                    {department.department_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    {t("Job Type", lang)}
                </h3>
                <div className="flex items-center bg-white rounded py-2 px-3 mt-2 mb-5">
                    <div>
                        <img
                            src="/assets/images/contract.svg"
                            className="w-4 h-4 mr-2"
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            name="contractType"
                            id="contractType"
                            className="w-full border-0 outline-0 focus:ring-0"
                            defaultValue={contractType}
                            onChange={(e) => setContractType(e.target.value)}
                        >
                            <option value="">{t("All Contracts", lang)}</option>
                            {contractTypes.map((ct) => (
                                <option key={`ct-${ct.id}`} value={ct.id}>
                                    {ct.contract_type_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    {t("Location", lang)}
                </h3>
                <div className="flex items-center bg-white rounded py-2 px-3 mt-2 mb-5">
                    <div>
                        <img
                            src="/assets/images/location.svg"
                            className="w-4 h-4 mr-2"
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            name="location"
                            id="location"
                            className="w-full border-0 outline-0 focus:ring-0"
                            defaultValue={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">{t("All Locations", lang)}</option>
                            {locations.map((loc) => (
                                <option key={`loc-${loc.id}`} value={loc.id}>
                                    {loc.location_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-3">
                    <button
                        type="submit"
                        className="bg-blue-800 text-white font-semibold py-2.5 px-8 rounded"
                        disabled={processing}
                    >
                        {t("Apply Filters", lang)}
                    </button>
                </div>

                {processing && (
                    <div className="flex justify-center mt-3 mb-3">
                        {t("Searching...", lang)}
                    </div>
                )}
            </form>
        </div>
    );
}
