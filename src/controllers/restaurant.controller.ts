import { Request, Response } from "express";
import { FLASH_ACTION_ERROR, FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST, FLASH_TEXT_DELETE_REST, FLASH_TEXT_EDIT_REST, FLASH_TEXT_ERROR } from '../defs/flash.def';
import { IRestaurant, IRestaurantSearchOptions } from "../interfaces/restaurant.interface";
import RestaurantService from "../services/restaurant.service";
import { getHandlebarsPageItems } from "../handlebars/templates/common.hbt";

const PAGE_ITEM_COUNT: number = 9;
const serviceRest = new RestaurantService();

export const RestaurantController = {

    getPageIndex: async (req: Request, res: Response) => {
        res.redirect('/restaurants?page=1');
    },

    getPageRests: async (req: Request, res: Response) => {
        if (!req.query.page) return res.redirect('/');

        const flashInfo = req.flash(FLASH_ACTION_INFO);
        const flashError = req.flash(FLASH_ACTION_ERROR);

        const pageNum = Number(req.query.page);
        const orderType = req.query.order ? Number(req.query.order) : 1;
        const options: IRestaurantSearchOptions = {
            userId: req.user!.id,
            keyword: req.query.keyword as string,
            offset: (pageNum - 1) * PAGE_ITEM_COUNT,
            limit: PAGE_ITEM_COUNT,
            orderType: orderType
        }

        const { rests, groupCount } = (await serviceRest.getRests(options));
        const pageItems = getHandlebarsPageItems(pageNum, groupCount, "page", req);
        const name = req.user!.name;
        const isEmptyRests = rests.length === 0 ? true : null;

        res.render('index', { flashInfo, flashError, rests, pageItems, orderType, name, isEmptyRests });
    },

    getPageRest: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const rest = await serviceRest.getRestById(req.user!.id, id);

        if (rest) {
            res.render('show', { rest });
            return;
        }
        res.redirect('/index');
    },

    getPageRestNew: async (req: Request, res: Response) => {
        const rest = { rating: 3 } as IRestaurant;
        const editTitle = "餐廳建立";
        const action = `/restaurants/new?_method=POST`;
        res.render('edit', { editTitle, action, rest });
    },

    getPageRestEdit: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const rest = await serviceRest.getRestById(req.user!.id, id);
        const editTitle = "餐廳編輯";
        const action = `/restaurants/${id}?_method=PUT`;

        if (rest) {
            res.render('edit', { editTitle, action, rest });
            return;
        }
        res.redirect('/index');
    },

    // ---------------------------------------------------------------

    postRest: async (req: Request, res: Response) => {
        const data = {} as IRestaurant;
        mapRestDataFromBody(data, req.body);
        await serviceRest.createRest(req.user!.id, data);

        req.flash(FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST);
        req.session.save((err) => res.redirect('/index'));
    },

    putRest: async (req: Request, res: Response) => {
        const data = { id: Number(req.params.id) } as IRestaurant;
        mapRestDataFromBody(data, req.body);
        const isSuccess = await serviceRest.updateRest(req.user!.id, data);
        if (!isSuccess) throw new Error();

        req.flash(FLASH_ACTION_INFO, FLASH_TEXT_EDIT_REST);
        req.session.save((err) => res.redirect('/index'));
    },

    deleteRest: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const isSuccess = await serviceRest.deleteRest(req.user!.id, id);
        if (!isSuccess) throw new Error();

        req.flash(FLASH_ACTION_INFO, FLASH_TEXT_DELETE_REST);
        req.session.save((err) => res.redirect('/index'));
    },

    postRestSeed: async (req: Request, res: Response) => {
        const rests = await serviceRest.getSeedRests();
        for (const rest of rests) {
            await serviceRest.createRest(req.user!.id, rest);
        }

        req.flash(FLASH_ACTION_INFO, FLASH_TEXT_CREATE_REST);
        req.session.save((err) => res.redirect('/index'));
    }
}

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