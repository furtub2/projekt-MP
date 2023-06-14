import { RequestHandler } from "express";
import { getCitiesByName } from "../../externalData/dataFromApi";
export const getCities: RequestHandler = (req,res) =>{
    const {name} = req.body;
    try{
        (async () =>{
            const response = await getCitiesByName(name);
            res.send(response);
        })()
    }catch(err){
        console.error(err);
    }
}