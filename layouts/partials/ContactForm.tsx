"use client";

import React, {Fragment, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {IoCloseSharp} from "react-icons/io5";
import emailjs from "@emailjs/browser";

interface DataProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const initialData: DataProps = {
    name: "",
    email: "",
    subject: "",
    message: ""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required()
})

const ContactForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<DataProps>(initialData);
    const form = useFormik<DataProps>({
        initialValues: data,
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
        onSubmit: async (values, {resetForm}) => {
            setLoading(true);
            // await fetch("/api/send-email", {
            //     method: "POST",
            //     body: JSON.stringify(values),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }).then(res => res.json()).then((data) => {
            //     setLoading(false);
            //     setShow(true);
            //     resetForm({values: initialData});
            //     setData({...data, name: values.name});
            // }).catch(err => {
            //     console.log(err);
            //     setLoading(false);
            // })

            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            const templateParams: Record<string, unknown> = {
                name: values.name,
                email: values.email,
                subject: values.subject,
                message: values.message
            }

            await emailjs.send(serviceId, templateId, templateParams, publicKey).then(result => {
                if (result.status === 200) {
                    setLoading(false);
                    setShow(true);
                    resetForm({values: initialData});
                    setData({...data, name: values.name});
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
    })

    const onInputChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        form.setFieldValue(name, value);
    }

    const closeAlert = () => {
        setShow(false);
        setData(initialData);
    }

    return <Fragment>
        {show && <div className="max-w-md text-xs sm:text-sm text-dark rounded-lg bg-white/70 backdrop-blur-sm shadow-lg fixed bottom-7 left-6 sm:left-auto right-6" role="alert">
            <div className="p-2 flex justify-between items-center relative ">
                <h6 className="text-green-500 font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">Success</h6>
                <button className="block bg-stone-100 hover:bg-stone-200 transition-all duration-150 p-2 sm:p-3 rounded-md ml-auto mr-0" onClick={closeAlert}>
                    <IoCloseSharp/>
                </button>
            </div>
            <div className="px-5 pb-6 pt-2">
                Hello {data.name} 👋, You have sent your message to our email successfully. We will contact back to you through email. We will contact back to you through email. Thank!
            </div>
        </div>}
        <form className="contact-form mt-5 md:mt-0" onSubmit={form.handleSubmit}>
            <h5 className="mb-5" data-aos="fade-right" data-aos-delay={200}>Send your message to our Email</h5>
            <div className="mb-3" data-aos="fade-right" data-aos-delay={300}>
                <input className="form-input w-full" name="name" type="text" placeholder="Name" value={form.values.name} onChange={onInputChange} required/>
            </div>
            <div className="mb-3" data-aos="fade-right" data-aos-delay={400}>
                <input className="form-input w-full" name="email" type="email" placeholder="Your email" value={form.values.email} onChange={onInputChange} required/>
            </div>
            <div className="mb-3" data-aos="fade-right" data-aos-delay={500}>
                <input className="form-input w-full" name="subject" type="text" placeholder="Subject" value={form.values.subject} onChange={onInputChange} required/>
            </div>
            <div className="mb-3" data-aos="fade-right" data-aos-delay={600}>
                <textarea className="form-textarea w-full rounded-lg" rows={7} placeholder="Your message" name="message" value={form.values.message} onChange={onInputChange}/>
            </div>
            <button type="submit" className="h-[50px] btn btn-primary mx-auto flex gap-2 justify-center items-center" disabled={!form.isValid || loading} data-aos="fade-up" data-aos-delay={700}>
                {loading && <div className="w-5 h-auto relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#FFFFFF"/><stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9"/><stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6"/><stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3"/><stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"/></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"/></svg>
                </div>}
                {loading ? "Sending..." : "Send Now"}
            </button>
        </form>
    </Fragment>
}

export default ContactForm