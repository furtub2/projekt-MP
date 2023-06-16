import { RequestHandler } from "express";
import { getCurrentWeatherFromSelectedCity } from "../../externalData/dataFromApiWeather";


const LONGITUDE_REGEX = /^-?((180\.0{0,6})|(((1[0-7]\d)|([1-9]?\d))(\.\d{0,6})?))$/;
const LATITUDE_REGEX = /^-?((90\.0{0,6})|(([1-8]?\d)(\.\d{0,6})?))$/;

export const getCurrentWeather: RequestHandler = (req,res) =>{
    try{
        const {latitude,longitude} = req.body;

        if(!latitude || !longitude) throw new Error("Please provide values for latitude and longitude.")

        if (!LATITUDE_REGEX.test(latitude) || !LONGITUDE_REGEX.test(longitude)) 
            throw new Error("Invalid longitude or latitude. Please try again!");
        (async() =>{
            const response = await getCurrentWeatherFromSelectedCity(longitude,latitude);
            res.send(response);
        })()
    }catch(err){
        console.log(err);
        res.status(400).send({ error: `${err}`}); 
    }
}