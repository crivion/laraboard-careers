import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@/Components/Button";
import { toast } from "react-toastify";
import Select from "react-select";
import { Inertia } from "@inertiajs/inertia";
import Modal from "@/Components/Modal";
import { useState } from "react";

export default function CreateJob(props) {
    const job = props.job;

    const { data, setData, processing, errors } = useForm({
        job_id: job?.id || null,
        job_title: job?.job_title || "",
        job_description: job?.job_description || "",
        skills_and_experience: job?.skills_and_experience || "",
        key_responsibilities: job?.key_responsibilities || "",
        salary: job?.salary || "",
        department_id: job?.department_id || "",
        location_id: job?.location_id || "",
        contract_type_id: job?.contract_type_id || "",
        expires_at: job?.expires_at || "",
        cancelToken: null,
    });

    const departments = props.departments;
    const locations = props.locations;
    const contractTypes = props.contractTypes;
    const [showConfirmation, setShowConfirmation] = useState(false);

    const archiveListing = (e) => {
        e.preventDefault();

        Inertia.visit(route('jobs.destroy', { job: job.slug }), {
            method: "DELETE"
        });
    }

    const submit = (e) => {
        e.preventDefault();

        const postURL = job
            ? route("jobs.update", { job: job.slug })
            : route("jobs.store");

        Inertia.visit(postURL, {
            method: job ? "put" : "post",
            data: data,
            onError: (errors) => {
                // data.cancelToken.cancel();
                for (const [errorField, errorMessage] of Object.entries(
                    errors
                )) {
                    toast.error(errorMessage);
                }
            },
            onBefore: (visit) => {
                console.log(visit);
            },
            onFinish: (response) => {
                console.log("FINISHED", response);
            },
            onCancelToken: (cancelToken) => setData("cancelToken", cancelToken),
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <Link
                        href={route("jobs.index")}
                        className="hover:underline"
                    >
                        Jobs
                    </Link>{" "}
                    &raquo; {job?.id ? "Update" : "Create"} Job Listing
                </h2>
            }
        >

            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-5 text-gray-600 dark:text-gray-100 text-lg text-center">
                    <p className="mb-5">
                        Are you sure you want to delete this job listing?
                    </p>
                    <button className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-sm text-white rounded-md border border-rose-600" onClick={(e) => archiveListing(e)}>
                        Yes
                    </button>

                    <button className="px-3 py-1.5 border rounded-md text-sm ml-2" onClick={(e) => setShowConfirmation(false)}>
                        Cancel
                    </button>
                </div>
            </Modal>

            <Head title="Job Listing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {job?.id && (
                        <div className="flex justify-end px-6 mb-4">
                            <button onClick={() => setShowConfirmation(true)} className="font-semibold bg-rose-500 rounded hover:bg-rose-600 px-2 py-1.5 text-white text-sm">
                                Delete Job Listing
                            </button>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">


                            <form onSubmit={submit}>
                                <Label
                                    forInput="job_title"
                                    value="Job Title"
                                    className="text-lg"
                                />
                                <Input
                                    name="job_title"
                                    className="w-full"
                                    handleChange={(e) =>
                                        setData(e.target.name, e.target.value)
                                    }
                                    value={data.job_title}
                                    required
                                />
                                <Label
                                    forInput="salary"
                                    value="Salary"
                                    className="text-lg mt-4"
                                />
                                <Input
                                    name="salary"
                                    className="w-full"
                                    handleChange={(e) =>
                                        setData(e.target.name, e.target.value)
                                    }
                                    value={data.salary}
                                    required
                                />

                                <div className="md:flex md:items-center">
                                    <div className="w-full">
                                        <Label
                                            forInput="department_id"
                                            value="Department"
                                            className="mt-4 text-lg"
                                        />
                                        <Select
                                            className="z-[9999] w-full"
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={(e) =>
                                                setData("department_id", e.id)
                                            }
                                            getOptionLabel={(dep) =>
                                                dep.department_name
                                            }
                                            getOptionValue={(dep) => dep.id}
                                            options={departments}
                                            defaultValue={departments.filter(
                                                (dep) =>
                                                    dep.id ===
                                                    data.department_id
                                            )}
                                        />
                                    </div>

                                    <div className="w-full md:ml-5">
                                        <Label
                                            forInput="contract_type_id"
                                            value="Contract Type"
                                            className="mt-4 text-lg"
                                        />
                                        <Select
                                            className="z-[9998] w-full"
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={(e) =>
                                                setData(
                                                    "contract_type_id",
                                                    e.id
                                                )
                                            }
                                            getOptionLabel={(contract) =>
                                                contract.contract_type_name
                                            }
                                            getOptionValue={(contract) =>
                                                contract.id
                                            }
                                            options={contractTypes}
                                            defaultValue={contractTypes.filter(
                                                (contract) =>
                                                    contract.id ===
                                                    data.contract_type_id
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center">
                                    <div className="w-full">
                                        <Label
                                            forInput="location_id"
                                            value="Location"
                                            className="mt-4 text-lg"
                                        />
                                        <Select
                                            className="z-[9990] w-full"
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={(e) =>
                                                setData("location_id", e.id)
                                            }
                                            getOptionLabel={(loc) =>
                                                loc.location_name
                                            }
                                            getOptionValue={(loc) => loc.id}
                                            options={locations}
                                            defaultValue={locations.filter(
                                                (loc) =>
                                                    loc.id === data.location_id
                                            )}
                                        />
                                    </div>

                                    <div className="w-full md:ml-5">
                                        <Label
                                            forInput="expires_at"
                                            value="Expires At (Optional)"
                                            className="mt-4 text-lg"
                                        />
                                        <Input
                                            name="expires_at"
                                            type="date"
                                            value={data.expires_at}
                                            handleChange={(e) =>
                                                setData(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <Label
                                    forInput="job_description"
                                    value="Job Description"
                                    className="mt-4 text-lg"
                                />
                                <Editor
                                    directionality="ltr"
                                    onEditorChange={(content) => {
                                        setData("job_description", content);
                                    }}
                                    tinymceScriptSrc={
                                        route("homepage") +
                                        "/tinymce/tinymce.min.js"
                                    }
                                    value={data.job_description}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "preview",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | table | bullist numlist outdent indent | " +
                                            "removeformat | code | link | image | insertdatetime",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                                <Label
                                    forInput="key_responsibilities"
                                    value="Key Responsbilities (leave empty to disable)"
                                    className="mt-4 text-lg"
                                />
                                <Editor
                                    directionality="ltr"
                                    tinymceScriptSrc={
                                        route("homepage") +
                                        "/tinymce/tinymce.min.js"
                                    }
                                    onEditorChange={(content) => {
                                        setData(
                                            "key_responsibilities",
                                            content
                                        );
                                    }}
                                    value={data.key_responsibilities}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "preview",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | table | bullist numlist outdent indent | " +
                                            "removeformat | code | link | image | insertdatetime",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                                <Label
                                    forInput="skills_and_experience"
                                    value="Skills and Experience (leave empty to disable)"
                                    className="mt-4 text-lg"
                                />
                                <Editor
                                    tinymceScriptSrc={
                                        route("homepage") +
                                        "/tinymce/tinymce.min.js"
                                    }
                                    onEditorChange={(content) => {
                                        setData(
                                            "skills_and_experience",
                                            content
                                        );
                                    }}
                                    value={data.skills_and_experience}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "preview",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | table | bullist numlist outdent indent | " +
                                            "removeformat | code | link | image | insertdatetime",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                                <Button type="submit" className="mt-10">
                                    Save Listing
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
