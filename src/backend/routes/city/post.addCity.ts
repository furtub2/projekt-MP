import { Request, Response } from 'express';
import { prisma } from '../../database';
import { StatusCodes } from 'http-status-codes';
import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import {authorize} from "../../utils/middleware.utils";

export default {
    method: 'post',
    path: '/api/addCity',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { name, longitude, latitude, country } = req.body;
                const parsedLongitude = String(longitude);
                const parsedLatitude = String(latitude);
                // Create a new city
                const newCity = await prisma.city.create({
                    data: {
                        name,
                        longitude: parsedLongitude,
                        latitude: parsedLatitude,
                        country,
                    },
                });

                return newCity;
            },
        }),
} as TRoute;
