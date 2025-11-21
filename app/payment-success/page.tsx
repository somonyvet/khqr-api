import {redirect} from "next/navigation";
import PaymentSuccess from "@partials/PaymentSuccess";
import {convertToOriginCurrency} from "@lib/convertToSubCurrency";

interface Props {
    searchParams: {
        amount: string;
        payment_intent: string;
    }
}

const PaymentSuccessPage = ({searchParams}: Props) => {
    const {amount, payment_intent} = searchParams;
    let donatedAmount = Number(amount);

    fetch(`${process.env.BASE_URL}/api/retrieve-payment-intent/${payment_intent}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then((data) => {
        donatedAmount = convertToOriginCurrency(data.amount);
    }).catch(err => {
        console.log(err, "err");
        redirect("/");
    })

    if (!amount || isNaN(donatedAmount))
        redirect("/");

    return <>
        <PaymentSuccess amount={donatedAmount}/>
    </>
}

export default PaymentSuccessPage