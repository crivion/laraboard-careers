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

export default function contracts(props) {
    const contracts = props.contracts;

    const [addcontractModal, setAddcontractModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [contractID, setcontractID] = useState("");
    const [contractName, setcontractName] = useState("");

    const editcontract = (e, contractID) => {
        e.preventDefault();

        // get contract info
        axios.get(route('contracts.show', { contract: contractID }))
            .then(response => {
                setcontractID(response.data.id);
                setcontractName(response.data.contract_type_name);
                setAddcontractModal(true);
            }).catch(Error => toast.error(Error.response.data.message));

        console.log(contractID);

    }


    const savecontract = (e) => {
        e.preventDefault();

        const postURL = contractID !== ""
            ? route("contracts.update", { contract: contractID })
            : route("contracts.store");

        Inertia.visit(postURL, {
            method: contractID !== "" ? "PUT" : "POST",
            data: {
                contract_type_name: contractName
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
                setAddcontractModal(false);
                setcontractName("");
                setcontractID("");
                console.log("FINISHED", response);
            },
            preserveScroll: false,
            preserveState: true,
        });

    }

    const deletecontract = (e) => {
        e.preventDefault();

        Inertia.visit(route('contracts.destroy', { contract: contractID }), {
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
                setcontractName("");
                setcontractID("");
                setShowConfirmation(false);
            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    const confirmDelete = (e, contractID) => {
        e.preventDefault();

        setcontractID(contractID);
        setShowConfirmation(true);
    }

    const resetcontract = () => {
        setAddcontractModal(false);
        setcontractID("");
        setcontractName("");
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Contracts Overview
                </h2>
            }
        >
            <Head title="Jobs Overview" />

            <Modal show={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-5 text-gray-600 dark:text-gray-100 text-lg text-center">
                    <p className="mb-5">
                        Are you sure you want to delete this Contract Type?
                    </p>
                    <button className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-sm text-white rounded-md border border-rose-600" onClick={(e) => deletecontract(e)}>
                        Yes
                    </button>

                    <button className="px-3 py-1.5 border rounded-md text-sm ml-2" onClick={(e) => setShowConfirmation(false)}>
                        Cancel
                    </button>

                </div>
            </Modal>

            <Modal show={addcontractModal} onClose={() => resetcontract()}>
                <div className="p-6 bg-white">
                    <form>
                        <Label
                            forInput="contract_type_name"
                            value="Contract Type"
                            className="text-lg mb-2"
                        />
                        <Input
                            name="contract_type_name"
                            className="w-full"
                            handleChange={(e) =>
                                setcontractName(e.target.value)
                            }
                            value={contractName}
                            required
                        />

                        <button className="mt-3 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={e => savecontract(e)}>
                            Save Contract Type
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <button className="mb-5 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 " onClick={() => setAddcontractModal(true)}>
                        Create contract
                    </button>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full table-auto">
                            <TableHead
                                headings={[
                                    "ID",
                                    "Contract Type",
                                    "Jobs Count",
                                    "Actions",
                                ]}
                            />
                            <tbody>
                                {contracts.map((contract) => (
                                    <tr key={contract.id}>
                                        <TableTd field="ID">{contract.id}</TableTd>
                                        <TableTd field="Contract Type">
                                            {contract.contract_type_name}
                                        </TableTd>
                                        <TableTd field="Jobs Count">
                                            {contract.jobs_count}
                                        </TableTd>
                                        <TableTd field="View">
                                            <button onClick={e => editcontract(e, contract.id)} className=" px-3 rounded py-1.5 text-green-700 hover:underline font-semibold">
                                                Edit
                                            </button>
                                            <br />
                                            <button className=" px-3 rounded py-1.5 text-rose-700 hover:underline font-semibold" onClick={e => confirmDelete(e, contract.id)}>
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
