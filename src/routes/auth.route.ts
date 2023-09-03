import express, { Request, Response } from 'express';
import asyncCatch from '../middlewares/async-catch.middleware';
import { passportAuthCallback } from '../passport/passport.auth-callback';
import AuthService from '../services/auth.service';
import { FLASH_ACTION_ERROR, FLASH_ACTION_INFO } from '../defs/flash.def';
import checkAuthentication from '../middlewares/check-authentication.middleware';
import passport from 'passport';
import { getRedirectHtml } from '../utils/html-redirect';
import { OAuth2FacebookConfig, OAuth2GoogleConfig } from '../env.config';

export const AuthRoute = express.Router();
const serviceAuth = new AuthService();
const checkAuth = checkAuthentication(false, "/");

AuthRoute.get("/login", checkAuth, (req: Request, res: Response) => {
    const flashInfo = req.flash(FLASH_ACTION_INFO);
    const flashError = req.flash(FLASH_ACTION_ERROR);
    res.render("login", { flashInfo, flashError });
});
AuthRoute.get("/register", checkAuth, (req: Request, res: Response) => {
    const flashError = req.flash(FLASH_ACTION_ERROR);
    res.render("register", { flashError });
});

AuthRoute.post("/register", asyncCatch(async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const isSuccess = await serviceAuth.createUser(email, password, name);

    if (isSuccess) {
        req.flash(FLASH_ACTION_INFO, "Sign up success.");
        req.session.save(() => res.redirect("/login"));
    }
    else {
        req.flash(FLASH_ACTION_ERROR, "Sign up failed, this email has been used.");
        req.session.save(() => res.redirect("/register"));
    }
}));

AuthRoute.post("/logout", (req: Request, res: Response) => {
    req.logOut(() => {
        req.flash(FLASH_ACTION_INFO, "Logout success.");
        req.session.save(() => res.redirect("/login"));
    });
});

AuthRoute.post("/login/local", passportAuthCallback("local", async (isSuccess, req, res) => {
    if (!isSuccess) req.flash("error", "Login failed, email or password is incorrect.");
    if (isSuccess && !req.body.remember) req.session.cookie.maxAge = undefined;

    const redirect = isSuccess ? "/" : "/login";
    req.session.save(() => res.redirect(redirect));
}));

AuthRoute.get("/login/facebook", passport.authenticate("facebook", { scope: OAuth2FacebookConfig.scope }));
AuthRoute.get("/oauth2/facebook/callback", passportAuthCallback("facebook", (isSuccess, req, res) => {
    if (!isSuccess) req.flash("error", "Facebook login failed.");

    const redirect = isSuccess ? "/" : "/login";

    // Self redirect to resolve the cookie which cannot be sent in SameSite: Strict
    req.session.save(() => {
        res.setHeader('Content-type', 'text/html');
        res.send(getRedirectHtml(redirect));
    });
}));

AuthRoute.get("/login/google", passport.authenticate("google", { scope: OAuth2GoogleConfig.scope }));
AuthRoute.get("/oauth2/google/callback", passportAuthCallback("google", (isSuccess, req, res) => {
    if (!isSuccess) req.flash("error", "Google login failed.");

    const redirect = isSuccess ? "/" : "/login";

    // Self redirect to resolve the cookie which cannot be sent in SameSite: Strict
    req.session.save(() => {
        res.setHeader('Content-type', 'text/html');
        res.send(getRedirectHtml(redirect));
    });
}));