// import { RequestHandler } from "express";
// import { getCitiesByName } from "../../externalData/dataFromApi";
// export const getCities: RequestHandler = (req,res) =>{
//     const {name} = req.body;
//     try{
//         (async () =>{
//             const response = await getCitiesByName(name);
//             res.send(response);
//         })()
//     }catch(err){
//         console.error(err);

import { RequestHandler } from "express";
import { getCurrentWeatherFromSelectedCity } from "../../externalData/dataFromApiWeather";

export const getCurrentWeather: RequestHandler = (req,res) =>{
    try{
        (async() =>{
            const response = await getCurrentWeatherFromSelectedCity(19.93658,50.06143)
            res.send(response);
        })()

    }catch(err){
        console.error(err);
    }
}