import { RequestHandler } from "express";
import { getCurrentWeatherFromSelectedCity, getWeatherForSeveralDaysForSelectedCity } from "../../externalData/dataFromApiWeather";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../database";

export const getWeatherForSeveralDaysFromFav: RequestHandler = async (req, res) => {
  try {
    const { userId, days } = req.body;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { favorites: { include: { city: true } } },
      });
      

    if (!user) throw new Error("Not found User");

    const favoriteCities = user.favorites.map((favorite) => favorite.city);

    const weatherPromises = favoriteCities.map((city) =>
      getWeatherForSeveralDaysForSelectedCity(Number(city.longitude), Number(city.atitude), days)
    );

    const weatherResults = await Promise.all(weatherPromises);

    const favoriteCitiesWeather = favoriteCities.map((city, index) => ({
      city,
      weather: weatherResults[index],
    }));

    res.send(favoriteCitiesWeather);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: `${err}` });
  }
};
