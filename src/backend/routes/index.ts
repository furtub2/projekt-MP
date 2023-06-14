import express from 'express'
import {getStatus } from './status/get.status'
import { getCities } from './cityData/get.cities'
import { getCurrentWeather } from './weatherData/get.currentWeather'
import { getWeatherForDaysFromSelectedCity } from './weatherData/get.weatherForDays'


const router = express.Router()
// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
next() })
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
// api route
router.get('/api/status', getStatus)
// get cities by name
router.get('/api/cities', getCities)
// get current weather for selected city
router.get('/api/current_weather',getCurrentWeather)
// get weather selected city for several days
router.get('/api/weather_for_city',getWeatherForDaysFromSelectedCity)


export default router
