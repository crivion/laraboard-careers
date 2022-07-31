export default function ProgressBar({ percentage }) {
    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Please wait
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                        {percentage}%
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-blue-200">
                <div
                    style={{ width: "30%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                />
            </div>
        </div>
    );
}
