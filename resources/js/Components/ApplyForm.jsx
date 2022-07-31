import t from "@/Hooks/useTranslate";
import { useForm, usePage } from "@inertiajs/inertia-react";
import ProgressBar from "./ProgressBar";

export default function ApplyForm({ job, lang }) {
    const { csrfToken } = usePage().props;

    const { data, setData, post, processing, errors, progress } = useForm({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        terms: false,
        resume: null,
    });

    const submit = async (e) => {
        e.preventDefault();

        post(route("storeJobApplication", { job: job.slug }), {
            preserveScroll: true,
            resetOnSuccess: false,
        });
    };

    return (
        <div className="rounded-lg bg-light-blue p-5 lg:ml-5">
            <h3 className="title text-xl font-semibold mb-5">
                {t("Apply to this position", lang)}
            </h3>
            <form
                name="applyForm"
                id="applyForm"
                encType="multipart/form-data"
                action={route("storeJobApplication", { job: job.slug })}
                method="POST"
                onSubmit={submit}
            >
                <input type="hidden" name="_token" value={csrfToken} />
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={t("Full Name", lang)}
                    className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <div className="text-rose-700 font-semibold mb-3">
                        {errors.name}
                    </div>
                )}
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder={t("Contact Email", lang)}
                    className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <div className="text-rose-700 font-semibold mb-3">
                        {errors.email}
                    </div>
                )}
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder={t("Contact Phone", lang)}
                    className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                />
                {errors.phone && (
                    <div className="text-rose-700 font-semibold mb-3">
                        {errors.phone}
                    </div>
                )}
                <textarea
                    name="coverLetter"
                    id="coverLetter"
                    placeholder={t("Your cover letter", lang)}
                    rows="5"
                    className="w-full border-0 outline-0 focus:ring-0 rounded-lg p-3 mt-3 mb-3"
                    value={data.coverLetter}
                    onChange={(e) => setData("coverLetter", e.target.value)}
                />
                {t("Attach Resume (PDF):", lang)}
                <input
                    type="file"
                    name="resume"
                    id="resume"
                    accept="application/pdf"
                    onChange={(e) => setData("resume", e.target.files[0])}
                />
                {errors.resume && (
                    <div className="text-rose-700 font-semibold mb-3">
                        {errors.resume}
                    </div>
                )}
                <p className="mt-3">
                    <input
                        type="checkbox"
                        name="terms"
                        onChange={(e) => setData("terms", e.target.checked)}
                    />{" "}
                    {t(
                        "I accept the terms and conditions & privacy policy",
                        lang
                    )}
                </p>
                {errors.terms && (
                    <div className="text-rose-700 font-semibold mb-3">
                        {errors.terms}
                    </div>
                )}

                <button
                    disabled={processing}
                    type="submit"
                    className="bg-blue-800 text-white font-semibold py-2.5 px-8 rounded mt-5"
                >
                    {t("Send Application", lang)}
                </button>
            </form>

            {progress && (
                <div className="mt-5">
                    <ProgressBar percentage={progress.percentage}>
                        {progress.percentage}%
                    </ProgressBar>
                </div>
            )}
        </div>
    );
}
