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
                const { name, longitude, atitude, country } = req.body;

                // Update the city
                const updatedCity = await prisma.city.update({
                    where: { id: parseInt(id) },
                    data: {
                        name,
                        longitude,
                        atitude,
                        country,
                    },
                });

                return updatedCity;
            },
        }),
} as TRoute;
