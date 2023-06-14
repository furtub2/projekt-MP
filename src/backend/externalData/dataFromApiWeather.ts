import axiosWeather from "../api/axiosWeather";

const URL_PARAM_FORECAST = `forecast?`;
const URL_PARAM_LATITUDE = `latitude=`;
const URL_PARAM_LONGITUDE = `&longitude=`;
const URL_PARAM_CURRENT_WEATHER = `&current_weather=true`;


export const getCurrentWeatherFromSelectedCity = async (long:number,lat:number) =>{
    const response = await axiosWeather(`${URL_PARAM_FORECAST}${URL_PARAM_LATITUDE}${lat}${URL_PARAM_LONGITUDE}${long}${URL_PARAM_CURRENT_WEATHER}`);
    const {data} = response;
    const {current_weather} = data;
    return current_weather;
}