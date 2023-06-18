import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCities: RequestHandler = async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    res.send(cities);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Wystąpił błąd serwera." });
  }
};