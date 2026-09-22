const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('./config');

// Path Coverage: POST /api/auth/login
// Test data taken from the README "Existing Data" seeded users table.
describe('Path Coverage - POST /api/auth/login', () => {
  it('should login a seeded user and return a JWT token', async () => {
    const response = await request(BASE_URL).post('/api/auth/login').send({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token').that.is.a('string');
    expect(response.body).to.have.property('user');
    expect(response.body.user).to.have.property('id', 1);
    expect(response.body.user).to.have.property('name', 'John Doe');
    expect(response.body.user).to.have.property('email', 'john.doe@example.com');
  });
});
