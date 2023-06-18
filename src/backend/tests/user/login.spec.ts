import { app, request, assert } from "../init.spec";

describe('correct login attempt', function () {
    it('should return token', function () {
        return request(app)
            .post('/api/login')
            .send({email: 'test@example1.com', password: 'test'})
            .expect(200)
            .then(resp => {
                assert(resp.body.data.token !== undefined)
            });
    });
});

describe('incorrect login attempt', function () {
    it('should return error', function () {
        return request(app)
            .post('/api/login')
            .send({email: 'test@example1.com', password: 'test123'})
            .expect(401)
            .then(resp => {
                assert(resp.body.errors !== undefined)
            });
    });
});