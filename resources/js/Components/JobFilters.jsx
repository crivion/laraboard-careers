import t from "@/Hooks/useTranslate";

export default function JobFilters({
    lang,
    departments,
    contractTypes,
    locations,
}) {
    return (
        <div className="rounded-lg bg-light-blue px-5 py-3 ml-5">
            <form name="jobFilters" id="jobFilters">
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
                    <button className="bg-blue-800 text-white font-semibold py-2.5 px-8 rounded">
                        {t("Apply Filters", lang)}
                    </button>
                </div>
            </form>
        </div>
    );
}
