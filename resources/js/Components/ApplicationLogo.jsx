import React from "react";
import { usePage } from "@inertiajs/inertia-react";

export default function ApplicationLogo() {
    const { images } = usePage().props;
    return (
        <img src={images.logo} alt="LaraBoard Logo" className="w-auto h-14" />
    );
}
