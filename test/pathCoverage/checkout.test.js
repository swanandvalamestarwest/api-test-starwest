const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('./config');

// Path Coverage: POST /api/checkout
// Test data taken from the README "How to Use the REST API" checkout example
// (Laptop id 1 x1 + Wireless Mouse id 2 x2, paid with cash).
describe('Path Coverage - POST /api/checkout', () => {
  let token;

  before(async () => {
    const loginResponse = await request(BASE_URL).post('/api/auth/login').send({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    token = loginResponse.body.token;
  });

  it('should checkout with cash and apply the 10% discount', async () => {
    const response = await request(BASE_URL)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 },
        ],
        paymentMethod: 'cash',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Checkout completed successfully');
    expect(response.body.order).to.have.property('paymentMethod', 'cash');
    expect(response.body.order).to.have.property('subtotal', 1059.97);
    expect(response.body.order).to.have.property('discount', 106);
    expect(response.body.order).to.have.property('total', 953.97);
  });
});
