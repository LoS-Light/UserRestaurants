import express from 'express';
import asyncCatch from '../middlewares/async-catch.middleware';
import checkAuthentication from '../middlewares/check-authentication.middleware';
import { RestaurantController } from '../controllers/restaurant.controller';

export const RestaurantRoute = express.Router();
const checkAuth = checkAuthentication(true, "/login");

// View
RestaurantRoute.get(['/', '/index', '/index.html'], asyncCatch(RestaurantController.getPageIndex));
RestaurantRoute.get('/restaurants', checkAuth, asyncCatch(RestaurantController.getPageRests));
RestaurantRoute.get('/restaurants/new', checkAuth, asyncCatch(RestaurantController.getPageRestNew));
RestaurantRoute.get('/restaurants/:id', checkAuth, asyncCatch(RestaurantController.getPageRest));
RestaurantRoute.get('/restaurants/:id/edit', checkAuth, asyncCatch(RestaurantController.getPageRestEdit));

// ----------------------------------------------------------------------

// Api
RestaurantRoute.post('/restaurants/new', checkAuth, asyncCatch(RestaurantController.postRest));
RestaurantRoute.put('/restaurants/:id', checkAuth, asyncCatch(RestaurantController.putRest));
RestaurantRoute.delete('/restaurants/:id', checkAuth, asyncCatch(RestaurantController.deleteRest));
RestaurantRoute.post('/restaurants/seed', checkAuth, asyncCatch(RestaurantController.postRestSeed));