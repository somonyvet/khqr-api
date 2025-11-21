"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Providers = ({children}) => {
    const pathname = usePathname();

    useEffect(() => {
        const timeout = setTimeout(() => {
            AOS.init({once: true, duration: 700});
            window.scroll(0, 0);
        }, 300)

        return () => clearTimeout(timeout);
    }, [pathname]);

    return children;
}

export default Providers;
