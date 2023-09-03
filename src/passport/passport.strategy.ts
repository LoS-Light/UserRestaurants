
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthService from '../services/auth.service';
import { OAuth2FacebookConfig, OAuth2GoogleConfig } from '../env.config';

export default function ConfigurePassportStrategy() {

    const serviceAuth = new AuthService();

    passport.use("local", new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            const user = await serviceAuth.findUser(email, password);
            done(null, user);
        }
    ));

    passport.use("facebook", new FacebookStrategy(
        {
            clientID: OAuth2FacebookConfig.clientId,
            clientSecret: OAuth2FacebookConfig.clientSecret,
            callbackURL: OAuth2FacebookConfig.callbackUrl,
            profileFields: OAuth2FacebookConfig.profileField
        },
        async (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            const user = await serviceAuth.findUserByOAuthFacebook(profile);
            done(null, user);
        }
    ));

    passport.use("google", new GoogleStrategy(
        {
            clientID: OAuth2GoogleConfig.clientId,
            clientSecret: OAuth2GoogleConfig.clientSecret,
            callbackURL: OAuth2GoogleConfig.callbackUrl
        },
        async (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            const user = await serviceAuth.findUserByOAuthGoogle(profile);
            done(null, user);
        }
    ));
}