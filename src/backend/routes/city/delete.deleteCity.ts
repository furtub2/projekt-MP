import { Request, Response } from 'express'
import { prisma } from '../../database'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/deleteCity/:id',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: {},
            execute: async () => {
                const { id } = req.params;

                // Delete the city
                const deletedCity = await prisma.city.delete({
                    where: { id: parseInt(id) },
                });

                return deletedCity;
            },
        }),
} as TRoute;
