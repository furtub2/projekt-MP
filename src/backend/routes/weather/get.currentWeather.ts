import {Request, response, Response} from "express";
import { getCurrentWeatherFromSelectedCity } from "../../externalData/dataFromApiWeather";
import { LATITUDE_REGEX, LONGITUDE_REGEX } from "../../validations/regexExpression";
import {authorize} from "../../utils/middleware.utils";
import {handleRequest} from "../../utils/request.utils";
import {StatusCodes} from "http-status-codes";
import {TRoute} from "../types";


export default {
    method: 'get',
    path: '/api/currentWeather',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: {},
            execute: async () => {
                const {latitude,longitude} = req.body;

                if(!latitude || !longitude) throw new Error("Please provide values for latitude and longitude.")

                if (!LATITUDE_REGEX.test(latitude) || !LONGITUDE_REGEX.test(longitude))
                    throw new Error("Invalid longitude or latitude. Please try again!");

                return await getCurrentWeatherFromSelectedCity(longitude, latitude);
            },
        }),
} as TRoute;
