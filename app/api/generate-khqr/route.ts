import {NextRequest, NextResponse} from "next/server";
import {BakongKHQR, IndividualInfo} from "bakong-khqr";
import {CurrencyEnum} from "../../../types/enums/currency.enum";

export async function POST(request: NextRequest) {
    try {
        const {donorName, amount} = await request.json();

        if (!amount || !donorName) {
            return new NextResponse(JSON.stringify({
               error: {
                   code: 400,
                   message: "Donor name and amount are required"
               }
            }), {
                status: 400
            });
        }

        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            return new NextResponse(JSON.stringify({
                error: {
                    code: 400,
                    message: "Amount must be a number and greater than 0"
                }
            }), {
                status: 400
            });
        }

        const optionalData = {
            amount,
            currency: CurrencyEnum.USD.number,
            mobileNumber: "855884388973",
            purposeOfTransaction: "donation",
            languagePreference: "en"
        }
        const individualInfo: IndividualInfo & {expirationTimestamp: number} = {
            bakongAccountID: "lihong_hun@aclb",
            acquiringBank: "ACLEDA",
            merchantName: "1Light Cambodia",
            merchantNameAlternateLanguage: "Lihong_Hun",
            expirationTimestamp: Date.now() + 10 * 60 * 1000,
            ...optionalData
        }

        const KHQR = new BakongKHQR();
        const individual = KHQR.generateIndividual(individualInfo);

        if (!individual.data) {
            const message = individual.status.message;
            return new NextResponse(JSON.stringify({
                error: {
                    code: 400,
                    message
                }
            }), {
                status: 400
            });
        }

        return new NextResponse(JSON.stringify({data: individual.data, donorName, timestamp: Date.now()}), {
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