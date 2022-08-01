import { useRef } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@/Components/Button";

export default function CreateJob(props) {
    const { data, setData, post, processing, errors } = useForm({
        job_title: "",
        job_description: "",
        skills_and_experience: "",
        salary: "",
        department_id: "",
        location_id: "",
        contract_type_id: "",
        expires_at: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("jobs.store"));
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
                    &raquo; Create Job Listing
                </h2>
            }
        >
            <Head title="Create Job Listing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                    required
                                />
                                <Label
                                    forInput="job_description"
                                    value="Job Description"
                                    className="mt-4 text-lg"
                                />
                                <Editor
                                    onEditorChange={(content) => {
                                        setData("job_description", content);
                                    }}
                                    tinymceScriptSrc={
                                        route("homepage") +
                                        "/tinymce/tinymce.min.js"
                                    }
                                    initialValue=""
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
                                    initialValue=""
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
                                    initialValue=""
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
