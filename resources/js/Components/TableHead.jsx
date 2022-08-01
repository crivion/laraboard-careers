export default function TableHead({ headings }) {
    return (
        <thead>
            <tr>
                {headings.map((heading, index) => (
                    <th
                        className={`${index == 0 ? "rounded-tl" : ""} ${
                            headings.length - 1 === index ? "rounded-tr" : ""
                        } p-3 font-semibold uppercase bg-gradient-to-b from-slate-600 to-slate-700 text-white hidden lg:table-cell`}
                        key={`th${index}`}
                    >
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
