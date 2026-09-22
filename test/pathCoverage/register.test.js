const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('./config');

// Path Coverage: POST /api/auth/register
// Test data taken from the README "How to Use the REST API" register example.
describe('Path Coverage - POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(BASE_URL).post('/api/auth/register').send({
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'strongPassword123',
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name', 'Alice Johnson');
    expect(response.body).to.have.property('email', 'alice.johnson@example.com');
  });
});
