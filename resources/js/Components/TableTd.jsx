export default function TableTd({ field, children }) {
    return (
        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
            <span className="lg:hidden text-white relative block top-0 left-0 bg-gray-900 px-2 py-1 text-xs font-bold uppercase">
                {field}
            </span>
            {children}
        </td>
    );
}
