export const request = require('supertest');
export const assert = require('chai').assert;
const { createServer } = require('../server');
const { config } = require('../config');

export const app = createServer(config.server);

export const getJWTToken = async () => {
    const resp = await request(app)
        .post('/api/login')
        .send({email: 'test@example1.com', password: 'test'})
    return resp.body.data.token
}