"use client";

import {FC, useEffect} from "react";
import {MdOutlinePayment} from "react-icons/md";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface Props {
    amount: number;
}

const PaymentSuccess: FC<Props> = ({amount}) => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 60 * 1000)

        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, []);

    return <div className="mx-auto bg-white shadow p-10 w-full max-w-lg text-center space-y-5">
        <div className="w-1/2 max-w-[150px] aspect-square text-center content-center bg-gradient rounded-full mx-auto opacity-50">
            <MdOutlinePayment className="text-4xl mx-auto text-white"/>
        </div>
        <h3 className="text-transparent bg-gradient bg-clip-text">Thank you!</h3>
        <p className="text-base md:text-lg text-black">You donated ${amount.toFixed(2)} successfully</p>
        <p>Your will be redirected to home page shorty or click here to return to home page</p>
        <Link href="/" className="btn btn-primary px-10 animate-bounce">Home</Link>
    </div>
}

export default PaymentSuccess