import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const getBranchesByBusinessOwnerEmail = async (emailBusinessOwner,query='', page=1, limit=10) => {
    try {
        //console.log("emailBusinessOwner(apiBranches):",emailBusinessOwner);
        const response = await axios.get(
            `${hostURL}/users/branches/${emailBusinessOwner}?query=${query}&page=${page}&limit=${limit}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

/* export const getBranchesByQuery = async (emailBusinessOwner,query) => {
    try {
        const response = await axios.get(`${hostURL}/users/branches/business-owner/${emailBusinessOwner}?query=${query}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
        return error;
    }
} */

export const getDataBranchesCategories= async (emailBusinessOwner) => {
    try {
        const response = await axios.get(`${hostURL}/users/branchesCategories/${emailBusinessOwner}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getBranchesByFilter = async (filter)=>{
    try {
        const response = await axios.post(`${hostURL}/users/branchesFilter`,filter);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}