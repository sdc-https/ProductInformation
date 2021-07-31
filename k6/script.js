import http from 'k6/http';
import { sleep } from 'k6';
import { sampleDataForOneProduct } from '../test/fixtures/sampleData.js';

const BASE_URL = 'http://localhost:3001/Information';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 500
    }
  }
};

export default () => {
  // const min = 9000000;
  // const max = 10000000;
  // let id = Math.floor(Math.random() * (max - min + 1) + min);
  // http.get(`${BASE_URL}/Information/${id}`);
  // sleep(1);
  http.post(BASE_URL, JSON.stringify(sampleDataForOneProduct), { headers: {'Content-Type': 'application/json' } });
  sleep(1);
};