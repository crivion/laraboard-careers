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

export default function Locations(props) {
    const locations = props.locations;

    const [addlocationModal, setAddlocationModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [locationID, setlocationID] = useState("");
    const [locationName, setlocationName] = useState("");

    const editlocation = (e, locationID) => {
        e.preventDefault();

        // get location info
        axios.get(route('locations.show', { location: locationID }))
            .then(response => {
                setlocationID(response.data.id);
                setlocationName(response.data.location_name);
                setAddlocationModal(true);
            }).catch(Error => toast.error(Error.response.data.message));

        console.log(locationID);

    }


    const savelocation = (e) => {
        e.preventDefault();

        const postURL = locationID !== ""
            ? route("locations.update", { location: locationID })
            : route("locations.store");

        Inertia.visit(postURL, {
            method: locationID !== "" ? "PUT" : "POST",
            data: {
                location_name: locationName
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
                setAddlocationModal(false);
                setlocationName("");
                setlocationID("");
                console.log("FINISHED", response);
            },
            preserveScroll: false,
            preserveState: true,
        });

    }

    const deletelocation = (e) => {
        e.preventDefault();

        Inertia.visit(route('locations.destroy', { location: locationID }), {
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
                setlocationName("");
                setlocationID("");
                setShowConfirmation(false);
            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    const confirmDelete = (e, locationID) => {
        e.preventDefault();

        setlocationID(locationID);
        setShowConfirmation(true);
    }

    const resetlocation = () => {
        setAddlocationModal(false);
        setlocationID("");
        setlocationName("");
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Locations Overview
                </h2>
            }
        >
            <Head title="Locations Overview" />

            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-5 text-gray-600 dark:text-gray-100 text-lg text-center">
                    <p className="mb-5">
                        Are you sure you want to delete this location?
                    </p>
                    <button className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-sm text-white rounded-md border border-rose-600" onClick={(e) => deletelocation(e)}>
                        Yes
                    </button>

                    <button className="px-3 py-1.5 border rounded-md text-sm ml-2" onClick={(e) => setShowConfirmation(false)}>
                        Cancel
                    </button>

                </div>
            </Modal>

            <Modal show={addlocationModal} onClose={() => resetlocation()}>
                <div className="p-6 bg-white">
                    <form>
                        <Label
                            forInput="location_name"
                            value="Location Name"
                            className="text-lg mb-2"
                        />
                        <Input
                            name="location_name"
                            className="w-full"
                            handleChange={(e) =>
                                setlocationName(e.target.value)
                            }
                            value={locationName}
                            required
                        />

                        <button className="mt-3 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={e => savelocation(e)}>
                            Save location
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <button className="mb-5 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={() => setAddlocationModal(true)}>
                        Create location
                    </button>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "location Name",
                                    "Jobs Count",
                                    "Actions",
                                ]}
                            />
                            <tbody>
                                {locations.map((location) => (
                                    <tr key={location.id}>
                                        <TableTd field="ID">{location.id}</TableTd>
                                        <TableTd field="location Name">
                                            {location.location_name}
                                        </TableTd>
                                        <TableTd field="Jobs Count">
                                            {location.jobs_count}
                                        </TableTd>
                                        <TableTd field="View">
                                            <button onClick={e => editlocation(e, location.id)} className=" px-3 rounded py-1.5 text-green-700 hover:underline font-semibold">
                                                Edit
                                            </button>
                                            <br />
                                            <button className=" px-3 rounded py-1.5 text-rose-700 hover:underline font-semibold" onClick={e => confirmDelete(e, location.id)}>
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
