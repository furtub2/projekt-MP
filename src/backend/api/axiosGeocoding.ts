import axios from 'axios';

// const BASE_URL = 'http://localhost:5071'
const URL_API_GEOCODING = 'https://geocoding-api.open-meteo.com/v1';


export default axios.create({
    baseURL: URL_API_GEOCODING
});

// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type' : 'application/json'},
//     withCredentials: true
// });