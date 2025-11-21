import axios from "axios";

const createPaymentIntent = async (payload: {amount: number})=> {
    await axios.post("/api/create-payment-intent", payload).then(res => {
        return Promise.resolve(res);
    }).catch(err => {
        return Promise.reject(err);
    });
}

export {createPaymentIntent}