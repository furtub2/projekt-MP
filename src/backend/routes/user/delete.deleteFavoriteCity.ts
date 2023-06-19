import { Request, Response } from 'express';
import { prisma } from '../../database';
import { StatusCodes } from 'http-status-codes';
import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ';

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
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token!, SECRET) as unknown as Jwt & JwtPayload;
        const { name, country } = req.body;

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

        if (!city) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: 'City not found' });
        }

        await prisma.favoriteCity.deleteMany({
          where: {
            userId: decodedToken.id,
            cityId: city.id,
          },
        });

        const updatedUser = await prisma.user.update({
          where: { id: decodedToken.id },
          data: {
            favorites: {
              disconnect: { id: city.id },
            },
          },
        });

        const updatedCity = await prisma.city.update({
          where: { id: city.id },
          data: {
            favorites: {
              disconnect: { id: decodedToken.id },
            },
          },
        });

        return { userId: updatedUser.id, cityId: updatedCity.id };
      },
    }),
} as TRoute;
