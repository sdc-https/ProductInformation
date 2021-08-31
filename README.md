# Amazon DVD Product Information
Scaling the back end of an item page microservice

## Related Projects
- [Product Overview](https://github.com/sdc-https/ProductOverview) (Aschale Siyoum)
- [Product Gallery](https://github.com/sdc-https/ProductGallery) (Christopher Raffaele)
- [Customer Reviews](https://github.com/sdc-https/CustomerReviews) (Jordan Acevedo)

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Requirements](#requirements)
4. [Installation](#installation)

## Description
- Inherited the Product information service for a mock Amazon item page
- Seeded a PostgreSQL database with 10 million records of realistic mock data
- Load-tested the application (K6 and loader.io, New Relic monitoring) to simulate user traffic 
- Built a custom reverse proxy server (https://github.com/sdc-https/FredProxy) to render and redirect data to and from each service
- Deployed and improved performance up to 1000 RPS and under 750ms/request using horizontal scaling (Nginx load balancer, five servers on AWS EC2 instances) and Redis caches 

### CRUD API endpoints:

base: http://localhost:3001
```sh
GET /Information/:productId
POST /Information
PUT /Information/:productId
DELETE /Information/:productId
```

## Technologies
### Front End
- Babel
- React & ReactDOM (front end)
- CSS (styling)
- Webpack
### Back End
- Express.js (server)
- Nginx (load balancer)
- PostgreSQL (database)
- Redis (caching)
### Deployment
- AWS EC2: 8 t2.micro instances (proxy, load balancer, five service instances, database)
### Testing
- Jest (CRUD routes)
- k6 (local load-testing)
- loader.io (deployed load-testing)
- New Relic (performance monitoring)

## Requirements
- Node 6.13.0

## Installation
### Installing dependencies
From within the ProductInformation directory:
```sh
npm install
```
### Creating the bundle file
From within the ProductInformation directory:
```sh
npm run build (development mode)
npm run prod (production mode)
```
### Populating the database
From within the ProductInformation directory:
```sh
npm run seedPostgres
```
### Starting the server
From within the ProductInformation directory:
```sh
npm start
```
### Running tests (optional)
```sh
npm test
```



