import axios from 'axios';
import { sampleDataForOneProduct } from '../fixtures/sampleData.js';
import regeneratorRuntime from 'regenerator-runtime';

// Create
describe('POST route', () => {
  it('creates a new record', async () => {
    await axios.post('http://localhost:3001/Information', sampleDataForOneProduct)
      .then((res) => {
        expect(res.status).toBe(201);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Read
describe('GET route', () => {
  it('fetches data for one product', async () => {
    await axios.get('http://localhost:3001/Information/101')
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Update
describe('PUT route', () => {
  it('updates a record', async () => {
    await axios.put('http://localhost:3001/Information/101', {format: 'Home Theater'})
      .then((res) => {
        expect(res.status).toBe(201);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Delete
describe('DELETE route', () => {
  it ('deletes a record', async () => {
    await axios.delete('http://localhost:3001/Information/101')
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        console.log(error);
      });
  });
});