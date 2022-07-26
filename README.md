## What is this project
Imagine there are 7000 couriers in your company and They are working at the same time. They will send you a location request per second. So, we prepared an application that can handle it.

## Features
- Admin users can login
- Admin user can create a courier and manage it (active/deactive)
- Courier users can login
- Courier users can login and they can send location to the api

## Lerna
- This project is written in lerna, you can create multiple application in a repo with it.


## What is the architecture
- We have 3 applications
- `courier-api`
    - Rest api written with NestJS.
    - This application needs a mongodb and rabbitmq connection.
- `location-listener`
    - This is an application that listens rabbitmq messages and writes them to its own mongodb database
    - This is written typescript **without** a framework. It is written via `ts-node`
- `shared-data`
    - This application exports interfaces to these applications
- I tried this architecture [here](https://github.com/feyzullahyildiz/tg-test-microservice) and it is working

## Courier API
- /api/v1/admin/auth/login (POST)
- /api/v1/admin/auth/refresh (POST) requires refreshToken to give another token
- /api/v1/admin/courier (POST) (🔒) create a courier 
- /api/v1/admin/courier/state (POST) (🔒) change courier active state (you can disabled the courier)
---
- /api/v1/courier/auth/login (POST)
- /api/v1/courier/auth/refresh (POST) requires refreshToken to give another token
- /api/v1/courier/me/location (POST) (🔒) updates its own location, we send rabbitmq message here, we dont go to db in this request
- 


## How to start courier-api
- `npm install` at the root path
- `cd packages/courier-api`
- `cp conf.env .env`
- replace .env variabled with yours. 
- `npm run start:dev`


## How to start location-listener
- `cd packages/location-listener`
- `cp conf.env .env`
- replace .env variabled with yours. 
- `npm run dev`

