const URL_PARAM_FORECAST = `forecast?`;
const URL_PARAM_CURRENT_WEATHER = `&current_weather=true`;
const URL_PARAM_LATITUDE = `latitude=`;
const URL_PARAM_LONGITUDE = `&longitude=`;
const URL_PARAM_DAILY_WEATHER = `&daily=temperature_2m_max,apparent_temperature_max,windspeed_10m_max`;
const URL_DAYS = `&forecast_days=`;
const URL_PARAM_TIMEZONE = `&timezone=Europe%2FBerlin`;


export const getUrl = (lat:number, long:number, days?:number , city?:string):string => {
    const baseURL = `${URL_PARAM_FORECAST}${URL_PARAM_LATITUDE}${lat}${URL_PARAM_LONGITUDE}${long}`;

    if(days) return baseURL+URL_PARAM_DAILY_WEATHER+URL_DAYS+days+URL_PARAM_TIMEZONE;

    const currentWeatherUrl = baseURL+URL_PARAM_CURRENT_WEATHER;
    return currentWeatherUrl;
}