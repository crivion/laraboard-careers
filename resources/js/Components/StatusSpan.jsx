export default function StatusSpan({ status }) {
    switch (status) {
        case "new":
            return (
                <span className="px-3 py-1 rounded bg-green-600 text-white">
                    {status}
                </span>
            );
        case "shortlisted":
            return (
                <span className="px-3 py-1 rounded bg-blue-600 text-white">
                    {status}
                </span>
            );
        case "dismissed":
            return (
                <span className="px-3 py-1 rounded bg-rose-600 text-white">
                    {status}
                </span>
            );
        case "interviewed":
            return (
                <span className="px-3 py-1 rounded bg-yellow-600 text-white">
                    {status}
                </span>
            );
        default:
            return (
                <span className="px-3 py-1 rounded bg-gray-900 text-white">
                    {status}
                </span>
            );
    }
}
