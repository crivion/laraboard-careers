import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ links }) {
    return (
        <div className="mt-5 flex items-center gap-x-3">
            {links.map((link, linkIndex) => {
                return (
                    <Link
                        key={linkIndex}
                        className={`${
                            link.active
                                ? "border-rose-600 text-rose-600"
                                : "text-gray-600 border-gray-400"
                        } border rounded font-semibold  px-3 py-1.5 disabled:opacity-50`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        disabled={link.url ? false : true}
                        as="button"
                        type="button"
                    />
                );
            })}
        </div>
    );
}
