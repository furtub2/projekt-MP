import { RequestHandler } from "express";
import { getWeatherForSeveralDaysForSelectedCity } from "../../externalData/dataFromApiWeather";

export const getWeatherForDaysFromSelectedCity: RequestHandler = (req,res) =>{
    const {latitude,longitude,days} = req.body;
    try{
        (async() =>{
            const response = await getWeatherForSeveralDaysForSelectedCity(longitude,latitude,days)
            res.send(response);
        })()

    }catch(err){
        console.error(err);
    }
}