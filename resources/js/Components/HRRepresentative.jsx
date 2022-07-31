import t from "@/Hooks/useTranslate";
export default function HRRepresentative({ job, lang }) {
    return (
        <div className="rounded-lg bg-light-blue p-5 lg:ml-5 mt-5 lg:mt-0 mb-6">
            <h3 className="title text-xl font-semibold mb-3">
                {t("HR Representative", lang)}
            </h3>
            <h4 className="text-lg text-neutral-800">{job.user.name}</h4>
            {job.user.contact_phone && (
                <div className="text-neutral-800 flex flex-wrap items-center">
                    <img src="/assets/images/phone.svg" className="w-4 mr-1" />{" "}
                    {job.user.contact_phone}
                </div>
            )}
            {job.user.email && (
                <div className="text-neutral-800 flex flex-wrap items-center">
                    <img src="/assets/images/email.svg" className="w-4 mr-1" />
                    {job.user.email}
                </div>
            )}
        </div>
    );
}
