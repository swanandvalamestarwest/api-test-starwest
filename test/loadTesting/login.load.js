import http from 'k6/http';
import { check, sleep } from 'k6';

// Load test for POST /api/auth/login (see swagger.yaml).
// Test data taken from the README "Existing Data" seeded users table.
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '5s', target: 10 }, // ramp up to 10 users over the first 5s
    { duration: '20s', target: 30 }, // ramp up to 30 users over the next 20s
    { duration: '5s', target: 0 }, // ramp down to 0 users over the last 5s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95th percentile must be below 500ms
  },
};

export default function () {
  const payload = JSON.stringify({
    email: 'john.doe@example.com',
    password: 'password123',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(`${BASE_URL}/api/auth/login`, payload, params);

  check(response, {
    'status is 200': (res) => res.status === 200,
    'response has a token': (res) => JSON.parse(res.body).token !== undefined,
  });

  sleep(1);
}
