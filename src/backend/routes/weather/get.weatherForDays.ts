import { RequestHandler } from "express";
import { getWeatherForSeveralDaysForSelectedCity } from "../../externalData/dataFromApiWeather";
import { DAYS_REGEX, LATITUDE_REGEX, LONGITUDE_REGEX } from "../../validations/regexExpression";



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
        res.status(400).send({ error: `${err}`}); 
    }
}