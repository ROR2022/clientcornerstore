import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const getEmployees = async (emailUser) => {
    //agregar el token al header
    //axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.get(`${hostURL}/users/employees/${emailUser}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getEmployeesByFilter = async (dataFilter) => {
    try {
        const response = await axios.post(`${hostURL}/users/employees/filter`, dataFilter);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}