import axios from "axios";
import { hostURL } from "@/components/dataEnv";



export const sendConfirmCode = async (data) => {
    try {
        const response = await axios.post(`${hostURL}/mailer/sendConfimCode`, {email: data});
        const result = response.data || response;
        return result;
    } catch (error) {
        console.log(error);
        return { error: error };
    }
}