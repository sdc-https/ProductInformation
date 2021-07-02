import axios from 'axios';
import { sampleDataForOneProduct } from '../fixtures/sampleData.js';
import regeneratorRuntime from 'regenerator-runtime';

let newProductId;

// Create
describe('POST route', () => {
  it('creates a new record', async () => {
    await axios.post('http://localhost:3001/Information', sampleDataForOneProduct)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(typeof res.data).toBe('number')
        newProductId = res.data;
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
        expect(Object.keys(res.data).length).toBe(9);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});


// Update
describe('PUT route', () => {
  it('updates a record\'s cast', async () => {
    await axios.put(`http://localhost:3001/Information/${newProductId}`, {
      cast: ['Jordan Acevedo', 'Aschale Siyoum', 'Christopher Raffaele','Frederic Rosselet']
    })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(JSON.parse(res.config.data).cast[3]).toBe('Frederic Rosselet');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it('updates a record\'s any other property', async () => {
    await axios.put(`http://localhost:3001/Information/${newProductId}`, {format: 'Home Theater'})
      .then((res) => {
        expect(res.status).toBe(201);
        expect(JSON.parse(res.config.data).format).toBe('Home Theater');
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
        expect(res.config.data).toBeUndefined();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});