import axios from "axios";
import { hostURL } from "@/components/dataEnv";

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${hostURL}/auth/login`, data);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${hostURL}/auth/register`, data);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await axios.post(`${hostURL}/auth/update-password`, data);
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editProfileUser = async (data, access_token) => {
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.post(`${hostURL}/users/edit-profile`, data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

export const editProfileUserByQuery = async (data, access_token, dataIdUser) => {
    //agregar el token al header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; 

    try {
        const response = await axios.post(`${hostURL}/users/edit-profile?idUser=${dataIdUser}`, data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

export const getProfileUserByEmail = async (emailUser) => {
    try {
        const response = await axios.get(`${hostURL}/users/profile/${emailUser}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getDataBusinessOwnerById = async (id) => {
    try {
        const response = await axios.get(`${hostURL}/users/dataBusinessOwner/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }

}

export const getDataUsers = async (role,page,limit) => {
    try {
        const response = await axios.get(`${hostURL}/users?role=${role}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}