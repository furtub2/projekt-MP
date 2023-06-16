import { RequestHandler } from "express";
import { getCitiesByName } from "../../externalData/dataFromApi";

const CITY_NAME_REGEX = /^[a-zA-Z\s\-']{1,}$/;

export const getCities: RequestHandler = async (req, res) => {
    try {
      const { name } = req.body;

      if (!CITY_NAME_REGEX.test(name)) throw new Error("Invalid city name. Please try again.");

      const response = await getCitiesByName(name);

      if (!response.length) throw new Error(("There is no matching data. Sorry!"));
  
      res.send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: `${err}`}); 
    }
  };