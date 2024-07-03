import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const createProduct = async (data, access_token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
        const response = await axios.post(`${hostURL}/product`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateProduct = async (data, access_token, id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
        const response = await axios.patch(`${hostURL}/product/${id}`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getIdsProductsByBusinessOwner = async (emailUser) => {
    try {
        const response = await axios.get(`${hostURL}/product/businessOwner/${emailUser}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const searchIdsProductsByQuery= async (value) => {
    try {
        const response = await axios.get(`${hostURL}/product/search/${value}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${hostURL}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getDataCategories = async (emailUser) => {
    try {
        const response = await axios.get(`${hostURL}/product/categories/${emailUser}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getDataProductsByFilter = async (filter) => {
    try {
        const response = await axios.post(`${hostURL}/product/filter`, filter);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}