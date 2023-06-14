import axios from "../api/axiosGeocoding";

const SEARCH_PARAMS = `search?name=`;

export const getCitiesByName = async (cityName:string) =>{
    const response = await axios.get(`${SEARCH_PARAMS}${cityName}`);
    const {data} = response;
    return data;
}
