import { app, request, assert, getJWTToken } from '../init.spec';

const testCity = {
    name: 'Test City',
    country: 'Test Country',
    longitude: '12.12312',
    latitude: '12.12312',
};

const updatedCity = {
    id: 0,
    name: 'Test City Updated',
    country: 'Test Country Updated',
    longitude: '12.12312',
    latitude: '12.12312',
};

describe('create city', function () {
    it('should create and return city', async function () {
        const token = await getJWTToken()
        return request(app)
            .post('/api/addCity')
            .set('Authorization', `Bearer ${token}`)
            .send(testCity)
            .expect(201)
            .then(resp => {
                assert(resp.body.data.id !== undefined)
                assert(resp.body.data.name === testCity.name)
                assert(resp.body.data.country === testCity.country)
                assert(resp.body.data.longitude === testCity.longitude)
                assert(resp.body.data.latitude === testCity.latitude)
                updatedCity.id = resp.body.data.id;
            });
    });
});

describe('update city', function () {
    it('should update city and return updated instance', async function () {
        const token = await getJWTToken()
        return request(app)
            .put(`/api/updateCity/${updatedCity.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedCity)
            .expect(200)
            .then(resp => {
                assert(resp.body.data.id === updatedCity.id)
                assert(resp.body.data.name === updatedCity.name)
                assert(resp.body.data.country === updatedCity.country)
                assert(resp.body.data.longitude === updatedCity.longitude)
                assert(resp.body.data.latitude === updatedCity.latitude)
            });
    });
});

describe('get cities', function () {
    it('should return cities matching query', async function () {
        return request(app)
            .get('/api/cities?name=Test')
            .send(testCity)
            .expect(200)
            .then(resp => {
                assert(resp.body[0].name)
                assert(resp.body[0].country)
                assert(resp.body[0].longitude)
                assert(resp.body[0].latitude)
            });
    });
});

describe('delete city', function () {
    it('should delete city by id', async function () {
        const token = await getJWTToken()
        return request(app)
            .delete(`/api/deleteCity/${updatedCity.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200)
            .then(resp => {
                assert(resp.body.data.id === updatedCity.id)
                assert(resp.body.data.name === updatedCity.name)
                assert(resp.body.data.country === updatedCity.country)
                assert(resp.body.data.longitude === updatedCity.longitude)
                assert(resp.body.data.latitude === updatedCity.latitude)
            });
    });
});