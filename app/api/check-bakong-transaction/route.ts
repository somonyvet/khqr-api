import {NextRequest, NextResponse} from "next/server";
import {adminDb} from "@lib/firebaseAdmin";

export async function POST(request: NextRequest) {
    try {
        const {donorName, md5} = await request.json();
        const token = process.env.BAKONG_ACCESS_TOKEN;

        if (!md5 || !donorName) {
            const error = {
                code: 400,
                message: "Md5 and donor name are required"
            }
            return new NextResponse(JSON.stringify(error), {
                status: 400
            });
        }

        const transactionResponse = await fetch(`${process.env.BAKONG_API_BASE_URL}/v1/check_transaction_by_md5`, {
            method: "POST",
            body: JSON.stringify({md5}),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await transactionResponse.json();

        if (!data.data) {
            return new NextResponse(JSON.stringify({
                error: {
                    code: 500,
                    message: data.responseMessage
                }
            }), {
                status: 500
            });
        }

        const docData = {...data.data, donorName, type: "bakong-khqr"};
        docData["status"] = data.responseCode === 0;

        await adminDb.collection("donations").add(docData);

        return NextResponse.json(data);
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