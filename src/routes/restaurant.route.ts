import express from 'express';
import RestaurantService from '../services/restaurant.service';
import { IRestaurant, IRestaurantSearchOptions } from '../interfaces/restaurant.interface';
import asyncCatch from '../middlewares/async-catch.middleware';
import { FLASH_ACTION_ERROR, FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST, FLASH_TEXT_DELETE_REST, FLASH_TEXT_EDIT_REST, FLASH_TEXT_ERROR } from '../defs/flash.def';
import { getHandlebarsPageItems } from '../handlebars/templates/common.hbt';
import checkAuthentication from '../middlewares/check-authentication.middleware';

export const RestaurantRoute = express.Router();
const serviceRest = new RestaurantService();
const pageItemCount: number = 9;
const checkAuth = checkAuthentication(true, "/login");

// View
RestaurantRoute.get(['/', '/index', '/index.html'], (req, res) => res.redirect('/restaurants?page=1'));

RestaurantRoute.get('/restaurants', checkAuth, asyncCatch(async (req, res) => {
    if (!req.query.page) return res.redirect('/');

    const flashInfo = req.flash(FLASH_ACTION_INFO);
    const flashError = req.flash(FLASH_ACTION_ERROR);

    const pageNum = Number(req.query.page);
    const orderType = req.query.order ? Number(req.query.order) : 1;
    const options: IRestaurantSearchOptions = {
        userId: req.user!.id,
        keyword: req.query.keyword as string,
        offset: (pageNum - 1) * pageItemCount,
        limit: pageItemCount,
        orderType: orderType
    }

    const { rests, groupCount } = (await serviceRest.getRests(options));
    const pageItems = getHandlebarsPageItems(pageNum, groupCount, "page", req);
    const name = req.user!.name;
    const isEmptyRests = rests.length === 0 ? true : null;

    res.render('index', { flashInfo, flashError, rests, pageItems, orderType, name, isEmptyRests });
}));

RestaurantRoute.get('/restaurants/new', checkAuth, asyncCatch(async (req, res) => {
    const rest = { rating: 3 } as IRestaurant;
    const editTitle = "餐廳建立";
    const action = `/restaurants/new?_method=POST`;
    res.render('edit', { editTitle, action, rest });
}));

RestaurantRoute.get('/restaurants/:id', checkAuth, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    const rest = await serviceRest.getRestById(req.user!.id, id);

    if (rest) {
        res.render('show', { rest });
        return;
    }
    res.redirect('/index');
}));

RestaurantRoute.get('/restaurants/:id/edit', checkAuth, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    const rest = await serviceRest.getRestById(req.user!.id, id);
    const editTitle = "餐廳編輯";
    const action = `/restaurants/${id}?_method=PUT`;

    if (rest) {
        res.render('edit', { editTitle, action, rest });
        return;
    }
    res.redirect('/index');
}));

RestaurantRoute.get('/error', asyncCatch(async (req, res) => {
    throw new Error("-> Test error");
}));

// ----------------------------------------------------------------------

// Api
RestaurantRoute.post('/restaurants/new', checkAuth, asyncCatch(async (req, res) => {
    const data = {} as IRestaurant;
    mapRestDataFromBody(data, req.body);
    await serviceRest.createRest(req.user!.id, data);

    req.flash(FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST);
    req.session.save((err) => res.redirect('/index'));
}));

RestaurantRoute.post('/restaurants/seed', checkAuth, asyncCatch(async (req, res) => {
    const rests = await serviceRest.getSeedRests();
    for (const rest of rests) {
        await serviceRest.createRest(req.user!.id, rest);
    }

    req.flash(FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST);
    req.session.save((err) => res.redirect('/index'));
}));

RestaurantRoute.put('/restaurants/:id', checkAuth, asyncCatch(async (req, res) => {
    const data = { id: Number(req.params.id) } as IRestaurant;
    mapRestDataFromBody(data, req.body);
    const isSuccess = await serviceRest.updateRest(req.user!.id, data);
    if (!isSuccess) throw new Error();

    req.flash(FLASH_ACTION_INFO, FLASH_TEXT_EDIT_REST);
    req.session.save((err) => res.redirect('/index'));
}));

RestaurantRoute.delete('/restaurants/:id', checkAuth, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    const isSuccess = await serviceRest.deleteRest(req.user!.id, id);
    if (!isSuccess) throw new Error();

    req.flash(FLASH_ACTION_INFO, FLASH_TEXT_DELETE_REST);
    req.session.save((err) => res.redirect('/index'));
}));

// ----------------------------------------------------------------------

// Func
function mapRestDataFromBody(data: IRestaurant, body: Record<string, any>) {
    data.name = body["rest-name"];
    data.nameEn = body["rest-name-en"];
    data.category = body["rest-category"];
    data.image = body["rest-image"];
    data.location = body["rest-location"];
    data.phone = body["rest-phone"];
    data.googleMap = body["rest-google-map"];
    data.rating = body["rest-rating"];
    data.description = body["rest-description"];
}