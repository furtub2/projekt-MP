import { Request, Response } from 'express';
import { prisma } from '../../database';
import { StatusCodes } from 'http-status-codes';
import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import jwt, {Jwt, JwtPayload} from "jsonwebtoken";

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

export default {
    method: 'delete',
    path: '/api/deleteFavoriteCity',
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

                if (!name || !country) throw new Error("You must provide city name and country.");
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

                await prisma.favoriteCity.deleteMany({
                    // @ts-ignore
                    where: { userId: decodedToken.id, cityId: city.id },
                });

                return { userId: decodedToken.id, cityId: city?.id };
            },
        }),
} as TRoute;
