import {NextRequest, NextResponse} from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest, {params}) {
    try {
        const paymentId = params["payment-id"];

        if (!paymentId)
            return new NextResponse(JSON.stringify({
                error: {
                    code: 400,
                    message: "Missing payment intend id"
                }
            }), {
                status: 400
            })

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

        return new NextResponse(JSON.stringify({data: {...paymentIntent}}), {status: 200});
    } catch (err) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: err?.raw?.message ?? "Internal server error"
        }
        return new NextResponse(JSON.stringify(error), {
            status: 500
        });
    }
}