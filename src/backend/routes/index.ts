import express from 'express'
import postUser from './user/post.createUser'
import loginUser from "./user/login.user"
import postAddCity from "./city/post.addCity";
import putUpdateCity from "./city/put.updateCity";
import deleteDeleteCity from "./city/delete.deleteCity";
import { getCities } from './city/get.cities'
import { getCurrentWeather } from './weather/get.currentWeather'
import { getWeatherForDaysFromSelectedCity } from './weather/get.weatherForDays'
import { getCurrentWeatherForSelectedCities } from './weather/get.currentWeatherForSelectedCities'
import { getWeatherForSelectedCitiesForSeveralDays } from './weather/get.weatherForSelectedCitiesForSeveralDays'


const router = express.Router()

// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    postUser,
    loginUser,
    postAddCity,
    putUpdateCity,
    deleteDeleteCity
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
// get cities by name
router.get('/api/cities', getCities)
// get current weather for selected city
router.get('/api/current_weather',getCurrentWeather)
// get weather selected city for several days
router.get('/api/weather_for_city',getWeatherForDaysFromSelectedCity)
// get current weather selected cities
router.get('/api/current_weather_for_selected_cities',getCurrentWeatherForSelectedCities)
// get weather for several days selected cities
router.get('/api/weather_for_selected_cities',getWeatherForSelectedCitiesForSeveralDays)



export default router
