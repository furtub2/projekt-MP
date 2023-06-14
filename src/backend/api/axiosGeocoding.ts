import axios from 'axios';
const URL_API_GEOCODING = 'https://geocoding-api.open-meteo.com/v1';


export default axios.create({
    baseURL: URL_API_GEOCODING
});
