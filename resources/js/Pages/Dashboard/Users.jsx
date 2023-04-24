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

export default function Users(props) {
    const users = props.users;

    const [adduserModal, setAdduserModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [userID, setuserID] = useState("");
    const [userName, setuserName] = useState("");

    const edituser = (e, userID) => {
        e.preventDefault();

        // get user info
        axios.get(route('users.show', { user: userID }))
            .then(response => {
                setuserID(response.data.id);
                setuserName(response.data.user_name);
                setAdduserModal(true);
            }).catch(Error => toast.error(Error.response.data.message));

        console.log(userID);

    }


    const saveuser = (e) => {
        e.preventDefault();

        const postURL = userID !== ""
            ? route("users.update", { user: userID })
            : route("users.store");

        Inertia.visit(postURL, {
            method: userID !== "" ? "PUT" : "POST",
            data: {
                user_name: userName
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
                setAdduserModal(false);
                setuserName("");
                setuserID("");
                console.log("FINISHED", response);
            },
            preserveScroll: false,
            preserveState: true,
        });

    }

    const deleteuser = (e) => {
        e.preventDefault();

        Inertia.visit(route('users.destroy', { user: userID }), {
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
                setuserName("");
                setuserID("");
                setShowConfirmation(false);
            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    const confirmDelete = (e, userID) => {
        e.preventDefault();

        setuserID(userID);
        setShowConfirmation(true);
    }

    const resetuser = () => {
        setAdduserModal(false);
        setuserID("");
        setuserName("");
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users Overview
                </h2>
            }
        >
            <Head title="Users Overview" />

            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-5 text-gray-600 dark:text-gray-100 text-lg text-center">
                    <p className="mb-5">
                        Are you sure you want to delete this user?
                    </p>
                    <button className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-sm text-white rounded-md border border-rose-600" onClick={(e) => deleteuser(e)}>
                        Yes
                    </button>

                    <button className="px-3 py-1.5 border rounded-md text-sm ml-2" onClick={(e) => setShowConfirmation(false)}>
                        Cancel
                    </button>

                </div>
            </Modal>

            <Modal show={adduserModal} onClose={() => resetuser()}>
                <div className="p-6 bg-white">
                    <form>
                        <Label
                            forInput="user_name"
                            value="Full Name"
                            className="text-lg mb-2"
                        />
                        <Input
                            name="name"
                            className="w-full"
                            handleChange={(e) =>
                                setuserName(e.target.value)
                            }
                            value={userName}
                            required
                        />

                        <button className="mt-3 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={e => saveuser(e)}>
                            Save user
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <button className="mb-5 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={() => setAdduserModal(true)}>
                        Create user
                    </button>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Role",
                                    "Jobs Posted",
                                    "Actions",
                                ]}
                            />
                            <tbody>
                                {users.data.map((user) => (
                                    <tr key={user.id}>
                                        <TableTd field="ID">{user.id}</TableTd>
                                        <TableTd field="Name">
                                            {user.name}
                                        </TableTd>
                                        <TableTd field="Email">
                                            {user.email}
                                        </TableTd>
                                        <TableTd field="Phone">
                                            {user.contact_phone ?? '--'}
                                        </TableTd>
                                        <TableTd field="Role">
                                            {user.user_type}
                                        </TableTd>
                                        <TableTd field="Jobs Posted">
                                            {user.jobs_count}
                                        </TableTd>
                                        <TableTd field="View">
                                            <button onClick={e => edituser(e, user.id)} className=" px-3 rounded py-1.5 text-green-700 hover:underline font-semibold">
                                                Edit
                                            </button>
                                            <br />
                                            <button className=" px-3 rounded py-1.5 text-rose-700 hover:underline font-semibold" onClick={e => confirmDelete(e, user.id)}>
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
