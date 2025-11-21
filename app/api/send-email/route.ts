import {NextRequest, NextResponse} from "next/server";
import nodemailer from "nodemailer";

const auth= {
    user: "onelightworld.kh@gmail.com",
    pass: "pqdn pgza vwti vkqi"
}

export async function POST(request: NextRequest) {
    try {
        const {email, subject, message} = await request.json();

        if (!email || !subject || !message)
            return new NextResponse(JSON.stringify({
                error: {
                    code: 400,
                    message: "Email, subject, message are required"
                }
            }), {
                status: 400,
                headers: {"Content-Type": "application/json"}
            });

        let data: any;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth
        })
        const mailOptions = {
            from: auth.user,
            to: auth.user,
            subject,
            text: message,
            replyTo: email
        }

        await transporter.sendMail(mailOptions).then(result => {
            data = {
                status: 201,
                message: "Email sent successfully"
            };
        }).catch(err => {
            return new NextResponse(JSON.stringify(err), {
                status: 500,
                headers: {"Content-Type": "application/json"}
            });
        });

        if (!data)
            return new NextResponse(JSON.stringify({message: "Internal server error"}), {
                status: 500,
                headers: {"Content-Type": "application/json"}
            });

        return new NextResponse(JSON.stringify({data}), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: err?.raw?.message ?? "Internal server error"
        }
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: {"Content-Type": "application/json"}
        });
    }
}