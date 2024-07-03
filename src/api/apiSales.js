import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const createSale = async (data, access_token) => {
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.post(`${hostURL}/sales/create`, data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

export const updateSale = async (data, access_token, idSale) => {
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.post(`${hostURL}/sales/update/${idSale}`, data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

export const getSales = async (access_token) => {
    //este metodo es para obtener todas las ventas del businessOwner logeado en el localstorage
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.get(`${hostURL}/sales`);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message};
    }
}