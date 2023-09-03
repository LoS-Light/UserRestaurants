
import { NextFunction, Request, Response } from "express";

const checkAuthentication = (isEqual: boolean = true, redirect: string = "/") => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated() === isEqual) {
            return next();
        }
        res.redirect(redirect);
    };
};

export default checkAuthentication;