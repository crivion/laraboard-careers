import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import TableHead from "@/Components/TableHead";
import TableTd from "@/Components/TableTd";
import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { toast } from "react-toastify";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

export default function Departments(props) {
    const departments = props.departments;

    const [addDepartmentModal, setAddDepartmentModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [departmentID, setDepartmentID] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const editDepartment = (e, departmentID) => {
        e.preventDefault();

        // get department info
        axios.get(route('departments.show', { department: departmentID }))
            .then(response => {
                setDepartmentID(response.data.id);
                setDepartmentName(response.data.department_name);
                setAddDepartmentModal(true);
            }).catch(Error => toast.error(Error.response.data.message));

        console.log(departmentID);

    }


    const saveDepartment = (e) => {
        e.preventDefault();

        const postURL = departmentID !== ""
            ? route("departments.update", { department: departmentID })
            : route("departments.store");

        Inertia.visit(postURL, {
            method: departmentID !== "" ? "PUT" : "POST",
            data: {
                department_name: departmentName
            },
            onError: (errors) => {
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
                setAddDepartmentModal(false);
                setDepartmentName("");
                setDepartmentID("");
                console.log("FINISHED", response);
            },
            preserveScroll: false,
            preserveState: true,
        });

    }

    const deleteDepartment = (e) => {
        e.preventDefault();

        Inertia.visit(route('departments.destroy', { department: departmentID }), {
            method: "DELETE",
            onError: (errors) => {
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
                setDepartmentName("");
                setDepartmentID("");
                setShowConfirmation(false);
            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    const confirmDelete = (e, departmentID) => {
        e.preventDefault();

        setDepartmentID(departmentID);
        setShowConfirmation(true);
    }

    const resetDepartment = () => {
        setAddDepartmentModal(false);
        setDepartmentID("");
        setDepartmentName("");
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Departments Overview
                </h2>
            }
        >
            <Head title="Departments Overview" />

            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-5 text-gray-600 dark:text-gray-100 text-lg text-center">
                    <p className="mb-5">
                        Are you sure you want to delete this department?
                    </p>
                    <button className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-sm text-white rounded-md border border-rose-600" onClick={(e) => deleteDepartment(e)}>
                        Yes
                    </button>

                    <button className="px-3 py-1.5 border rounded-md text-sm ml-2" onClick={(e) => setShowConfirmation(false)}>
                        Cancel
                    </button>

                </div>
            </Modal>

            <Modal show={addDepartmentModal} onClose={() => resetDepartment()}>
                <div className="p-6 bg-white">
                    <form>
                        <Label
                            forInput="department_name"
                            value="Department Name"
                            className="text-lg mb-2"
                        />
                        <Input
                            name="department_name"
                            className="w-full"
                            handleChange={(e) =>
                                setDepartmentName(e.target.value)
                            }
                            value={departmentName}
                            required
                        />

                        <button className="mt-3 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={e => saveDepartment(e)}>
                            Save Department
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <button className="mb-5 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={() => setAddDepartmentModal(true)}>
                        Create Department
                    </button>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Department Name",
                                    "Jobs Count",
                                    "Actions",
                                ]}
                            />
                            <tbody>
                                {departments.map((department) => (
                                    <tr key={department.id}>
                                        <TableTd field="ID">{department.id}</TableTd>
                                        <TableTd field="Department Name">
                                            {department.department_name}
                                        </TableTd>
                                        <TableTd field="Jobs Count">
                                            {department.jobs_count}
                                        </TableTd>
                                        <TableTd field="View">
                                            <button onClick={e => editDepartment(e, department.id)} className=" px-3 rounded py-1.5 text-green-700 hover:underline font-semibold">
                                                Edit
                                            </button>
                                            <br />
                                            <button className=" px-3 rounded py-1.5 text-rose-700 hover:underline font-semibold" onClick={e => confirmDelete(e, department.id)}>
                                                Delete
                                            </button>
                                        </TableTd>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
