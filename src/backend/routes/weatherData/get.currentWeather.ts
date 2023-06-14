import { RequestHandler } from "express";
import { getCurrentWeatherFromSelectedCity } from "../../externalData/dataFromApiWeather";

export const getCurrentWeather: RequestHandler = (req,res) =>{
    const {latitude,longitude} = req.body;
    try{
        (async() =>{
            const response = await getCurrentWeatherFromSelectedCity(longitude,latitude)
            res.send(response);
        })()

    }catch(err){
        console.error(err);
    }
}