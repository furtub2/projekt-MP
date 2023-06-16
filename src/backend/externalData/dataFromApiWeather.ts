import axios, { AxiosError, isAxiosError } from "axios";
import axiosWeather from "../api/axiosWeather";

const URL_PARAM_FORECAST = `forecast?`;
const URL_PARAM_CURRENT_WEATHER = `&current_weather=true`;
const URL_PARAM_LATITUDE = `latitude=`;
const URL_PARAM_LONGITUDE = `&longitude=`;
const URL_PARAM_DAILY_WEATHER = `&daily=temperature_2m_max,apparent_temperature_max,windspeed_10m_max`;
const URL_DAYS = `&forecast_days=`;
const URL_PARAM_TIMEZONE = `&timezone=Europe%2FBerlin`;



export const getCurrentWeatherFromSelectedCity = async (long:number,lat:number) =>{
    const urlForCurrentWeather = `${URL_PARAM_FORECAST}${URL_PARAM_LATITUDE}${lat}${URL_PARAM_LONGITUDE}${long}${URL_PARAM_CURRENT_WEATHER}`;
    const response = await axiosWeather(urlForCurrentWeather);
    const {data} = response;
    const {current_weather} = data;
    return current_weather;
}

export const getWeatherForSeveralDaysForSelectedCity = async (long:number,lat:number,days:number) => {
    const urlForWeather = URL_PARAM_FORECAST+
        URL_PARAM_LATITUDE+lat+
        URL_PARAM_LONGITUDE+long+
        URL_PARAM_DAILY_WEATHER+
        URL_DAYS+days+
        URL_PARAM_TIMEZONE;
    const response = await axiosWeather(urlForWeather);
    const {data} = response;
    return data;
}