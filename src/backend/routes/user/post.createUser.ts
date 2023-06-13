import { Request, Response } from 'express'
import { v4 } from 'uuid'
import crypto from 'crypto'
import { prisma } from '../../database'
import { checkPrismaError } from '../../utils/prisma.utils'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { body } from 'express-validator'
import { handleRequest } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'

const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/createUser',
    validators: [body('email').isEmail(), body('password').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {
                uniqueConstraintFailed: 'Email must be unique.',
            },
            execute: async () => {
                const { email, name, password} = req.body
                const passwordHash = createHash(password, SALT)
                return prisma.user.create({
                    data: {
                        id: v4(),
                        name,
                        email,
                        password: passwordHash,
                        favorites: {create: []},
                    },
                    include:{favorites: true}
                });
            },
        }),
} as TRoute

/*export const postUser: RequestHandler = async (req, res) => {
    const { email, name, password } = req.body
    const hash = crypto.createHmac('sha512', SALT)
    hash.update(password)
    const passwordHash = hash.digest('hex')
    try {
        const createdUser = await prisma.user.create({
            data: {
                id: v4(),
                name,
                email,
                password: passwordHash,
                favorites: { create: [] },
            },
        })
        res.status(StatusCodes.CREATED)
        res.send({ ...createdUser, password: '***' })
    } catch (err) {
        console.log(err)
        console.error(err)
        const response = checkPrismaError(err, {
            uniqueConstraintFailed: 'Email must be unique.',
        })
        res.status(response.status)
        res.send(response.message)
    }
}*/
