import { useEffect, useState } from "react";

export const useScroll = () => {
    const [scroll, setScroll] = useState();

    useEffect(() => {
        const onScroll = () => {
            const scrollCheck = window.pageYOffset > 100;
            setScroll(scrollCheck);
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    return scroll;
};
