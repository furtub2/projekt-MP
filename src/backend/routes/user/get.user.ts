import { Request, Response } from 'express';
import { prisma } from '../../database';
import { StatusCodes } from 'http-status-codes';
import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import jwt, {Jwt, JwtPayload} from "jsonwebtoken";

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/user/',
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

                const user = await prisma.user.findUnique({
                    where: { id: decodedToken.id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        favorites: true,
                    },
                });

                if (!user) {
                    throw new Error('User not found');
                }

                return user;
            },
        }),
} as TRoute;
