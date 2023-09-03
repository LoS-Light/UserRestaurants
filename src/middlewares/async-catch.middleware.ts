import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncCatch = (handler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(err => next(err));
    };
};

export default asyncCatch;