import { Request, Response } from 'express'
import { prisma } from '../../database'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import jwt, {Jwt, JwtPayload} from "jsonwebtoken";

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/addFavoriteCity',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: {},
            execute: async () => {
                const token = req.headers.authorization?.split(' ')[1]
                const decodedToken = jwt.verify(token!, SECRET) as unknown as Jwt & JwtPayload
                const {name, country} = req.body;

                const city = await prisma.city.findFirst({
                    where: {
                        name: {
                            equals: name as string,
                        },
                        country: {
                            equals: country as string,
                        },
                    },
                });

                const favoriteCity = await prisma.favoriteCity.create({
                    data: {
                        user: { connect: { id: decodedToken.id } },
                        // @ts-ignore
                        city: { connect: { id: city.id } },
                    },
                });

                const updatedUser = await prisma.user.update({
                    where: { id: decodedToken.id },
                    data: { favorites: { connect: { id: favoriteCity.id } } },
                });

                const updatedCity = await prisma.city.update({
                    // @ts-ignore
                    where: { id: city.id },
                    data: { favorites: { connect: { id: favoriteCity.id } } },
                });

                // @ts-ignore
                return {userId: decodedToken.id, cityId: city.id};
            },
        }),
} as TRoute
