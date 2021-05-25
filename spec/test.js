const puppetteer = require('puppeteer');
const pageUrl = 'http://localhost:3001/dp/5';
import 'babel-polyfill';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppetteer.launch({
    headless:false,
    slowMo: 80,
    args: ['--window-size=${width}, ${height}']
  });
  page = await browser.newPage(pageUrl);
  await page.goto(pageUrl);
  await page.setViewport({width, height});
});

afterAll(() => {
  browser.close();
})

describe('Service Working', () => {

  test('Title is Correct', async () => {
    let div = '.Information h2';
    const header = await page.$eval(div, element => element.textContent);
    expect(header).toEqual('Product Information:');
  })

  test('Specific API Call Working', async () => {
    let div = '.Information #director';
    const directorName = await page.$eval(div, element => element.textContent);
    expect(directorName).toEqual('Director: Della Oberbrunner II');
  })


});