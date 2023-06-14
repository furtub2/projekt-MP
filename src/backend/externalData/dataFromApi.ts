import axios from "../api/axiosGeocoding";

const SEARCH_PARAMS = `search?name=`;

interface Location {
    name:string;
    country:string;
    longitude:number;
    latitude:number
}

const isArrayResponse = (response: any): response is Array<Location> => {
    return Array.isArray(response);
}

export const getCitiesByName = async (cityName:string) =>{
    const response = await axios.get(`${SEARCH_PARAMS}${cityName}`);
    const {data} = response;
    const {results} = data;
    
    if(!isArrayResponse(results)) return [];

    const locations: Location[] = results.map((location:Location) => {
        const {name,country,longitude,latitude} = location;
        return {name,country,longitude,latitude};
    })

    return locations;
}

