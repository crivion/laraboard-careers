export default function TableHead({ headings }) {
    return (
        <thead>
            <tr>
                {headings.map((heading, index) => (
                    <th
                        className={`${index == 0 ? "rounded-tl" : ""} ${
                            headings.length - 1 === index ? "rounded-tr" : ""
                        } p-3 font-semibold uppercase bg-gray-900 text-white text-sm hidden lg:table-cell`}
                        key={`th${index}`}
                    >
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
