import express from 'express';
import { RestaurantRoute } from './restaurant.route';
import { ErrorHandler } from '../handlers/error.handler';
import { check } from 'express-validator';
import { AuthRoute } from './auth.route';

export const MainRoute = express.Router();

// Validation
const validCheck = check('**').trim().blacklist('<>()\"\'');

MainRoute.use(validCheck);
MainRoute.use(AuthRoute);
MainRoute.use(RestaurantRoute);
MainRoute.use(ErrorHandler);