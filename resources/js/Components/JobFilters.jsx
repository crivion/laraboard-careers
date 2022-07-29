export default function JobFilters() {
    return (
        <div className="rounded-lg bg-light-blue px-5 py-3 ml-5">
            <form name="jobFilters" id="jobFilters">
                <h3 className="text-lg font-semibold text-neutral-800 mt-5 mb-2">
                    Search By Keyword
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
                            placeholder="Job title, keywords, etc."
                            className="w-full border-0 outline-0 focus:ring-0"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    Department
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
                            <option value="">All Departments</option>
                            <option value="1">Department 1</option>
                            <option value="2">Department 2</option>
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    Job Type
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
                            <option value="">All Contracts</option>
                            <option value="1">Full Time</option>
                            <option value="2">Part Time</option>
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-800">
                    Location
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
                            name="department"
                            id="department"
                            className="w-full border-0 outline-0 focus:ring-0"
                        >
                            <option value="">All Locations</option>
                            <option value="1">Department 1</option>
                            <option value="2">Department 2</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-3">
                    <button className="bg-blue-800 text-white font-semibold py-2.5 px-8 rounded">
                        Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
}
