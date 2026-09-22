const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('./config');

// Path Coverage: GET /api/health
describe('Path Coverage - GET /api/health', () => {
  it('should return the API health status', async () => {
    const response = await request(BASE_URL).get('/api/health');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'ok');
    expect(response.body).to.have.property('uptime');
    expect(response.body).to.have.property('timestamp');
  });
});
