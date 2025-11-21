import {NextRequest, NextResponse} from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const {amount} = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            }
        })

        return new NextResponse(JSON.stringify({clientSecret: paymentIntent.client_secret}), {
            status: 201
        });
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