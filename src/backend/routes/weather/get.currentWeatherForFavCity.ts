import { RequestHandler } from "express";
import { getCurrentWeatherFromSelectedCity } from "../../externalData/dataFromApiWeather";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFavoriteCitiesWeather: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { favorites: { include: { city: true } } },
      });
      

    if (!user) throw new Error("Nie znaleziono użytkownika o podanym identyfikatorze.");

    const favoriteCities = user.favorites.map((favorite) => favorite.city);

    const weatherPromises = favoriteCities.map((city) =>
      getCurrentWeatherFromSelectedCity(parseFloat(city.longitude), parseFloat(city.atitude))
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
