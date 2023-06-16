import { AxiosResponse } from "axios";
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

export const getCurrentWeatherSelectedCities = async (listOfLongitude:number[],listOfLatitude:number[]) =>{
    const listOfUrl = listOfLatitude.map((lat:number,index:number) => {
        const long = listOfLongitude[index];
        return getUrl(lat,long);
    })
    try {
        const responses: AxiosResponse[] = await Promise.all(listOfUrl.map(url => axiosWeather.get(url)));
        const data = responses.map(response => response.data);
        return data;
      } catch (error) {
        console.error(error);
      }
}