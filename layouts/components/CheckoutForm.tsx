"use client";

import {FC, FormEvent, useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {convertToSubCurrency} from "@lib/convertToSubCurrency";

interface Props {
    amount: number;
}

const CheckoutForm: FC<Props> = ({amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (typeof window !== "undefined") {
            e.preventDefault();
            setLoading(true);

            if (!stripe || !elements)
                return;

            const {error: submitError} = await elements.submit();

            if (submitError) {
                setErrorMessage(submitError.message);
                setLoading(false);
                return;
            }

            const {error} = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `http://localhost:3000/payment-success?amount=${amount}`
                }
            })

            if (error)
                setErrorMessage(error.message);

            setLoading(false);
        }
    }

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: convertToSubCurrency(amount)
            })
        }).then(res => res.json())
            .then((res) => {
                setClientSecret(res.clientSecret);
            }).catch((err) => {
            console.log(err);
        })
    }, [amount]);


    if (!clientSecret || !stripe || !elements) {
        return <div className="h-full text-center content-center">
            <div className="inline-block mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                     viewBox="0 0 24 24">
                    <circle cx="4" cy="12" r="3" fill="currentColor">
                        <animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline"
                                 dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/>
                    </circle>
                    <circle cx="12" cy="12" r="3" fill="currentColor">
                        <animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s"
                                 keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/>
                    </circle>
                    <circle cx="20" cy="12" r="3" fill="currentColor">
                        <animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline"
                                 dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/>
                    </circle>
                </svg>
            </div>
            <span className="block">Loading...</span>
        </div>
    }

    return <form className="mt-3 text-center" onSubmit={handleSubmit}>
        <h3>Donate for ${amount.toFixed(2)}</h3>
        <div className="p-2 sm:p-5 space-y-3">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {clientSecret && <PaymentElement/>}
            <button
                className="mb-5 w-full btn btn-primary block my-4 after:bg-black after:rounded-md hover:after:scale-[1.01]"
                disabled={loading || !stripe}
                type="submit">
                {loading ? "Processing..." : `Donate $${amount.toFixed(2)}`}
            </button>
        </div>
    </form>
}

export default CheckoutForm