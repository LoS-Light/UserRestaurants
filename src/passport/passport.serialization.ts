import passport from 'passport';

export default function ConfigurePassportSerialization() {

    passport.serializeUser((user: Express.User, done) => {
        done(null, { id: user.id, name: user.name });
    });

    passport.deserializeUser((user: Express.User, done) => {
        return done(null, user);
    });
}