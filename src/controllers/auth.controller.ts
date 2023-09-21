import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { FLASH_ACTION_ERROR, FLASH_ACTION_INFO } from '../defs/flash.def';
import { getRedirectHtml } from "../utils/html-redirect";

const serviceAuth = new AuthService();

export const AuthController = {

    getPageLogin: async (req: Request, res: Response) => {
        const flashInfo = req.flash(FLASH_ACTION_INFO);
        const flashError = req.flash(FLASH_ACTION_ERROR);
        res.render("login", { flashInfo, flashError });
    },

    getPageRegister: async (req: Request, res: Response) => {
        const flashError = req.flash(FLASH_ACTION_ERROR);
        res.render("register", { flashError });
    },

    // ---------------------------------------------------------------

    postRegister: async (req: Request, res: Response) => {
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
    },

    postLogout: async (req: Request, res: Response) => {
        req.logOut(() => {
            req.flash(FLASH_ACTION_INFO, "Logout success.");
            req.session.save(() => res.redirect("/login"));
        });
    },

    postLoginLocal: async (isSuccess: boolean, req: Request, res: Response) => {
        if (!isSuccess) req.flash("error", "Login failed, email or password is incorrect.");
        if (isSuccess && !req.body.remember) req.session.cookie.maxAge = undefined;

        const redirect = isSuccess ? "/" : "/login";
        req.session.save(() => res.redirect(redirect));
    },

    postOauthFacebookCb: async (isSuccess: boolean, req: Request, res: Response) => {
        if (!isSuccess) req.flash("error", "Facebook login failed.");
        setSelfRedirectHtml(isSuccess, req, res);
    },

    postOauthGoogleCb: async (isSuccess: boolean, req: Request, res: Response) => {
        if (!isSuccess) req.flash("error", "Google login failed.");
        setSelfRedirectHtml(isSuccess, req, res);
    }
}

function setSelfRedirectHtml(isSuccess: boolean, req: Request, res: Response) {
    const redirect = isSuccess ? "/" : "/login";

    // Self redirect to resolve the cookie which cannot be sent in SameSite: Strict
    req.session.save(() => {
        res.setHeader('Content-type', 'text/html');
        res.send(getRedirectHtml(redirect));
    });
}