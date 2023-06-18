import { app, request, assert } from '../init.spec';

const coordinates = {
    longitude: '52.409538',
    latitude: '16.931992',
};

const multipleCoordinates = {
    longitude: ['52.409538', '13.409538', '14.409538'],
    latitude: ['16.931992', '32.25553', '52.12312'],
};

describe('get current weather', function () {
    it('should return current weather', async function () {
        return request(app)
            .get('/api/current_weather')
            .send(coordinates)
            .expect(200)
            .then(resp => {
                assert(resp.body.temperature !== undefined)
                assert(resp.body.windspeed !== undefined)
                assert(resp.body.winddirection !== undefined)
                assert(resp.body.weathercode !== undefined)
                assert(resp.body.is_day !== undefined)
                assert(resp.body.time !== undefined)
            });
    });
});

describe('get weather for days', function () {
    it('should return weather specified number of days', async function () {
        const data = {...coordinates, 'days': 7}
        return request(app)
            .get('/api/weather_for_city')
            .send(data)
            .expect(200)
            .then(resp => {
                assert(resp.body !== undefined)
                assert(resp.body.daily.time.length === data.days)
            });
    });
});

describe('get weather for days', function () {
    it('should return weather specified number of days', async function () {
        return request(app)
            .get('/api/current_weather_for_selected_cities')
            .send(multipleCoordinates)
            .expect(200)
            .then(resp => {
                assert(resp.body.length == multipleCoordinates.latitude.length)
            });
    });
});
