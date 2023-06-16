import { RequestHandler } from "express";
import { LATITUDE_REGEX, LONGITUDE_REGEX } from "../../validations/regexExpression";
import { getCurrentWeatherSelectedCities } from "../../externalData/dataFromApiWeather";


export const getCurrentWeatherForSelectedCities: RequestHandler = (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      if (!latitude || !longitude) {
        throw new Error("Please provide values for latitude and longitude.");
      }
  
      if (latitude.length !== longitude.length) {
        throw new Error("You passed the wrong number of values.");
      }
  
      latitude.forEach((lat: any, index: number) => {
        const long = longitude[index];
        if (!LATITUDE_REGEX.test(lat) || !LONGITUDE_REGEX.test(long)) {
          throw new Error(`Invalid longitude or latitude at index ${index}. Please try again!`);
        }
      });
  
      (async () => {
        const response = await getCurrentWeatherSelectedCities(longitude, latitude);
        res.send(response);
      })();
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: `${err}` });
    }
  };
  
