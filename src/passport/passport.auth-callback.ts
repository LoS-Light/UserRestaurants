import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";

export function passportAuthCallback
    (
        strategy: string,
        cbResult: (isSuccess: boolean, req: Request, res: Response) => void,
        isSession: boolean = true
    ) {
    const handler: RequestHandler = (req, res, next: NextFunction) => {
        passport.authenticate(strategy, (err: Error, user: Express.User) => {
            if (err) return next(err);
            if (!user) return Promise.resolve(cbResult(false, req, res)).catch(err => next(err));

            req.logIn(user, { session: isSession }, (err: Error) => {
                if (err) return next(err);
                return Promise.resolve(cbResult(true, req, res)).catch(err => next(err));
            });
        })(req, res, next);
    }
    return handler;
}