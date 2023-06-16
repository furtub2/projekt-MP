import { RequestHandler } from "express";
import { DAYS_REGEX, LATITUDE_REGEX, LONGITUDE_REGEX } from "../../validations/regexExpression";
import { getWeatherSelectedCitiesForSevearalDays } from "../../externalData/dataFromApiWeather";

export const getWeatherForSelectedCitiesForSeveralDays: RequestHandler = (req, res) => {
    try {
      const { latitude, longitude ,days} = req.body;
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

      if(!DAYS_REGEX.test(days)) 
            throw new Error("You can only see max for 16 days min 1 day and don't provide negative values. Please try again!");
        
      (async () => {
        const response = await getWeatherSelectedCitiesForSevearalDays(longitude, latitude,days);
        res.send(response);
      })();
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: `${err}` });
    }
  };