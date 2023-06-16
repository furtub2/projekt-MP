import axiosWeather from "../api/axiosWeather";
import { getUrl } from "../api/urlForApi";


export const getCurrentWeatherFromSelectedCity = async (long:number,lat:number) =>{
    const url = getUrl(lat,long);
    const response = await axiosWeather(url);
    const {data} = response;
    const {current_weather} = data;
    return current_weather;
}

export const getWeatherForSeveralDaysForSelectedCity = async (long:number,lat:number,days:number) => {
    const url = getUrl(lat,long,days)
    const response = await axiosWeather(url);
    const {data} = response;
    return data;
}

// export const getCurrentWeatherForSelectedCities = async (listOfLongitude:number[],listOfLatitude:number[]) =>{
//     const urlFor
// }