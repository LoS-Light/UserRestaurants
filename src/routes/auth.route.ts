import express from 'express';
import asyncCatch from '../middlewares/async-catch.middleware';
import { passportAuthCallback } from '../passport/passport.auth-callback';
import checkAuthentication from '../middlewares/check-authentication.middleware';
import passport from 'passport';
import { OAuth2FacebookConfig, OAuth2GoogleConfig } from '../env.config';
import { AuthController } from '../controllers/auth.controller';


export const AuthRoute = express.Router();
const checkAuth = checkAuthentication(false, "/");

// View
AuthRoute.get("/login", checkAuth, asyncCatch(AuthController.getPageLogin));
AuthRoute.get("/register", checkAuth, asyncCatch(AuthController.getPageRegister));

// ----------------------------------------------------------------------

// Api
AuthRoute.post("/register", asyncCatch(AuthController.postRegister.bind(this)));
AuthRoute.post("/logout", asyncCatch(AuthController.postLogout));

AuthRoute.post("/login/local", passportAuthCallback("local", AuthController.postLoginLocal));

AuthRoute.get("/login/facebook", passport.authenticate("facebook", { scope: OAuth2FacebookConfig.scope }));
AuthRoute.get("/oauth2/facebook/callback", passportAuthCallback("facebook", AuthController.postOauthFacebookCb));

AuthRoute.get("/login/google", passport.authenticate("google", { scope: OAuth2GoogleConfig.scope }));
AuthRoute.get("/oauth2/google/callback", passportAuthCallback("google", AuthController.postOauthGoogleCb));