import axios from "axios";
import { hostURL } from "@/components/dataEnv";

export const createStripePayment = async (data, access_token, dataIdSale) => {
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
        const result = await axios.post(`${hostURL}/stripe/createPaymentIntent`, {items: data, dataIdSale});
        return result.data;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}