import { Request, Response } from 'express'
import { prisma } from '../../database'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'put',
    path: '/api/updateCity/:id',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: {},
            execute: async () => {
                const { id } = req.params;
                const { name, longitude, latitude, country } = req.body;
                const parsedLongitude = String(longitude);
                const parsedLatitude = String(latitude);

                // Update the city
                const updatedCity = await prisma.city.update({
                    where: { id: parseInt(id) },
                    data: {
                        name,
                        latitude: parsedLatitude,
                        longitude: parsedLongitude,
                        country,
                    },
                });

                return updatedCity;
            },
        }),
} as TRoute;
