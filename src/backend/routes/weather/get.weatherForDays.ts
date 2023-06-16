import { RequestHandler } from "express";
import { getWeatherForSeveralDaysForSelectedCity } from "../../externalData/dataFromApiWeather";

const LONGITUDE_REGEX = /^-?((180\.0{0,6})|(((1[0-7]\d)|([1-9]?\d))(\.\d{0,6})?))$/;
const LATITUDE_REGEX = /^-?((90\.0{0,6})|(([1-8]?\d)(\.\d{0,6})?))$/;
const DAYS_REGEX = /^([1-9]|1[0-6])$/;

export const getWeatherForDaysFromSelectedCity: RequestHandler = (req,res) =>{
    try{
        const {latitude,longitude,days} = req.body;
        if(!latitude || !longitude) throw new Error("Please provide values for latitude and longitude.")

        if (!LATITUDE_REGEX.test(latitude) || !LONGITUDE_REGEX.test(longitude)) 
            throw new Error("Invalid longitude or latitude. Please try again!");
        if(!DAYS_REGEX.test(days)) 
            throw new Error("You can only see max for 16 days min 1 day and don't provide negative values. Please try again!");
        
        (async() =>{
            const response = await getWeatherForSeveralDaysForSelectedCity(longitude,latitude,days)
            res.send(response);
        })()

    }catch(err){
        console.error(err);
    }
}