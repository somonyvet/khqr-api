"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {IoCloseSharp} from "react-icons/io5";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {convertToSubCurrency} from "@lib/convertToSubCurrency";
import CheckoutForm from "@components/CheckoutForm";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import QRCode from "react-qr-code";
import {MdOutlinePayment} from "react-icons/md";
import Countdown from "react-countdown";
import {removeSessionItem, setSessionItem} from "@lib/utils/storage";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(stripePublishableKey);
const TIMESTAMP_KEY = "_ts";

interface BakongProps {
    md5: string;
    qr: string;
}

const DonationAmountOptions = [5, 10, 20, 25, 50, 100];

const ExpiredSession = ({setQr}) => {
    setQr(undefined);
    return <p className="text-sm mt-6">Expired</p>
}

const Donation = ({donationBlogs}) => {
    const [donorName, setDonorName] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    const [show, setShow] = useState<boolean>(false);
    const [paymentType, setPaymentType] = useState<"bakong" | "visa">("bakong");
    const [amount, setAmount] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [qr, setQr] = useState<BakongProps>();
    const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
    const [inputBehavior, setInputBehavior] = useState<"option" | "custom">("option");
    const [timestamp, setTimestamp] = useState<number | null>();

    const renderer = ({minutes, seconds, completed}) => {
        if (completed)
            return <ExpiredSession setQr={setQr}/>

        return <div className="text-sm mt-6 flex gap-2 justify-center items-center">
            <div className="w-6 h-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a3" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#2563EB"/><stop offset=".3" stopColor="#2563EB" stopOpacity=".9"/><stop offset=".6" stopColor="#2563EB" stopOpacity=".6"/><stop offset=".8" stopColor="#2563EB" stopOpacity=".3"/><stop offset="1" stopColor="#2563EB" stopOpacity="0"/></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a3)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"/></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#2563EB" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"/></svg>
            </div>
            This QR will be expired in <span className="text-transparent bg-gradient bg-clip-text">{`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}</span>
        </div>
    }

    const onOpenDonationModal = () => {
        setDonorName("");
        setPaymentStatus(false);
        setInputBehavior("option");
    }

    // const donateViaVisa = () => {
    //     onOpenDonationModal();
    //     setAmount(2.99);
    //     setPaymentType("visa");
    //     setShow(true);
    // }

    const donateViaBakong = () => {
        onOpenDonationModal();
        setAmount(0);
        setQr(undefined);
        setPaymentType("bakong");
        setShow(true);
    }

    const generateBakongKhQr = async () => {
        setLoading(true);
        await fetch("/api/generate-khqr", {
            method: "POST",
            body: JSON.stringify({donorName, amount})
        }).then(res => res.json()).then((data) => {
            setQr(data.data);
            setDonorName(data.donorName);
            setLoading(false);
            setSessionItem(TIMESTAMP_KEY, JSON.stringify(data.timestamp));
            setTimestamp(data.timestamp);
        }).catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (show)
            document.body.style.overflowY = "hidden";
        else
            document.body.style.overflowY = "auto";

        return () => {
            if (show)
                document.body.style.overflowY = "hidden";
            else
                document.body.style.overflowY = "auto";
        }
    }, [show]);

    useEffect(() => {
        if (show && amount && qr && !paymentStatus) {
            const interval = setInterval(() => {
                fetch("/api/check-bakong-transaction", {
                    method: "POST",
                    body: JSON.stringify({donorName, md5: qr.md5})
                }).then(res => res.json()).then(data => {
                    if (data?.responseCode === 0) {
                        setPaymentStatus(true);
                        removeSessionItem(TIMESTAMP_KEY);
                        setTimestamp(undefined);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }, 3000);

            return () => clearInterval(interval);
        }
        // eslint-disable-next-line
    }, [show, qr, paymentStatus, amount]);

    return <div>
        {show && <div className="fixed w-full h-screen bg-black/50 left-0 top-0 z-10 flex items-center px-3">
            <div className="mx-auto w-full max-w-[768px] bg-white rounded-2xl z-20">
                <SimpleBar style={{maxHeight: "90vh"}}>
                    <div className="min-h-[600px] h-auto flex flex-col gap-3 px-3">
                        <button className="mt-3 block bg-stone-100 hover:bg-stone-200 transition-all duration-150 p-2 sm:p-3 rounded-md ml-auto mr-0" onClick={() => setShow(false)}>
                            <IoCloseSharp/>
                        </button>
                        <div className="grow sm:px-5 content-center overflow-y-auto pb-5">
                            {paymentType === "visa" ? <Elements stripe={stripePromise} options={{
                                currency: "usd",
                                mode: "payment",
                                amount: convertToSubCurrency(amount)
                            }}>
                                <CheckoutForm amount={amount}/>
                            </Elements> : <div className="h-full text-center content-center p-2">
                                {qr ? <div>
                                    {!paymentStatus ? <div className="w-full">
                                        <div className="w-full max-w-[300px] block mx-auto shadow-lg rounded-xl overflow-hidden">
                                            <div className="bg-[#ce0809] p-3 text-center text-white">
                                                <span>KHQR</span>
                                            </div>
                                            <div className="p-6">
                                                <div className="text-start pb-6">
                                                    <p>Donation to 1Light Cambodia</p>
                                                    <h3 className="text-black font-semibold">${amount.toFixed(2)}</h3>
                                                </div>
                                                <div className="relative h-auto">
                                                    <QRCode value={qr.qr} className="w-full h-auto"/>
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-black rounded-full text-white font-bold leading-9">$</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Countdown date={timestamp + 10 * 1000 * 60} renderer={renderer}/>
                                    </div> : <div className="p-10 space-y-4">
                                        <div className="w-1/2 max-w-[150px] aspect-square text-center content-center bg-gradient rounded-full mx-auto opacity-50">
                                            <MdOutlinePayment className="text-4xl mx-auto text-white"/>
                                        </div>
                                        <h3 className="text-transparent bg-gradient bg-clip-text">Thank you!</h3>
                                        <p className="text-base md:text-lg text-black">You donated ${amount.toFixed(2)} successfully</p>
                                    </div>}
                                </div> : <>
                                    <div className="mb-3">
                                        <div className="mb-5 text-center">
                                            <div>
                                                <p className="font-semibold text-dark text-lg md:text-xl">General Information</p>
                                                <div className="text-start my-4">
                                                    <label htmlFor="donorName">Please enter your full name</label>
                                                    <input
                                                        id="donorName"
                                                        className="mt-1 form-input w-full py-2 md:py-3 rounded-lg"
                                                        name="donorName"
                                                        type="text"
                                                        value={donorName}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorName(e.target.value)}
                                                        placeholder="Full name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-semibold text-dark text-lg md:text-xl">Please select the amount you want to donate</p>
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                                                {DonationAmountOptions.map((option, index) => (
                                                    <div key={index} className={`p-2 md:p-3 grow border text-center content-center cursor-pointer rounded-lg transition-all duration-150 hover:shadow hover:text-dark ${amount === option && "border-transparent ring-primary ring-2 text-black"}`} onClick={() => setAmount(option)}>{option}$</div>
                                                ))}
                                            </div>
                                            {inputBehavior === "option" ? <div className="mt-3 md:mt-4 p-2 md:p-3 grow border text-center content-center cursor-pointer rounded-lg transition-all duration-150 hover:shadow hover:text-dark" onClick={() => setInputBehavior("custom")}>Custom amount</div> : <div className="mt-3 md:mt-4 text-start">
                                                <label htmlFor="amount">Please enter the amount($) you want to donate</label>
                                                <input
                                                    id="amount"
                                                    className="mt-1 form-input w-full py-2 md:py-3 rounded-lg"
                                                    name="amount"
                                                    type="number"
                                                    defaultValue={amount}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                                                    onKeyDown={(e) => {
                                                        if (["e", "E", "-", "+"].includes(e.key)) e.preventDefault();
                                                    }}
                                                    placeholder="Amount ($)"
                                                    required
                                                />
                                            </div>}
                                        </div>
                                    </div>
                                    <button
                                        onClick={generateBakongKhQr}
                                        disabled={amount <= 0 || loading || !donorName || donorName.length < 2}
                                        className="h-[50px] flex gap-2 justify-center items-center w-full btn btn-primary my-4 rounded-lg after:rounded-lg hover:after:scale-[1.01]">
                                        {loading && <div className="w-7 h-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#FFFFFF" /><stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9" /><stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6" /><stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite" /></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70" /></svg>
                                        </div>}
                                        {loading ? "Processing..." : "Donate"}
                                    </button>
                                </>}
                            </div>}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>}
        <div className="pt-10 container">
            <Image src="https://images.justgiving.com/image/fa736d52-6df6-4c63-9bc5-ba7fff4c2b01.jpg"
                   alt="donation-banner" className="w-full aspect-[2/1] object-cover rounded-2xl" width={100}
                   height={100} data-aos="zoom-in" data-aos-delay={500}/>
            <div
                data-aos="fade-up" data-aos-delay={600}
                className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] flex flex-col md:flex-row gap-5 justify-center items-center relative -top-[100px]">
                {donationBlogs.map((desc: string, index: number) => (
                    <div key={index}
                         className={`p-4 rounded-2xl bg-white content-center cursor-pointer transition-all duration-150 hover:shadow-2xl hover:text-black w-full ${index !== activeIndex ? "h-[140px] shadow" : "h-auto scale-105 text-black shadow-xl"}`}
                         onClick={() => setActiveIndex(index)}>
                        <p className={`overflow-hidden ${index !== activeIndex && "line-clamp-3"}`}>{desc}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="relative">
            <div className="absolute w-[90px] h-[90px] bg-gradient left-40 top-1/3 rounded-full -z-[1]"></div>
            <div className="absolute w-[90px] h-[90px] bg-gradient left-1/2 top-1/2 rounded-full -z-[1] -translate-x-1/2"></div>
            <div className="absolute w-[50px] h-[50px] bg-gradient right-20 bottom-2/3 rounded-full -z-[1]"></div>
            <div className="section bg-white/50 backdrop-blur-lg z-[1] py-10">
                <div className="container text-center" data-aos="fade-up" data-aos-delay={300}>
                    <button className="btn btn-primary block mx-auto cursor-default" onClick={undefined}>Give Support</button>
                    <p className="my-3">Choose a payment method below to donate:</p>
                    <div className="inline-flex gap-3">
                        <button className="btn btn-outline-primary" onClick={donateViaBakong}>Donate via KHQR</button>
                        {/*<button className="btn btn-outline-primary" onClick={donateViaVisa}>VISA</button>*/}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Donation