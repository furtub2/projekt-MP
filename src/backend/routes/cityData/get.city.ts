import { RequestHandler } from "express";
import { getCitiesByName } from "../../externalData/dataFromApi";
export const getCity: RequestHandler = (req,res) =>{
    try{
        (async () =>{
            const response = await getCitiesByName('Warsaw');
            res.send(response);
        })()
    }catch(err){
        console.error(err);
    }
}