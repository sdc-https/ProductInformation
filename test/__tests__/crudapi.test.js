import axios from 'axios';
import { countEntries } from '../../database/mongo.js';
import { sampleDataForOneProduct } from '../fixtures/sampleData.js';
import regeneratorRuntime from 'regenerator-runtime';

let newProductId;

// Create
describe('POST route', () => {
  it('creates a new record', async () => {
    await axios.post('http://localhost:3001/Information', sampleDataForOneProduct)
      .then((res) => {
        newProductId = res.data.productId;
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
    await axios.get(`http://localhost:3001/Information/${newProductId}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Object.keys(res.data).length).toBe(12);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Update
describe('PUT route', () => {
  it('updates a record', async () => {
    await axios.put(`http://localhost:3001/Information/${newProductId}`, {format: 'Home Theater'})
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
    await axios.delete(`http://localhost:3001/Information/${newProductId}`)
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        console.log(error);
      });
  });
});